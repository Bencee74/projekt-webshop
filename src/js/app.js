import { allProductsPage } from '../pages/hu/allProductsPage.js'
import { basketballPage } from '../pages/hu/basketballPage.js'
import { cartPage } from '../pages/hu/cartPage.js'
import { errorPage } from '../pages/hu/errorPage.js'
import { addProductPage } from '../pages/hu/addProductPage.js'
import { footballPage } from '../pages/hu/footballPage.js'
import { homePage } from '../pages/hu/homePage.js'
import { productPage } from '../pages/hu/productPage.js'
import { tennisPage } from '../pages/hu/tennisPage.js'
import { editProductsPage } from '../pages/hu/editProductsPage.js'
import { editProductByIdPage } from '../pages/hu/editProductByIdPage.js'
import { allProductsPageEN } from '../pages/en/allProductsPageEN.js'
import { productPageEN } from '../pages/en/productPageEN.js'
import { homePageEN } from '../pages/en/homePageEN.js'
import { footballPageEN } from '../pages/en/footballPageEN.js'
import { basketballPageEN } from '../pages/en/basketballPageEN.js'
import { tennisPageEN } from '../pages/en/tennisPageEN.js'
import { cartPageEN } from '../pages/en/cartPageEN.js'
import { addProductPageEN } from '../pages/en/addProductPageEN.js'
import { editProductsPageEN } from '../pages/en/editProductsPageEN.js'
import { editProductByIdPageEN } from '../pages/en/editProductByIdPageEN.js'
import { myOrders } from '../pages/hu/myOrders.js'
import { myOrdersEN } from '../pages/en/myOrdersEN.js'
import { editOrdersPage } from '../pages/hu/editOrdersPage.js'
import { editOrdersPageEN } from '../pages/en/editOrdersPageEN.js'
import { searchResultPageEN } from '../pages/en/searchResultPageEN.js'
import { searchResultPage } from '../pages/hu/searchResultPage.js'
import { getCart } from './cartActions.js'

const routes = {
  '/': homePage,
  '/en/': homePageEN,
  '/product/:id': productPage,
  '/en/product/:id': productPageEN,
  '/football': footballPage,
  '/en/football': footballPageEN,
  '/basketball': basketballPage,
  '/en/basketball': basketballPageEN,
  '/tennis': tennisPage,
  '/en/tennis': tennisPageEN,
  '/all': allProductsPage,
  '/en/all': allProductsPageEN,
  '/cart': cartPage,
  '/en/cart': cartPageEN,
  '/addproduct': addProductPage,
  '/en/addproduct': addProductPageEN,
  '/editproduct': editProductsPage,
  '/en/editproduct': editProductsPageEN,
  '/editproduct/:id': editProductByIdPage,
  '/en/editproduct/:id': editProductByIdPageEN,
  '/myorders': myOrders,
  '/en/myorders': myOrdersEN,
  '/edit-orders': editOrdersPage,
  '/en/edit-orders': editOrdersPageEN,
  '/search-result': searchResultPage,
  '/en/search-result': searchResultPageEN
}

const manageUrl = (hash) => {
  const url = new URL(hash.slice(1), window.location.href)

  if (url.pathname.split('/')[1] === 'en') {
    const resource = ('en/' + url.pathname.split('/')[2]) || ''
    const id = url.pathname.split('/')[3] || ''
    const action = url.hash.split('#')[2] || ''

    return { resource, id, action }
  } else {
    const resource = url.pathname.split('/')[1] || ''
    const id = url.pathname.split('/')[2] || ''
    const action = url.hash.split('#')[1] || ''
    return { resource, id, action }
  }

}

