const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    imagePath: { 
        type: String, 
        required: true 
    },
    price: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true 
    },
    _categoryId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }
