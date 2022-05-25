const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true 
    },
    start_date: { 
        type: String, 
        required: true 
    },
    end_date: { 
        type: String, 
        required: true 
    },
    weekday: {
        type: String, 
        required: true 
    },
    start_time: { 
        type: String, 
        required: true 
    },
    end_time: { 
        type: String, 
        required: true 
    },
    price: {
        type: String, 
        required: true 
    },
    _levelId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _teacherId: {
        type: mongoose.Types.ObjectId,
        default: null,
        ref: "User"
    },
})

const Class = mongoose.model('Class', classSchema);

module.exports = { Class }