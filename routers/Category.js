const { Category } = require('../Database/models');

//router category
module.exports = function (app) {
    
    app.get('/category', (req, res) => {
        Category.find({}).then((Categorys) => {
            res.send(Categorys);
        });
    });

    app.post('/category', (req, res) => {
        let title = req.body.title;

        let newCategory = new Category({
            title
        });
        newCategory.save().then((categoryDoc) => {
            // the full list document is returned (incl. id)
            res.send(categoryDoc);
        })
    });

    app.patch('/category/:id', (req, res) => {
        Category.findOneAndUpdate({ _id: req.params.id }, {
            $set: req.body
        }).then(() => {
            res.sendStatus(200);
        });
    });

    app.delete('/category/:id', (req, res) => {
        Category.findOneAndRemove({
            _id: req.params.id,
        }).then((removedcategoryDoc) => {
            res.send(removedcategoryDoc);
        });
    });

}