import { cartPageEN } from "../pages/en/cartPageEN.js"
import { cartPage } from "../pages/hu/cartPage.js"

const language = localStorage.getItem('language') || 'Hungarian'

export const addItemToCart = function(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let productInCart = cart.find(p => p._id == product._id && p.size == product.size)

    if (productInCart) {
        productInCart.quantity++
    } else if (product.size !== 0) {
        product.quantity = 1
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const increaseItemQuantity = function(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let productInCart = cart.find(p => p._id === id)

    if (productInCart) {
        productInCart.quantity++
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    if (language === 'English') {
        renderCartPageEN(cartPageEN)
    } else {
        renderCartPage(cartPage)
    }
    
}

export const decreaseItemQuantity = function(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let productInCart = cart.find(p => p._id === id)

    if (productInCart) {
        productInCart.quantity--
        if (productInCart.quantity === 0) {
            let productIndex = cart.indexOf(productInCart)
            cart.splice(productIndex, 1)
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    if (language === 'English') {
        renderCartPageEN(cartPageEN)
    } else {
        renderCartPage(cartPage)
    }
}

export const removeItemFromCart = function(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let productInCart = cart.find(p => p._id === id)

    if (productInCart) {
        let productIndex = cart.indexOf(productInCart)
        cart.splice(productIndex, 1)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    
    if (language === 'English') {
        renderCartPageEN(cartPageEN)
    } else {
        renderCartPage(cartPage)
    }
}

export const getCart = function() {
    return JSON.parse(localStorage.getItem('cart')) || []
}

export const renderCartPage = async function(cartPage) {
    const container = document.getElementById('products-container')
    container.innerHTML = await cartPage.render()
    await cartPage.after_render()
}

export const renderCartPageEN = async function(cartPageEN) {
    const container = document.getElementById('products-container')
    container.innerHTML = await cartPageEN.render()
    await cartPageEN.after_render()
}





