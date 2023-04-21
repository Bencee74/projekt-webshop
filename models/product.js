const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sizes: {
        type: String,
        required: true
    },
    sizeChosen: {
        type: Number,
        required: true
    },
    image1: {
        type: String,
        required: true
    },
    image2: {
        type: String,
        required: true
    },
    image3: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true,
    },
    featured: {
        type: Boolean,
        required: true
    }

   
})

const Product = mongoose.model('Product', productsSchema)
module.exports = Product