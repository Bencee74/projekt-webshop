const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const User = require("./models/user.js")
const Product = require("./models/product.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const app = express()
const router = express.Router()
const methodOverride = require('method-override')
const Order = require("./models/order.js")
const https = require('https')
require('dotenv').config();
const multer = require('multer')
app.use(methodOverride('_method'))

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET_KEY

const uri = process.env.URI_FOR_MONGODB

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB database connected'))
  .catch((err) => console.log(err))


//User registration
router.post('/register', async (req, res) => {

  const { username, password: plainTextPassword } = req.body
  const password = await bcrypt.hash(plainTextPassword, 10)

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ status: 'username-error' })
  }

  if (plainTextPassword.length < 6) {
    return res.status(400).json({ status: 'password-length-error' })
  }

  try {
    const response = await User.create({
      username,
      password
    })
    console.log('User created: ', response);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ status: 'Error during registration' })
    }
    throw error
  }

  res.json({ status: 'ok' })
})


//User login
router.post('/login', async (req, res) => {

  const { username, password: plainTextPassword } = req.body
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(401).json({ status: 'error' })
  }

  const isPasswordValid = await bcrypt.compare(plainTextPassword, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ status: 'error' })
  }

  const tokenPayload = {
    username: user.username,
    isAdmin: user.isAdmin
  }
  const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1h" })
  res.json({ status: "ok", token, username: user.username, isAdmin: user.isAdmin })
})


//Check if a logged in user has admin roles or not
function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ status: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]
  const decoded = jwt.verify(token, JWT_SECRET)
  if (!decoded.isAdmin) {
    return res.status(401).json({ status: 'Unauthorized' })
  }
  next()
}


//Creating new products
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.post('/products', isAdmin, upload.array('productImages', 3), async (req, res) => {
  try {
      const { name, brand, category, price, sizes, isInStock, featured } = req.body
      const images = req.files

      const newProduct = new Product({
          name,
          brand,
          category,
          price,
          sizes,
          sizeChosen: 0,
          isInStock,
          featured,
          image1: images[0].filename,
          image2: images[1].filename,
          image3: images[2].filename
      })

      const savedProduct = await newProduct.save()
      res.status(201).json(savedProduct)
  } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
  }
})


//Editing products (only admins)
router.put('/update-product/:id', isAdmin, upload.array('productImages', 3), async (req, res) => {
  const { name, brand, category, price, sizes, isInStock, featured } = req.body;
  const productId = req.params.id;

  const images = req.files;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
      name,
      brand,
      category,
      price,
      sizes,
      sizeChosen: 0,
      isInStock,
      featured,
      image1: images[0].filename,
      image2: images[1].filename,
      image3: images[2].filename
    })

    if (updatedProduct) {
      res.status(201).json({ status: 'ok' })
    } else {
      res.status(404).json({ status: 'error' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ status: 'error' })
  }
})


//Getting all the products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ status: 'error' })
  }
})


//Getting products by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ status: 'error' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ status: 'error' })
  }
})


//Place an order
router.post('/order', async (req, res) => {
  try {
    const order = new Order({
      username: req.body.username,
      products: req.body.products,
      totalPrice: req.body.totalPrice
    })

    const newOrder = await order.save()
    res.status(201).json({ newOrder, status: 'ok' })
  } catch (err) {
    res.status(500).send({ status: 'error' })
  }
})


//Getting orders by username
router.get('/orders/:username', async (req, res) => {
  try {
    const orders = await Order.find({ username: req.params.username })
    res.status(200).json({ orders, status: 'ok' })
  } catch (err) {
    res.status(500).send({ status: 'error' })
  }
})


//Getting all the orders
router.get('/orders', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ status: 'error' })
  }
})


//Deleting orders (only admins)
router.delete('/orders/:id', isAdmin, async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  try {
    if (order) {
      res.status(201).json({ status: 'ok' })
    } else {
      res.status(404).json({ status: 'error' })
    }
  } catch (error) {
    res.status(500).send({ status: 'error' })
  }
}
)


//Deleting products (only admins)
router.delete('/products/:id', isAdmin, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  try {
    if (product) {
      res.status(201).json({ status: 'ok' })
    } else {
      res.status(404).json({ status: 'error' })
    }
  } catch (error) {
    res.status(500).send({ status: 'error' })
  }
}
)


//Getting the current exchange rates
router.get('/exchange-rates', (req, res) => {
  const API_KEY = process.env.EXCHANGE_API_KEY
  const endpoint = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&symbols=EUR,HUF`

  https.get(endpoint, (response) => {
    let data = ''
    response.on('data', (chunk) => {
      data += chunk
    })
    response.on('end', () => {
      const rates = JSON.parse(data).rates
      const HUF_TO_EUR = rates.EUR / rates.HUF
      res.json({ HUF_TO_EUR: HUF_TO_EUR })
    })
  }).on('error', (err) => {
    console.error(err)
    res.status(500).send('Error fetching exchange rates')
  })
})


app.use('/api', router)
app.listen(5000, () => {
  console.log("serve at http://localhost:5000")
})