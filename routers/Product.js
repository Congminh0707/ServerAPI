const { Product } = require('../Database/models');

//START MULTER
const multer = require('multer');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
    'image'
);

module.exports = storage;
// END MULTER

//router product
module.exports = function (app) {
    app.get('/api/product', (req, res) => {
        Product.find({
        }).then((product) => {
            res.send(product);  
        })
    });
    app.get('/api/product/:categoryId', (req, res) => {
        Product.find({
            categoryId: req.params.categoryId
        }).then((product) => {
            res.send(product);  
        })
    });

    app.post('/api/product', storage, (req, res) => {
        const { name } = req.body;
        const { price } = req.body;
        const { description } = req.body;
        const { categoryId } = req.body;
        const imagePath = 'http://localhost:3000/images/' + req.file.filename; // Note: set path dynamically
        const product = new Product({
            name,
            imagePath,
            price,
            description,
            categoryId,
        });
        product.save().then((newProductDoc) => {
            res.send(newProductDoc);
        });
    });

    app.get('/api/product/:categoryId/:productId', (req, res) => {
        Product.find({
            categoryId: req.params.categoryId,
            _id: req.params.productId
        }).then((product) => {
            res.send(product);  
        })
    });

    // app.patch('/category/:categoryId/product/:productId', (req, res) => {
    //     Product.findOneAndUpdate({
    //         _id: req.params.productId,
    //         _categoryId: req.params.categoryId
    //     },
    //         {
    //             $set: req.body
    //         }).then(() => {
    //             res.sendStatus(200);
    //         });
    // });

    // app.delete('/category/:categoryId/product/:productId', (req, res) => {
    //     Product.findOneAndRemove({
    //         _id: req.params.productId,
    //         _categoryId: req.params.categoryId
    //     }).then((removedProductDoc) => {
    //         res.send(removedProductDoc);
    //     })
    // });
}
