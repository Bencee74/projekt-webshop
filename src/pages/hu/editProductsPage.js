import { messageWindow, mainMessage, failed, info, success, messageIcon, messageCloseButton } from "../../js/services.js"

export const editProductsPage = {
  render: async function () {
    const token = localStorage.getItem('token')
    const response = await fetch("https://projekt-webshop-backend.onrender.com/api/products", {
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
    })
   
    const products = await response.json()

    let productElements = []
    products.forEach(product => {
      productElements.push(`
        <div class="product">
            <a href="/#/product/${product._id}" class="container">
                <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image1}" alt="${product.name}" class="productImg" />
            </a>
            <div class="product-name">
                ${product.name}
            </div>
            <div class="flex justify-center gap-4 my-8">
            <a href="/#/editproduct/${product._id}">
              <i name="edit-${product._id}" id="${product._id}" class="fa-solid fa-pen-to-square hover:cursor-pointer"></i>
            </a>
            <i name="delete-${product._id}" id="${product._id}" class="fa-solid fa-trash hover:cursor-pointer"></i>
            </div>
        </div>
        `)
    })

    return `
      <div> 
        <p class="uppercase text-3xl md:text-4xl p-8 flex justify-center mt-16">Termékek listája</p> 
      </div>
      <div id="productContainer" class="flex justify-center">
        <div id="productList" class="mx-24 grid gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            ${productElements.join('')}
        </div>
    </div>

      `
  },

  after_render: async function () {

    const deleteButtons = document.querySelectorAll('[name*="delete"]')
    const token = localStorage.getItem('token')

    deleteButtons.forEach(button => {
      const idOfProduct = button.id

      button.addEventListener('click', async () => {
        const result = await fetch(`https://projekt-webshop-backend.onrender.com/api/products/${idOfProduct}`, {
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
          mainMessage.innerText = 'A termék sikeresen törölve!'

        } else if (result.status === 'Unauthorized') {
          messageWindow.classList.toggle('hidden')
          messageWindow.className = 'message-window-failed'
          messageIcon.innerHTML = failed
          mainMessage.innerText = 'Nincs admin jogod ehhez!'
        }

      })
    })
  }
}