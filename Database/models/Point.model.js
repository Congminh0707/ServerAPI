const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Class"
    },
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    PointStudent:
        [{
            studentId: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            },
            PointAttitude: {
                type: Number,
                default: null
            },
            PointDiligence: {
                type: Number,
                default: null
            },
            PointMidTerm: {
                type: Number,
                default: null
            },
            PointEndOfTerm: {
                type: Number,
                default: null
            }
        }]
})

const Point = mongoose.model('Point', PointSchema);

module.exports = { Point }