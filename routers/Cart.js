const { Cart } = require('../Database/models');






//router product
module.exports = function (app) {

    app.get('/api/cart/:cartId', (req, res) => {
        Cart.find({
            _id: req.params.cartId
        }).then((cart) => {
            res.send(cart);
        })
    });



    app.post('/api/cart', (req, res) => {
        const { userId } = req.body;
        const { giftId } = req.body;
        let productItem = [];
        const { product } = req.body
        console.log(req.body)
        product.forEach(element => {
            productItem.push(element);
        });
        const cart = new Cart({
            productItem,
            userId,
            giftId,

        });
        cart.save().then((newCartDoc) => {
            res.send(newCartDoc);
        });
    });

    app.put('/api/cart/:cartId', (req, res) => {
        Cart.findOneAndUpdate({
            _id: req.params.cartId,
        },
            {
                $set: req.body
            }).then(() => {
                res.sendStatus(200);
            });
    });

    app.delete('/api/cart/:cartId', (req, res) => {
        Cart.findOneAndRemove({
            _id: req.params.cartId,
        }).then((removedCartDoc) => {
            res.send(removedCartDoc);
        })
    });
}
