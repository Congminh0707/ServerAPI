const { Category } = require('./category.model');
const { Product } = require('./product.model');
const { Class } = require('./Class.model');
const { Level } = require('./Level.model');
const { ClassStudent } = require('./Class_Student.model');
const { User } = require('./User.model');
const { Role } = require('./Role.model');
const { Cart } = require('./Cart.model');
const { ClassDetail } = require('./ClassDetail.model')
const { Point } = require('./Point.model')

module.exports = {
    Category,
    Product,
    Class,
    Level,
    ClassStudent,
    User,
    Role,
    Cart,
    Point,
    ClassDetail,
}