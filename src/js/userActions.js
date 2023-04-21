import { messageWindow, mainMessage, failed, info, success, messageIcon } from "./services.js"


const profileIcon = document.getElementById("profile-icon")
const profileIconMobile = document.getElementById('profile-icon-mobile')
const dropdownMenu = document.getElementById("dropdown-menu")
const dropdownMenu2 = document.getElementById('dropdown-menu2')
const dropdownMenu3 = document.getElementById('dropdown-menu3')
const username = localStorage.getItem('username')
const tokenForAdmin = localStorage.getItem('token')

const loginButton = document.getElementById('submit-login')
const registerButton = document.getElementById('submit-register')

document.getElementById('logged-in-user').addEventListener('click', function() {
  dropdownMenu2.classList.toggle("hidden")
})

profileIcon.addEventListener("click", function (event) {
  const language = localStorage.getItem('language') || 'Hungarian'
  event.preventDefault()

  if (username) {
    if (language === 'English') {
      document.getElementById('logged-in-user').innerHTML = `<div>Welcome, ${localStorage.getItem('username')}!</div>
      <div class="mt-4">
        <a href="/#/en/myorders">
           My orders
        </a>
      </div>`
    } else {
      document.getElementById('logged-in-user').innerHTML = `<div>Üdv, ${localStorage.getItem('username')}!</div>
      <div class="mt-4">
        <a href="/#/myorders">
           Összes rendelésem
        </a>
      </div>`
    }
    if (tokenForAdmin) {
      if (language === 'English') {
        document.getElementById('admin-dashboard').innerHTML = `
      <div class="grid grid-rows-2 gap-4 mt-4">
        <a href="/#/en/addproduct">
          <button>Add new product</button>
        </a>
        <a href="/#/en/editproduct">
          <button>Edit products</button>
        </a>
        <a href="/#/en/edit-orders">
          <button>Edit orders</button>
        </a>
      </div>
     `
      } else {
        document.getElementById('admin-dashboard').innerHTML = `
      <div class="grid grid-rows-2 gap-4 mt-4">
        <a href="/#/addproduct">
          <button>Új termék felvétele</button>
        </a>
        <a href="/#/editproduct">
          <button>Termékek szerkesztése</button>
        </a>
        <a href="/#/edit-orders">
          <button>Rendelések szerkesztése</button>
        </a>
      </div>
     `
      }
    }
    dropdownMenu2.classList.toggle("hidden")
    

  } else {
    dropdownMenu.classList.toggle("hidden")
    if (!(dropdownMenu3.classList.contains('hidden'))) {
      dropdownMenu.classList.toggle('hidden')
      dropdownMenu3.classList.toggle('hidden')
    }
  }
})

profileIconMobile.addEventListener("click", function (event) {
  const language = localStorage.getItem('language') || 'Hungarian'
  event.preventDefault()

  if (username) {
    if (language === 'English') {
      document.getElementById('logged-in-user').innerHTML = `<div>Welcome, ${localStorage.getItem('username')}!</div>
      <div class="mt-4">
        <a href="/#/en/myorders">
           My orders
        </a>
      </div>`
    } else {
      document.getElementById('logged-in-user').innerHTML = `<div>Üdv, ${localStorage.getItem('username')}!</div>
      <div class="mt-4">
        <a href="/#/myorders">
           Összes rendelésem
        </a>
      </div>`
    }
    if (tokenForAdmin) {
      if (language === 'English') {
        document.getElementById('admin-dashboard').innerHTML = `
      <div class="grid grid-rows-2 gap-4 mt-4">
        <a href="/#/en/addproduct">
          <button>Add new product</button>
        </a>
        <a href="/#/en/editproduct">
          <button>Edit products</button>
        </a>
        <a href="/#/en/edit-orders">
          <button>Edit orders</button>
        </a>
      </div>
     `
      } else {
        document.getElementById('admin-dashboard').innerHTML = `
      <div class="grid grid-rows-3 gap-4 mt-4">
        <a href="/#/addproduct">
          <button>Új termék felvétele</button>
        </a>
        <a href="/#/editproduct">
          <button>Termékek szerkesztése</button>
        </a>
        <a href="/#/edit-orders">
          <button>Rendelések szerkesztése</button>
        </a>
      </div>
     `
      }
    }
    dropdownMenu2.classList.toggle("hidden")

  } else {
    dropdownMenu.classList.toggle("hidden")
    if (!(dropdownMenu3.classList.contains('hidden'))) {
      dropdownMenu.classList.toggle('hidden')
      dropdownMenu3.classList.toggle('hidden')
    }
  }
})


loginButton.addEventListener('click', loginUser)

async function loginUser(event) {
  event.preventDefault()

  const username = document.getElementById("username-login").value
  const password = document.getElementById("password-login").value

  const result = await fetch('https://projekt-webshop-backend.onrender.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())

  if (result.status === 'ok') {

    const { token, username, isAdmin } = result

    if (isAdmin) {
       localStorage.setItem('token', token)
    }
    localStorage.setItem("username", username)

    messageWindow.classList.toggle('hidden')
    messageWindow.className = 'message-window-success'
    messageIcon.innerHTML = success
    mainMessage.innerText = 'Sikeres bejelentkezés!'


  } else {
    messageWindow.classList.toggle('hidden')
    messageWindow.className = 'message-window-failed'
    messageIcon.innerHTML = failed
    mainMessage.innerText = 'Hibás felhasználónév vagy jelszó!'
  }
}


document.getElementById('logout').addEventListener('click', function () {
  location.reload()
  localStorage.removeItem('username')
  document.getElementById('logged-in-user').innerText = ''
  document.getElementById('admin-dashboard').innerText = ''
  localStorage.removeItem('token')
  tokenForAdmin = ''
})

document.getElementById('register-text').addEventListener('click', function () {
  dropdownMenu3.classList.toggle("hidden")
  dropdownMenu.classList.toggle("hidden")
})

document.getElementById('login-text').addEventListener('click', function () {
  dropdownMenu.classList.toggle("hidden")
  dropdownMenu3.classList.toggle("hidden")
})


registerButton.addEventListener('click', registerUser)

async function registerUser(event) {
  event.preventDefault()
  const username = document.getElementById("username-reg").value
  const password = document.getElementById("password-reg1").value
  const password2 = document.getElementById("password-reg2").value

  if (password === password2) {
    const result = await fetch('https://projekt-webshop-backend.onrender.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then((res) => res.json())

    if (result.status === 'ok') {

      messageWindow.classList.toggle('hidden')
      messageWindow.className = 'message-window-success'
      messageIcon.innerHTML = success
      mainMessage.innerText = 'Sikeres regisztráció!'

    } else if (result.status === 'username-error') {

      messageWindow.classList.toggle('hidden')
      messageWindow.className = 'message-window-failed'
      messageIcon.innerHTML = failed
      mainMessage.innerText = 'A felhasználónév már foglalt!'

    } else if (result.status === 'password-length-error') {

      messageWindow.classList.toggle('hidden')
      messageWindow.className = 'message-window-failed'
      messageIcon.innerHTML = failed
      mainMessage.innerText = 'A jelszó nem lehet rövidebb 6 karakternél!'

    } else {

      messageWindow.classList.toggle('hidden')
      messageWindow.className = 'message-window-failed'
      messageIcon.innerHTML = failed
      mainMessage.innerText = 'Sikertelen regisztráció!'
    }
  } else {
    messageWindow.classList.toggle('hidden')
    messageWindow.className = 'message-window-failed'
    messageIcon.innerHTML = failed
    mainMessage.innerText = 'A két jelszó nem egyezik meg!'
  }

}