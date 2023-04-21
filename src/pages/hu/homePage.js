import { formatPrice } from "../../js/services.js"

export const homePage = {
    render: async function () {
        const response = await fetch("https://projekt-webshop-backend.onrender.com/api/products", {
            headers: {
                "Content-Type": "application/json",
            },
        })
      
        const products = await response.json()

        let featuredProducts = products.filter(function (product) {
            return product.featured === true
          })
      
          let productElements = []
          const selectedCurrency = localStorage.getItem('selectedCurrency') || 'HUF'
      
          if (selectedCurrency === 'HUF') {
            featuredProducts.forEach(product => {
              productElements.push(`
                <div class="product">
                    <a href="/#/product/${product._id}" class="container">
                        <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" class="rounded-lg shadow-md mb-4" />
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
            featuredProducts.forEach(product => {
              productElements.push(`
                <div class="product">
                    <a href="/#/product/${product._id}" class="container">
                        <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" class="rounded-lg shadow-md mb-4" />
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
    <div id="mainImg" class="flex justify-center">
      <img src="./images/main-pic.jpg" alt="Cover picture">
    </div>

    <div> 
        <p class="uppercase text-3xl md:text-4xl p-8 flex justify-center text-center mt-16">Népszerű termékeink</p> 
    </div>

    <div id="productContainer" class="flex justify-center">
        <div id="productList" class="mx-24 grid gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            ${productElements.join('')}
        </div>
      </div>
    <div class="flex justify-center">
        <button class="button" id="redirect-button" onclick="window.location.assign('/#/all')">Megnézem az összeset</button>
    </div>
    <div> 
        <p class="uppercase text-3xl md:text-4xl py-28 flex text-center justify-center border-t-2 mx-16">Termékeink sportágak szerint</p>
    </div>
    
    <div class="flex justify-center">
        <div id="brands" class="grid md:grid-cols-2 lg:grid-cols-3 gap-16 mx-16">

            <div class="relative">
            <a href='/#/football'>
                <img src="./images/football-cover.png" alt="Futball" class="category-photo">
                <div class="absolute inset-0 flex items-center justify-center">
                   <p class="category-photo-text">Futball</p>
                </div>
            </a>
            </div>

            <div class="relative">
            <a href='/#/tennis'>
                <img src="./images/tennis-cover.png" alt="Tenisz" class="category-photo">
                <div class="absolute inset-0 flex items-center justify-center">
                    <p class="category-photo-text">Tenisz</p>
                </div>
            </a>
            </div>

            <div class="relative">
            <a href='/#/basketball'>
                <img src="./images/basketball-cover.png" alt="Kosárlabda" class="category-photo">
                <div class="absolute inset-0 flex items-center justify-center">
                   <p class="category-photo-text">Kosárlabda</p>
                </div>
            </a>
            </div>


        </div>
    </div>

    <div class="flex justify-center">
        <button class="button" id="redirect-button" onclick="window.location.assign('/#/all')">Megnézem az összeset</button>
    </div>
    `
    },
}
