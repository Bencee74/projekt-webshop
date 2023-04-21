export const messageWindow = document.getElementById('message-window-for-user')
export const mainMessage = document.getElementById('main-message-for-user')
export const closeMessageButton = document.getElementById('message-close-button')
export const failed = `<i id="failed" class="hidden z-10 fa-sharp fa-solid fa-circle-exclamation"></i>`
export const info = `<i id="info" class="hidden z-10 fa-solid fa-circle-info"></i>`
export const success = `<i id="success" class="hidden z-10 fa-solid fa-circle-check"></i>`
export const messageIcon = document.getElementById('message-icon')
export const messageCloseButton = document.getElementById('message-close-button')

export let uname = ''


export function formatPrice(num) {

  const numString = num.toString()
  const numLength = numString.length
  const numArray = numString.split('')

  if (numLength === 5) {
    numArray.splice(2, 0, ' ')
  } else if (numLength === 6) {
    numArray.splice(3, 0, ' ')
  } else if (numLength === 7) {
    numArray.splice(1, 0, ' ')
    numArray.splice(5, 0, ' ')
  } else if (numLength === 8) {
    numArray.splice(2, 0, ' ')
    numArray.splice(6, 0, ' ')
    numArray.splice(10, 0, ' ')
  }

  return numArray.join('')
}


export async function getProduct() {
  const currentUrl = document.location.hash.toLowerCase().split('/')
  let productId

  if (currentUrl[1] === 'en') {
    productId = currentUrl[3]
  } else {
    productId = currentUrl[2]
  }

  const productURL = `https://projekt-webshop-backend.onrender.com/api/products/${productId}`

  const response = await fetch(productURL, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  const product = await response.json()

  return product
}



const succesfulMessages = ['Sikeres bejelentkezés!', 'Sikeresen hozzáadva a kosárhoz', 'Termék sikeresen felvéve!',
  'Sikeres regisztráció!', 'Termék sikeresen frissítve!', 'A termék sikeresen törölve!', 'Product added successfully!',
  'Product updated successfully!', 'Product deleted successfully!', 'Product has been added to the cart!',
  'Order placed successfully!\nYou can see all your orders under your profile icon.',
  'Sikeresen leadtad a rendelést!\nA profil ikonod alatt megtekintheted az összes rendelésed.',
  'A rendelés sikeresen törölve!']
closeMessageButton.addEventListener('click', function () {
  messageWindow.classList.toggle('hidden')
  if (succesfulMessages.includes(mainMessage.innerHTML)) {
    location.reload()
  }
})


setTimeout(function () {
  const loading = document.getElementById('loading')
  loading.style.display = 'none'
}, 500)


const facebookIcon = document.getElementById('facebook')
facebookIcon.addEventListener('mouseover', function () {
  facebookIcon.src = './images/facebook_hover.png'
})
facebookIcon.addEventListener('mouseout', function () {
  facebookIcon.src = './images/facebook.png'
})

const instagramIcon = document.getElementById('instagram')
instagramIcon.addEventListener('mouseover', function () {
  instagramIcon.src = './images/insta_hover.png'
})
instagramIcon.addEventListener('mouseout', function () {
  instagramIcon.src = './images/insta.png'
})

const youtubeIcon = document.getElementById('youtube')
youtubeIcon.addEventListener('mouseover', function () {
  youtubeIcon.src = './images/youtube_hover.png'
})
youtubeIcon.addEventListener('mouseout', function () {
  youtubeIcon.src = './images/youtube.png'
})


const selectedCurrency = document.getElementById('selected-currency')
const currencySelection = document.getElementById('currency-selection')
const selectedFlag = document.getElementById('selected-flag')
const selectedCurrencyName = document.getElementById('selected-currency-name')
const selectHUF = document.getElementById('select-huf')
const selectEUR = document.getElementById('select-eur')

selectedCurrency.addEventListener('click', async () => {
  await fetch('https://projekt-webshop-backend.onrender.com/api/exchange-rates')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('HUF_TO_EUR', data.HUF_TO_EUR)
    })
    .catch(error => console.error(error))
})



selectedCurrency.addEventListener('click', function () {
  currencySelection.classList.toggle('hidden')
})

selectEUR.addEventListener('click', function () {
  selectedCurrencyName.innerText = 'EUR'
  selectedFlag.className = 'flag-icon flag-icon-eu'
  localStorage.setItem('selectedCurrency', 'EUR')
  location.reload()
})

selectHUF.addEventListener('click', function () {
  selectedCurrencyName.innerText = 'HUF'
  selectedFlag.className = 'flag-icon flag-icon-hu'
  localStorage.setItem('selectedCurrency', 'HUF')
  location.reload()
})


const barIcons = document.getElementById('mobile-bar-icons')
const mobileMenu = document.getElementById('mobile-menu-selector')

barIcons.addEventListener('click', function () {
  mobileMenu.classList.toggle('hidden')
})
