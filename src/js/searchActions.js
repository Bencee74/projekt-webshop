import { formatPrice } from "./services.js"

export let searchProductsBy = ''
export let searchProductsByMobile = ''

let productElements = []
const searchInput = document.getElementById('search-input')
const searchResults = document.getElementById('search-results')
const searchButton = document.getElementById('search-btn')

searchInput.addEventListener('input', async function () {
  const response = await fetch('https://projekt-webshop-backend.onrender.com/api/products', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const products = await response.json()

  const searchTerm = searchInput.value.toLowerCase()
  if (searchTerm === '') {
    searchResults.innerHTML = ''
    searchResults.classList.add('hidden')
    searchProductsBy = ''
    return
  }
  productElements = []
  searchResults.classList.remove('hidden')

  const filteredProducts = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchTerm)
  })

  filteredProducts.forEach((product) => {
    productElements.push(`
    <a href="/#/product/${product._id}">
      <div name="product-ref" class="flex gap-4 justify-start text-center items-center pr-4 hover:bg-product-color">
              <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" width=72 />
          <div class="">
              ${product.name}
          </div>
          <div class="">
              ${formatPrice(product.price)} HUF
          </div>
      </div>
      </a>
    `)
  })

  if (filteredProducts.length > 0) {
    searchResults.innerHTML = `<div id="productContainer" class="flex justify-center">
    <div id="productList" class="">
        ${productElements.join('')}
    </div>
  </div>`
  } else  {
    searchResults.innerHTML = ''
  }

  searchResults.addEventListener('click', function () {
    searchResults.classList.add('hidden')
    searchInput.value = ''
  })

})

searchButton.addEventListener('click', function () {
  searchProductsByMobile = ''
  searchProductsBy = searchInput.value.toLowerCase()
  searchResults.classList.add('hidden')
  searchInput.value = ''
  const language = localStorage.getItem('language') || 'Hungarian'
  if (searchProductsBy && productElements.length !== 0 && language === 'English') {
    location.hash = '/en/search-result'
  } else if (searchProductsBy && productElements.length !== 0 && language === 'Hungarian') {
    location.hash = '/search-result'
  }
})


const mobileSearchButton = document.getElementById('search-btn-mobile')
const mobileSearchBar = document.getElementById('search-bar-mobile')
const mobileLogo = document.getElementById('mobile-logo')
const searchInputMobile = document.getElementById('search-input-mobile')
const searchResultsMobile = document.getElementById('search-results-mobile')

mobileSearchButton.addEventListener('click', function() {
  mobileSearchBar.classList.toggle('hidden')
  mobileLogo.classList.toggle('hidden')
})

searchInputMobile.addEventListener('input', async function () {
  const response = await fetch('https://projekt-webshop-backend.onrender.com/api/products', {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const products = await response.json()

  const searchTerm = searchInputMobile.value.toLowerCase()
  if (searchTerm === '') {
    searchResultsMobile.innerHTML = ''
    searchResultsMobile.classList.add('hidden')
    searchProductsByMobile = ''
    return
  }
  productElements = []
  searchResultsMobile.classList.remove('hidden')

  const filteredProducts = products.filter(function (product) {
    return product.name.toLowerCase().includes(searchTerm)
  })

  filteredProducts.forEach((product) => {
    productElements.push(`
    <a href="/#/product/${product._id}">
      <div name="product-ref" class="flex gap-4 justify-start text-center items-center pr-4 hover:bg-product-color">
              <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" width=72 />
          <div class="">
              ${product.name}
          </div>
          <div class="">
              ${formatPrice(product.price)} HUF
          </div>
      </div>
      </a>
    `)
  })

  if (filteredProducts.length > 0) {
    searchResultsMobile.innerHTML = `<div id="productContainer" class="flex justify-center">
    <div id="productList" class="">
        ${productElements.join('')}
    </div>
  </div>`
  } else  {
    searchResultsMobile.innerHTML = ''
  }

  searchResultsMobile.addEventListener('click', function () {
    searchResultsMobile.classList.add('hidden')
    searchInputMobile.value = ''
    mobileSearchBar.classList.toggle('hidden')
    mobileLogo.classList.toggle('hidden')
  })

})

mobileSearchButton.addEventListener('click', function () {
  searchProductsBy = ''
  searchProductsByMobile = searchInputMobile.value.toLowerCase()
  searchResultsMobile.classList.add('hidden')
  searchInputMobile.value = ''
  const language = localStorage.getItem('language') || 'Hungarian'
  if (searchProductsByMobile && productElements.length !== 0 && language === 'English') {
    location.hash = '/en/search-result'
  } else if (searchProductsByMobile && productElements.length !== 0 && language === 'Hungarian') {
    location.hash = '/search-result'
  }
})
