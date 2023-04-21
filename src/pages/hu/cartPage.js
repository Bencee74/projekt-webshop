import { decreaseItemQuantity, getCart, increaseItemQuantity, removeItemFromCart } from "../../js/cartActions.js"
import { formatPrice, messageWindow, mainMessage, failed, info, success, messageIcon } from "../../js/services.js"

export const cartPage = {

  after_render: () => {

    const selectedCurrency = localStorage.getItem('selectedCurrency') || 'HUF'
    const itemsInCart = getCart()
    const username = localStorage.getItem('username')

    let totalPrice = 0
    let totalPriceForOrder = 0

    if (selectedCurrency === 'EUR') {
      totalPrice = 0
      for (let item of itemsInCart) {
        totalPrice += (Math.round((item.price * localStorage.getItem('HUF_TO_EUR'))) * item.quantity)
      }
      totalPrice = `${formatPrice(totalPrice)} EUR`
    } else if (selectedCurrency === 'HUF') {
      totalPrice = 0
      for (let item of itemsInCart) {
        totalPrice += (item.price * item.quantity)
      }
      totalPrice = `${formatPrice(totalPrice)} HUF`
    }

    for (let item of itemsInCart) {
      totalPriceForOrder += (item.price * item.quantity)
    }
    totalPriceForOrder = `${formatPrice(totalPriceForOrder)} HUF`

    const orderButton = document.getElementById('order-button')
    orderButton.addEventListener('click', async function () {

      const result = await fetch('https://projekt-webshop-backend.onrender.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          products: itemsInCart,
          totalPrice: totalPriceForOrder
        })

      }).then((res) => res.json())


      if (result.status === 'ok' && username) {

        messageWindow.classList.toggle('hidden')
        messageWindow.className = 'message-window-success'
        messageIcon.innerHTML = success
        mainMessage.innerHTML = 'Sikeresen leadtad a rendelést!\nA profil ikonod alatt megtekintheted az összes rendelésed.'
        localStorage.removeItem('cart')
      } else if (result.status === 'error' && username) {
        messageWindow.classList.toggle('hidden')
        messageWindow.className = 'message-window-normal'
        messageIcon.innerHTML = info
        mainMessage.innerText = "A kosarad jelenleg üres!"
      } else if (result.status === 'error' && !username) {
        messageWindow.classList.toggle('hidden')
        messageWindow.className = 'message-window-normal'
        messageIcon.innerHTML = info
        mainMessage.innerText = "A rendelés leadásához be kell jelentkezned!"
      }
    })

    const deleteButtons = document.getElementsByName('delete-button')
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeItemFromCart(deleteButton.id)
      })
    })

    const increaseButtons = document.getElementsByName('increase-button')
    Array.from(increaseButtons).forEach((increaseButton) => {
      increaseButton.addEventListener('click', () => {
        increaseItemQuantity(increaseButton.id)
      })
    })

    const decreaseButtons = document.getElementsByName('decrease-button')
    Array.from(decreaseButtons).forEach((decreaseButton) => {
      decreaseButton.addEventListener('click', () => {
        decreaseItemQuantity(decreaseButton.id)
      })
    })
  },

  render: async () => {

    const itemsInCart = getCart()

    let cartElements = []
    const selectedCurrency = localStorage.getItem('selectedCurrency') || 'HUF'

    itemsInCart.forEach(product => {
      cartElements.push(`<div id="product-in-cart" class="flex flex-col md:grid md:grid-cols-3 items-center border-t border-gray-300 py-4">
        <div class="md:border-r md:pr-4">
          <a href="#/en/product/${encodeURIComponent((product._id).split('_')[0])}">
            <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image}" class="w-full">
          </a>
        </div>
        <div class="md:px-4 mt-4 md:mt-0 text-center md:text-left">
          <div class="text-xl font-semibold">${product.name}</div>
          <div class="text-gray-600">${formatPrice(product.price)} HUF</div>
          <div class="text-gray-600">Méret: ${product.size}</div>
        </div>
        <div class="flex items-center justify-center md:justify-end mt-4 md:mt-0">
          <div class="flex items-center justify-center border border-gray-400 rounded-full px-2 py-1">
            <button><i class="fa-solid fa-plus text-gray-500 hover:text-black" id=${product._id} name="increase-button"></i></button>
            <p class="text-gray-700 mx-2">${product.quantity}</p>
            <button><i class="fa-solid fa-minus text-gray-500 hover:text-black" id=${product._id} name="decrease-button"></i></button>
          </div>
          <button class="ml-4"><i class="fa-solid fa-trash" id="${product._id}" name="delete-button"></i></button>
        </div>
      </div>`)
    })


    let totalQuantityInCart = 0
    let totalPrice = 0


    if (selectedCurrency === 'EUR') {
      totalPrice = 0
      for (let item of itemsInCart) {
        totalQuantityInCart += item.quantity
        totalPrice += (Math.round((item.price * localStorage.getItem('HUF_TO_EUR'))) * item.quantity)
      }
      totalPrice = `${formatPrice(totalPrice)} EUR`
    } else if (selectedCurrency === 'HUF') {
      totalPrice = 0
      for (let item of itemsInCart) {
        totalQuantityInCart += item.quantity
        totalPrice += (item.price * item.quantity)
      }
      totalPrice = `${formatPrice(totalPrice)} HUF`
    }



    return `<div id="main-cart-container" class="mb-8">
        ${itemsInCart.length === 0
        ? `<div class="bg-gray-100 p-4 rounded-lg shadow-md text-center text-gray-600 md:mt-32">
        <div class="text-xl font-semibold mb-2">A kosár jelenleg üres</div>
        <div>Válogass termékeink közül, majd térj vissza erre az oldalra!</div>
      </div>`
        :
        `<div class="flex justify-center text-3xl p-8">
          <p>Kosár tartalma</p>
         </div>
        ${cartElements.join('')}`
      }
        
      <div id="cart-total" class="bg-gray-100 p-4 rounded-lg shadow-md mt-24">
      <div class="flex flex-col items-center text-center md:text-start md:grid md:grid-cols-2 gap-4">
        <div>
          <div class="text-lg font-semibold text-gray-700">Kosár összegzés</div>
          <div class="text-gray-600 mt-2">
            <span class="font-medium">${totalQuantityInCart} termék</span>
            <span class="text-gray-500">van a kosárban</span>
          </div>
          <div class="text-gray-600 mt-2">
            <span class="font-medium">Végösszeg:</span>
            <span class="font-semibold">${totalPrice}</span>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <button id="order-button" class="bg-green-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            Rendelés leadása
          </button>
        </div>
      </div>
    </div>
    </div>
    
        `
  },
}

