import { messageWindow, mainMessage, failed, info, success, messageIcon, messageCloseButton } from "../../js/services.js"

export const editOrdersPageEN = {
    render: async function () {
      const token = localStorage.getItem('token')
      const response = await fetch("https://projekt-webshop-backend.onrender.com/api/orders", {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      })
     
      const orders = await response.json()

let orderElements = orders.map(order => {
  let productsHtml = order.products.map(product => {
    return `
    <div id="product-in-cart" class="flex flex-col md:flex-row justify-center items-center md:grid md:grid-cols-2 border-t border-gray-300 py-4">
    <div class="w-48 mb-4 md:mb-0 md:mr-4 md:border-r md:pr-4">
          <a href="#/product/${encodeURIComponent((product._id).split('_')[0])}">
            <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image}" class="w-full">
          </a>
        </div>
        <div class="flex flex-col items-center md:items-start justify-center">
          <div class="text-lg">${product.name}</div>
          <p class="mt-2">Quantity: ${product.quantity}</p>
          <div>Price: ${product.price} HUF</div>
          <div>Size: ${product.size}</div>
        </div>
      </div>
    `
  }).join('')

  return `
    <div class="my-12 px-6 py-4 bg-white rounded-lg shadow-lg">
      <div class="flex items-center justify-between">
        <div class="text-lg font-medium">Order: ${order._id}</div>
        <div><i name="delete-${order._id}" id="${order._id}" class="fa-solid fa-trash hover:cursor-pointer"></i></div>
      </div>
      <div class="text-gray-500 mt-2">Customer: ${order.username}</div>
      <div class="text-gray-500">Date: ${order.date}</div>
      <div id="products" class="mt-4 flex flex-col">${productsHtml}</div>
      <div class="flex items-center justify-end mt-4 text-lg font-medium">Total price: ${order.totalPrice}</div>
    </div>
  `;
});

return `
    <div> 
        <p class="uppercase text-3xl md:text-4xl p-8 flex justify-center mt-16">All orders</p> 
    </div>
    <div class="container mx-auto mb-12 max-w-screen-lg">
        <div class="grid grid-cols-1 gap-6">
            ${orderElements.join('')}
        </div>
    </div>
`;
},
  
    after_render: async function () {
  
      const deleteButtons = document.querySelectorAll('[name*="delete"]')
      const token = localStorage.getItem('token')
  
      deleteButtons.forEach(button => {
        const idOfProduct = button.id
  
        button.addEventListener('click', async () => {
          const result = await fetch(`https://projekt-webshop-backend.onrender.com/api/orders/${idOfProduct}`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + token
            },
  
          }).then((res) => res.json())
  
          if (result.status === 'ok') {
            messageWindow.classList.toggle('hidden')
            messageWindow.className = 'message-window-success'
            messageIcon.innerHTML = success
            mainMessage.innerText = 'A rendelés sikeresen törölve!'
  
          }
  
        })
      })
    }
  }
