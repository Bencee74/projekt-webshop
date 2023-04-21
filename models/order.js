const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
   
    username: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true,
        validate: {
            validator: function (v) {
              return v != null && v.length > 0;
            },
            message: 'Cart cannot be empty'
          }
    },
    totalPrice: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: function() {
            const date = new Date();
            return date.toLocaleString('hu-HU');
        },
    }
   
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order