const renderPage = async function() {
  const { resource, id, action } = manageUrl(window.location.hash)
  const screen = routes[`/${resource}${id ? '/:id' : ''}${action ? `#${action}` : ''}`] || errorPage

  document.getElementById('products-container').innerHTML = await screen.render(id)

  const selectedFlag = document.getElementById('selected-flag')
  const selectedCurrencyName = document.getElementById('selected-currency-name')
  const selectedLanguage = document.getElementById('selected-language')
  const selectedLanguageMobile = document.getElementById('selected-language-mobile')
  let currency = localStorage.getItem('selectedCurrency') || 'HUF'
  let language = localStorage.getItem('language') || 'Hungarian'

  const goToFootball = document.getElementById('go-to-football')
  const goToTennis = document.getElementById('go-to-tennis')
  const goToBasketball = document.getElementById('go-to-basketball')
  const goToAll = document.getElementById('go-to-all')

  const goToFootballMobile = document.getElementById('go-to-football-mobile')
  const goToTennisMobile = document.getElementById('go-to-tennis-mobile')
  const goToBasketballMobile = document.getElementById('go-to-basketball-mobile')
  const goToAllMobile = document.getElementById('go-to-all-mobile')

  const goToFootballFooter = document.getElementById('go-to-football-footer')
  const goToTennisFooter = document.getElementById('go-to-tennis-footer')
  const goToBasketballFooter = document.getElementById('go-to-basketball-footer')
  const goToAllFooter = document.getElementById('go-to-all-footer')

  const openTime = document.getElementById('open-time')
  const monday = document.getElementById('monday')
  const tuesday = document.getElementById('tuesday')
  const wednesday = document.getElementById('wednesday')
  const thursday = document.getElementById('thursday')
  const friday = document.getElementById('friday')
  const saturday = document.getElementById('saturday')
  const sunday = document.getElementById('sunday')

  const loginButton = document.getElementById('submit-login')
  const registerButton = document.getElementById('submit-register')
  const loginText = document.getElementById('login-text')
  const logoutText = document.getElementById('logout')
  const registerText = document.getElementById('register-text')
  const usernameText = document.getElementById('username-text')
  const passwordText = document.getElementById('password-text')

  const itemsInCart = getCart()
  let totalQuantityInCart = 0
  for (let item of itemsInCart) {
    totalQuantityInCart += item.quantity
  }
  if (totalQuantityInCart > 0) {
    document.getElementById('cart-count').innerText = totalQuantityInCart
    document.getElementById('cart-count-mobile').innerText = totalQuantityInCart
  } else {
    document.getElementById('cart-count').innerHTML = ''
    document.getElementById('cart-count-mobile').innerHTML = ''
  }

  if (currency === 'HUF') {
    selectedCurrencyName.innerText = 'HUF'
    selectedFlag.className = 'flag-icon flag-icon-hu lg:text-xl'
  } else if (currency === 'EUR') {
    selectedCurrencyName.innerText = 'EUR'
    selectedFlag.className = 'flag-icon flag-icon-eu lg:text-xl'
  }

  if (language === 'English') {
    selectedLanguage.className = 'flag-icon flag-icon-gb cursor-pointer lg:text-xl'

    loginButton.innerText = 'Login'
    registerButton.innerText = 'Register'
    loginText.innerText = "Don't have an account? Register!"
    registerText.innerText = "Already have an account? Log in!"
    logoutText.innerText = 'Log out'
    usernameText.innerText = 'Username:'
    passwordText.innerText = 'Password:'

    goToFootball.innerText = 'Football'
    goToTennis.innerText = 'Tennis'
    goToBasketball.innerText = 'Basketball'
    goToAll.innerText = 'All products'

    goToFootballFooter.innerText = 'Football'
    goToTennisFooter.innerText = 'Tennis'
    goToBasketballFooter.innerText = 'Basketball'
    goToAllFooter.innerText = 'All products'

    selectedLanguageMobile.className = 'flag-icon flag-icon-gb cursor-pointer lg:text-xl'
    goToFootballMobile.innerText = 'Football'
    goToTennisMobile.innerText = 'Tennis'
    goToBasketballMobile.innerText = 'Basketball'
    goToAllMobile.innerText = 'All products'

    openTime.innerText = 'Open hours:'

    monday.innerText = 'Mon: 8:00 - 20:00'
    tuesday.innerText = 'Tue: 8:00 - 20:00'
    wednesday.innerText = 'Wed: 8:00 - 20:00'
    thursday.innerText = 'Thu: 8:00 - 20:00'
    friday.innerText = 'Fri: 8:00 - 20:00'
    saturday.innerText = 'Sat: 12:00 - 20:00'
    sunday.innerText = 'Sun: 12:00 - 20:00'

  } else {
    selectedLanguage.className = 'flag-icon flag-icon-hu cursor-pointer lg:text-xl'

    loginButton.innerText = 'Bejelentkezés'
    registerButton.innerText = 'Regisztráció'
    loginText.innerText = 'Nincs még fiókod? Regisztrálj!'
    registerText.innerText = 'Van már fiókod? Jelentkezz be!'
    logoutText.innerText = 'Kijelentkezés'
    usernameText.innerText = 'Felhasználónév:'
    passwordText.innerText = 'Jelszó:'

    goToFootball.innerText = 'Futball'
    goToTennis.innerText = 'Tenisz'
    goToBasketball.innerText = 'Kosárlabda'
    goToAll.innerText = 'Összes termék'

    goToFootballFooter.innerText = 'Futball'
    goToTennisFooter.innerText = 'Tenisz'
    goToBasketballFooter.innerText = 'Kosárlabda'
    goToAllFooter.innerText = 'Összes termék'

    selectedLanguageMobile.className = 'flag-icon flag-icon-hu cursor-pointer lg:text-xl'
    goToFootballMobile.innerText = 'Futball'
    goToTennisMobile.innerText = 'Tenisz'
    goToBasketballMobile.innerText = 'Kosárlabda'
    goToAllMobile.innerText = 'Összes termék'

    openTime.innerText = 'Nyitvatartás:'

    monday.innerText = 'H: 8:00 - 20:00'
    tuesday.innerText = 'K: 8:00 - 20:00'
    wednesday.innerText = 'Sze: 8:00 - 20:00'
    thursday.innerText = 'Cs: 8:00 - 20:00'
    friday.innerText = 'P: 8:00 - 20:00'
    saturday.innerText = 'Szo: 12:00 - 20:00'
    sunday.innerText = 'V: 12:00 - 20:00'
  }

  window.scrollTo(0, 0)

  try {
    await screen.after_render()
    await screen.changePictures()
    await screen.sizes()
  } catch {
  }
}

window.onload = renderPage
window.onhashchange = renderPage