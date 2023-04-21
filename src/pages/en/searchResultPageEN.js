import { formatPrice } from "../../js/services.js"
import { searchProductsBy, searchProductsByMobile } from "../../js/searchActions.js"

export const searchResultPageEN = {
    render: async function () {
      const response = await fetch("https://projekt-webshop-backend.onrender.com/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      
      const products = await response.json()

      let searchBy = ''
      if (searchProductsBy.length > 0) {
        searchBy = searchProductsBy
      } else if (searchProductsByMobile.length > 0) {
        searchBy = searchProductsByMobile
      }


      const filteredProducts = products.filter(function (product) {
        return product.name.toLowerCase().includes(searchBy);
      })
  
      let productElements = []
      let selectedCurrency = localStorage.getItem('selectedCurrency') || 'HUF'
  
      if (selectedCurrency === 'HUF') {
        filteredProducts.forEach(product => {
          productElements.push(`
            <div class="product">
                <a href="/#/product/${product._id}" class="container">
                    <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" class="productImg" />
                </a>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    ${formatPrice(product.price)} HUF
                </div>
            </div>
          `)
        })
      } else if (selectedCurrency === 'EUR') {
        filteredProducts.forEach(product => {
          productElements.push(`
            <div class="product">
                <a href="/#/product/${product._id}" class="container">
                    <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" class="productImg" />
                </a>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-price">
                    ${Math.round(product.price * localStorage.getItem('HUF_TO_EUR'))} EUR
                </div>
            </div>
          `)
        })
      }
  
      return `
        <div> 
          <p class="uppercase text-3xl md:text-4xl p-8 flex justify-center text-center mt-16">All products that matches your search</p> 
        </div>
        <div id="productContainer" class="flex justify-center">
          <div id="productList" class="mx-24 grid gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              ${productElements.join('')}
          </div>
        </div>
      `
    },
  }
  