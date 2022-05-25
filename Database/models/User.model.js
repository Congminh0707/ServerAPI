const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phonnumber: {
    type: String,
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  sex: {
    type: String,
  },
  birthday: {
    type: String,
  },
  photo: {
    type: String,
    default: "null",
  },
  address: {
    type: String,
    default: "null",
  },
  description: {
    type: String,
    default: "null",
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role"
  },
  resetToken: String,
  expireToken: Date,
})

const User = mongoose.model('User', userSchema);

module.exports = { User }