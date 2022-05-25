const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
})

const Category = mongoose.model('Category', categorySchema);

module.exports = { Category }