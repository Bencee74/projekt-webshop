export const addProductPageEN = {

    after_render: () => {
        const productForm = document.querySelector('#productForm')
        const token = localStorage.getItem('token')
        productForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const formData = new FormData(productForm)
            const featured = document.getElementById("featured").checked
            const isInStock = document.getElementById("isInStock").checked
            formData.set('featured', featured)
            formData.set('isInStock', isInStock)
            const url = 'https://projekt-webshop-backend.onrender.com/api/products'

            fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
              .then(response => {
                if (!response.ok) {
                  throw new Error('You must be an admin to upload products.')
                }
                return response.json()
              })
              .then(data => {
                console.log(data)
                alert('Product uploaded successfully!')
              })
              .catch(error => {
                console.error(error)
                alert(error.message)
              })
        })
    },

    render: () => {
      return `
      <div class="flex justify-center text-xl font-bold mb-8">Add new product</div>
<div class="mt-8 flex justify-center mb-8">
<form id="productForm" class="max-w-md mx-auto" enctype="multipart/form-data">
  <div class="mb-4">
    <label for="name" class="block text-gray-700 font-bold mb-2">Name:</label>
    <input type="text" id="name" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="brand" class="block text-gray-700 font-bold mb-2">Brand:</label>
    <input type="text" id="brand" name="brand" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="category" class="block text-gray-700 font-bold mb-2">Category:</label>
    <input type="text" id="category" name="category" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="price" class="block text-gray-700 font-bold mb-2">Price:</label>
    <input type="number" id="price" name="price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="sizes" class="block text-gray-700 font-bold mb-2">Sizes:</label>
    <input type="text" id="sizes" name="sizes" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
  </div>

  <div class="mb-4">
    <label for="image1" class="block text-gray-700 font-bold mb-2">Image 1:</label>
    <input type="file" id="image1" name="productImages"/>
  </div>

  <div class="mb-4">
    <label for="image2" class="block text-gray-700 font-bold mb-2">Image 2:</label>
    <input type="file" id="image2" name="productImages"/>
  </div>

  <div class="mb-4">
    <label for="image3" class="block text-gray-700 font-bold mb-2">Image 3:</label>
    <input type="file" id="image3" name="productImages"/>
  </div>

  <div class="mb-4">
    <label for="isInStock" class="block text-gray-700 font-bold mb-2">Is In Stock:</label>
    <input type="checkbox" id="isInStock" name="isInStock" class="mr-2 leading-tight">
  </div>

  <div class="mb-4">
    <label for="featured" class="block text-gray-700 font-bold mb-2">Featured:</label>
    <input type="checkbox" id="featured" name="featured" class="mr-2 leading-tight">
  </div>

  <div class="flex justify-center">
    <input type="submit" value="Submit" class="bg-green-500 text-white rounded-full px-4 py-2 shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
  </div>
</form>
</div>
          `
  }
}