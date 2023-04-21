export const myOrders = {
  render: async function () {

    const username = localStorage.getItem('username')
    const response = await fetch(`https://projekt-webshop-backend.onrender.com/api/orders/${username}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const orders = await response.json()
    const ordersListWithoutUsername = orders.orders.map(({ _id, products, totalPrice, date }) => ({ _id, products, totalPrice, date }))
    let orderElements = ordersListWithoutUsername.map(order => {
      let productsHtml = order.products.map(product => {
        return `
          <div id="product-in-cart" class="flex flex-col md:flex-row justify-center items-center md:grid md:grid-cols-2 border-t border-gray-300 py-4">
            <div class="w-48 mb-4 md:mb-0 md:mr-4 border-r border-gray-300 md:pr-4">
              <a href="#/product/${encodeURIComponent((product._id).split('_')[0])}">
                <img src="https://projekt-webshop-backend.onrender.com/uploads/${product.image}" class="w-full">
              </a>
            </div>
            <div class="flex flex-col items-center md:items-start justify-center">
              <div class="text-lg">${product.name}</div>
              <p class="mt-2">Darabszám: ${product.quantity}</p>
              <div>Ár: ${product.price} HUF</div>
              <div>Méret: ${product.size}</div>
            </div>
          </div>
        `
      }).join('')

      return `
        <div class="my-12 px-6 py-4 bg-white rounded-lg shadow-lg">
          <div class="flex items-center justify-between">
            <div class="text-lg font-medium">Rendelés: ${order._id}</div>
          </div>
          <div class="text-gray-500">Időpont: ${order.date}</div>
          <div id="products" class="mt-4 flex flex-col">${productsHtml}</div>
          <div class="flex items-center justify-end mt-4 text-lg font-medium">Végösszeg: ${order.totalPrice}</div>
        </div>
      `;
    });

    return `
      <div> 
        <p class="uppercase text-3xl md:text-4xl p-8 flex justify-center mt-16">Összes rendelésem</p> 
      </div>
      <div class="container mx-auto mb-12 max-w-screen-lg">
        <div class="grid grid-cols-1 gap-6">
          ${orderElements.join('')}
        </div>
      </div>
      `;
  }
}

