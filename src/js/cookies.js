const cookieConsent = document.querySelector('#cookie-consent')
const acceptCookies = document.querySelector('#accept-cookies')

acceptCookies.addEventListener('click', () => {
    cookieConsent.classList.add('hidden')
    localStorage.setItem('cookiesAccepted', true)

})

if (!localStorage.getItem('cookiesAccepted')) {
    cookieConsent.classList.toggle('hidden')
}

if (localStorage.getItem('cookiesAccepted')) {
    cookieConsent.classList.add('hidden')
}

const projektInfo = document.querySelector('#projekt-info')
const acceptProjektInfo = document.querySelector('#accept-projekt-info')

acceptProjektInfo.addEventListener('click', () => {
    projektInfo.classList.add('hidden')
    localStorage.setItem('projektAccepted', true)

})

if (!localStorage.getItem('projektAccepted')) {
    projektInfo.classList.toggle('hidden')
    projektInfo.classList.add('flex')
}

if (localStorage.getItem('projektAccepted')) {
    projektInfo.classList.add('hidden')
}