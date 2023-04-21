const selectedLanguage = document.getElementById('selected-language')
const selectLanguage = document.getElementById('select-language')
const selectUK = document.getElementById('select-uk')
const selectHU = document.getElementById('select-hu')

const selectedLanguageMobile = document.getElementById('selected-language-mobile')
const selectLanguageMobile = document.getElementById('select-language-mobile')
const selectUKMobile = document.getElementById('select-uk-mobile')
const selectHUMobile = document.getElementById('select-hu-mobile')

selectedLanguage.addEventListener('click', function () {
  selectLanguage.classList.toggle('hidden')
})

selectedLanguageMobile.addEventListener('click', function () {
  selectLanguageMobile.classList.toggle('hidden')
})


selectUK.addEventListener('click', function () {
  selectedLanguage.className = "flag-icon flag-icon-gb cursor-pointer lg:text-xl"
  selectedLanguageMobile.className = "flag-icon flag-icon-gb cursor-pointer lg:text-xl"
  selectLanguage.classList.toggle('hidden')

  const currentUrl = window.location.href;

  if (window.location.hash === null) {
    window.location.hash = '#/en/'
  }
  
  if (!(currentUrl.includes('#/en/'))) {
    const newUrl = currentUrl.replace(/#\//, '#/en/');
    window.location.href = newUrl;
  }

  localStorage.setItem('language', 'English')
})

selectUKMobile.addEventListener('click', function () {
  selectedLanguage.className = "flag-icon flag-icon-gb cursor-pointer lg:text-xl"
  selectedLanguageMobile.className = "flag-icon flag-icon-gb cursor-pointer lg:text-xl"
  selectLanguageMobile.classList.toggle('hidden')

  const currentUrl = window.location.href;

  if (window.location.hash === null) {
    window.location.hash = '#/en/'
  }
  
  if (!(currentUrl.includes('#/en/'))) {
    const newUrl = currentUrl.replace(/#\//, '#/en/');
    window.location.href = newUrl;
  }

  localStorage.setItem('language', 'English')
})


selectHU.addEventListener('click', function () {
  selectedLanguage.className = "flag-icon flag-icon-hu cursor-pointer lg:text-xl"
  selectedLanguageMobile.className = "flag-icon flag-icon-hu cursor-pointer lg:text-xl"
  selectLanguage.classList.toggle('hidden')

  const currentUrl = window.location.href;

  if (window.location.hash === '') {
    window.location.hash = '#/'
  }
  
  if ((currentUrl.includes('#/en/'))) {
    const newUrl = currentUrl.replace('#/en/', '#/');
    window.location.href = newUrl;
  }

  localStorage.setItem('language', 'Hungarian')
})

selectHUMobile.addEventListener('click', function () {
  selectedLanguage.className = "flag-icon flag-icon-hu cursor-pointer lg:text-xl"
  selectedLanguageMobile.className = "flag-icon flag-icon-hu cursor-pointer lg:text-xl"
  selectLanguageMobile.classList.toggle('hidden')

  const currentUrl = window.location.href;

  if (window.location.hash === '') {
    window.location.hash = '#/'
  }
  
  if ((currentUrl.includes('#/en/'))) {
    const newUrl = currentUrl.replace('#/en/', '#/');
    window.location.href = newUrl;
  }

  localStorage.setItem('language', 'Hungarian')
})


const goToFootball = document.getElementById('go-to-football')
const goToTennis = document.getElementById('go-to-tennis')
const goToBasketball = document.getElementById('go-to-basketball')
const goToAll = document.getElementById('go-to-all')
const goToHomepage = document.getElementById('go-to-homepage')
const goToCart = document.getElementById('go-to-cart')

const goToFootballMobile = document.getElementById('go-to-football-mobile')
const goToTennisMobile = document.getElementById('go-to-tennis-mobile')
const goToBasketballMobile = document.getElementById('go-to-basketball-mobile')
const goToAllMobile = document.getElementById('go-to-all-mobile')
const goToHomepageMobile = document.getElementById('go-to-homepage-mobile')
const goToCartMobile = document.getElementById('go-to-cart-mobile')

const goToFootballFooter = document.getElementById('go-to-football-footer')
const goToTennisFooter = document.getElementById('go-to-tennis-footer')
const goToBasketballFooter = document.getElementById('go-to-basketball-footer')
const goToAllFooter = document.getElementById('go-to-all-footer')

goToFootball.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/football'
  } else {
    document.location.hash = '/football'
  }
})

goToTennis.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/tennis'
  } else {
    document.location.hash = '/tennis'
  }
})

goToBasketball.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/basketball'
  } else {
    document.location.hash = '/basketball'
  }
})

goToAll.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/all'
  } else {
    document.location.hash = '/all'
  }
})

goToHomepage.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/'
  } else {
    document.location.hash = '/'
  }
})

goToCart.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/cart'
  } else {
    document.location.hash = '/cart'
  }
})

goToFootballMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/football'
  } else {
    document.location.hash = '/football'
  }
})

goToTennisMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/tennis'
  } else {
    document.location.hash = '/tennis'
  }
})

goToBasketballMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/basketball'
  } else {
    document.location.hash = '/basketball'
  }
})

goToAllMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/all'
  } else {
    document.location.hash = '/all'
  }
})

goToHomepageMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/'
  } else {
    document.location.hash = '/'
  }
})

goToCartMobile.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/cart'
  } else {
    document.location.hash = '/cart'
  }
})

goToFootballFooter.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/football'
  } else {
    document.location.hash = '/football'
  }
})

goToTennisFooter.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/tennis'
  } else {
    document.location.hash = '/tennis'
  }
})

goToBasketballFooter.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/basketball'
  } else {
    document.location.hash = '/basketball'
  }
})

goToAllFooter.addEventListener('click', function() {
  const language = localStorage.getItem('language') || 'Hungarian'
  if (language === 'English') {
    document.location.hash = '/en/all'
  } else {
    document.location.hash = '/all'
  }
})