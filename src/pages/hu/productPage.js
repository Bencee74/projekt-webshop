import { addItemToCart } from "../../js/cartActions.js"
import { formatPrice, getProduct, messageWindow, mainMessage, failed, info, success, messageIcon } from "../../js/services.js"

var chosenSize = 0
var chosenPic = ''

export const productPage = {

  after_render: async function () {
    const productId = document.location.hash.toLowerCase().split('/')[2]
    document.getElementById('product-toCart-btn').addEventListener('click',
      async () => {
        const product = await getProduct(productId)
        product.sizeChosen = chosenSize
        addItemToCart({
          _id: `${product._id}_${product.sizeChosen}`,
          name: product.name,
          image: product.image1,
          price: product.price,
          size: product.sizeChosen
        })
        if (chosenSize === 0) {
          messageWindow.classList.toggle('hidden')
          messageWindow.className = 'message-window-normal'
          messageIcon.innerHTML = info
          mainMessage.innerText = 'Előszőr válassz hozzá méretet!'
        } else {
          messageWindow.classList.toggle('hidden')
          messageWindow.className = 'message-window-success'
          messageIcon.innerHTML = success
          mainMessage.innerText = 'Sikeresen hozzáadva a kosárhoz'
          chosenSize = 0
        }

      })

      const status = document.getElementById('product-isInStock')
      if (status.innerText === 'Raktáron') {
        status.className = 'text-green-400 text-center md:text-start'
      } else if (status.innerText === 'Jelenleg nincs raktáron') {
        status.className = 'text-red-500 text-center md:text-start'
      }
  },

  render: async function () {

    const product = await getProduct()

    let convertedPrice
    const currency = localStorage.getItem('selectedCurrency')

    if (currency === 'EUR') {
      convertedPrice = `${formatPrice(Math.round(product.price * localStorage.getItem('HUF_TO_EUR')))} EUR`
    } else {
      convertedPrice = `${formatPrice(product.price)} HUF`
    }

    return `
    <div class="md:grid md:grid-cols-2">
        <div>
            <div id="main-product-pic">
              <img id="main-product-image" src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}">
            </div>
            <div id="product-pic-container">
                <div id="product-pic-1" class="border-2 border-black shadow-md">
                  <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}">
                </div>
                <div id="product-pic-2" class="shadow-md">
                  <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image2}">
                </div>
                <div id="product-pic-3" class="shadow-md">
                  <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image3}">
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-8">
            <div id="product-name">${product.name}</div>
            <div id="product-price" class="flex justify-center md:justify-start gap-4">
              <p>Ár: </p>
              <p class="font-light">${convertedPrice}</p>
            </div>
            <div id="" class="flex justify-center text-2xl">Méretek</div>
            <div class="flex justify-center">
              <div id="product-sizes" class="grid grid-cols-5 w-1/2 text-center gap-2">
                <button id="size-36">36</button>
                <button id="size-37">37</button>
                <button id="size-38">38</button>
                <button id="size-39">39</button>
                <button id="size-40">40</button>
                <button id="size-41">41</button>
                <button id="size-42">42</button>
                <button id="size-43">43</button>
                <button id="size-44">44</button>
                <button id="size-45">45</button>
              </div>
            </div>
            <div class="flex justify-center md:justify-start">
            <div class="text-2xl text-center md:text-start">Elérhetőség:
              <div id="product-isInStock">${product.isInStock ? 'Raktáron' : 'Jelenleg nincs raktáron'}</div>
            </div>
            </div>
            <div id="product-toCart">
              <button id="product-toCart-btn" class="bg-green-500 text-white rounded-full mb-8 px-8 py-2 shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Kosárba</button>
            </div>
        </div>
    </div>

    <div id="full-product-pic" class="fixed inset-0 bg-gray-900 bg-opacity-50 hidden z-20">
  <div class="relative h-full">
    <img id="full-product-image" src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" class="hover:cursor-zoom-in transform transition-transform m-auto max-w-full max-h-full relative z-20">
    <button id="full-pic-close" class="absolute top-0 right-0 z-20 bg-white rounded-full p-2 m-4">Bezárás</button>
  </div>
</div>
    `
  },

  changePictures: async function () {
    const product = await getProduct()

    let pic1 = document.getElementById("product-pic-1")
    let pic2 = document.getElementById("product-pic-2")
    let pic3 = document.getElementById("product-pic-3")

    pic1.addEventListener('click', changePic1)
    pic2.addEventListener('click', changePic2)
    pic3.addEventListener('click', changePic3)

    function changePic1() {
      document.getElementById("main-product-image").src = `https://projekt-webshop-backend.onrender.com/uploads/${product.image1}`
      pic1.className = "border-2 border-black shadow-md"
      pic2.className = "shadow-md"
      pic3.className = "shadow-md"
    }

    function changePic2() {
      document.getElementById("main-product-image").src = `https://projekt-webshop-backend.onrender.com/uploads/${product.image2}`
      pic2.className = "border-2 border-black shadow-md"
      pic1.className = "shadow-md"
      pic3.className = "shadow-md"
    }

    function changePic3() {
      document.getElementById("main-product-image").src = `https://projekt-webshop-backend.onrender.com/uploads/${product.image3}`
      pic3.className = "border-2 border-black shadow-md"
      pic1.className = "shadow-md"
      pic2.className = "shadow-md"
    }


    let mainImg = document.getElementById('main-product-image')
    let fullImage = document.getElementById('full-product-image')
    let fullPicClose = document.getElementById('full-pic-close')

    fullImage.addEventListener('click', function() {
      if (fullImage.classList.contains('scale-150')) {
        fullImage.classList.remove('scale-150')
        fullImage.classList.remove('hover:cursor-zoom-out')
        fullImage.classList.add('hover:cursor-zoom-in')
      } else {
        fullImage.classList.add('scale-150')
        fullImage.classList.remove('hover:cursor-zoom-in')
        fullImage.classList.add('hover:cursor-zoom-out')
      }
    })

    mainImg.addEventListener('click', function () {
      chosenPic = mainImg.src
      fullImage.src = chosenPic
      document.getElementById('full-product-pic').classList.toggle('hidden')
    })

    fullPicClose.addEventListener('click', function() {
      document.getElementById('full-product-pic').classList.toggle('hidden')
    })




  },

  sizes: async function () {
    const product = await getProduct()
    const availableSizes = product.sizes.split(" ").map(size => parseInt(size));


    for (let i = 36; i <= 45; i++) {
      const sizeId = `size-${i}`
      const sizeEl = document.getElementById(sizeId)

      if (!availableSizes.includes(i)) {
        sizeEl.className = "size-notInStock"
      } else {
        sizeEl.className = "not-chosen-size"
        sizeEl.name = "not-chosen-size"
        sizeEl.addEventListener('click', function () {
          chosenSize = i
        })
      }

    }

    const choseableElements = document.getElementsByName('not-chosen-size')
    for (let button of choseableElements) {

      button.addEventListener('click', function () {
        for (let b of choseableElements) {
          b.className = "not-chosen-size"
        }
        button.className = "chosen-size"
      })
    }



  }
}
