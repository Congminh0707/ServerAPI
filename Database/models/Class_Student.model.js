const mongoose = require('mongoose');

const classStudentSchema = new mongoose.Schema({
    _classId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _studentId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
})

const ClassStudent = mongoose.model('ClassStudent', classStudentSchema);

module.exports = { ClassStudent }
