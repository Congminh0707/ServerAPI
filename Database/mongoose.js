const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin:thecoffeestudy@cluster0.cfccb.mongodb.net/TheCoffeeStudy?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, function (err) {
    if (err) {
        console.log("Mongoodb connected error!!!")
    } else {
        console.log("Mongoodb connected seccessfully!!!")
    }
});


module.exports = {
    mongoose
};