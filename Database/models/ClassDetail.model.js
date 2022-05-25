const mongoose = require('mongoose');

const ClassDeTailSchema = new mongoose.Schema({
    _classId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    qty: {
        type: Number,
        default: 10
    },
    student:
        [{
            studentId: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            status: {
                type: Boolean,
                default: false
            }
        }]
})

const ClassDetail = mongoose.model('ClassDetail', ClassDeTailSchema);

module.exports = { ClassDetail }