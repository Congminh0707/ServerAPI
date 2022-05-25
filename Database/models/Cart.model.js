const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productItem: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
        },
        price: {
            type: Number,
        },
    }],
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    giftId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gift"
    },

})

const Cart = mongoose.model('Cart', cartSchema);

module.exports = { Cart }