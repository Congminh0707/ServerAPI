const { Level, Class, Weekday, ClassWeekday } = require('../Database/models');


//router Level
module.exports = function (app) {


    //router level
    app.get('/api/level', (req, res) => {
        Level.find({}).then((Level) => {
            res.send(Level);
        });
    });

    app.post('/api/level', (req, res) => {
        let name = req.body.name;

        let newLevel = new Level({
            name
        });
        newLevel.save().then((levelDoc) => {
            res.send(levelDoc);
        })
    });

    app.get('/api/class/:levelId', (req, res) => {
         //console.log(req.params.levelId)
        Class.find({
            _levelId: req.params.levelId
        }).then((classes) => {
            console.log(classes)
            res.send(classes);
        })
    });

    app.post('/api/class', (req, res) => {
        const { name } = req.body;
        const { address } = req.body;
        const { start_date } = req.body;
        const { end_date } = req.body;
        const { weekday } = req.body;
        const { start_time } = req.body;
        const { end_time } = req.body;
        const { price } = req.body;
        const { levelId } = req.body;
        const { teacherId } = req.body;

        const clases = new Class({
            name,
            address,
            start_date,
            end_date,
            weekday,
            start_time,
            end_time,
            price,
            _levelId,
            _teacherId,
        });
        clases.save().then((newClassDoc) => {
            res.send(newClassDoc);
        });
    });
    app.put('/api/class/:classId', (req, res) => {
        if (req.body._teacherId) {
            classId = req.params.classId.replace(/\s+/g, '');
            console.log(classId);
            console.log(req.params)
            Class.findOneAndUpdate({
                _id: this.classId,
            },
                {
                    $set: { "_teacherId": req.body._teacherId }
                }).then(() => {
                    res.status(200).send({ message: "Đăng ký thành công!"} );
                });
        }
        if (req.body._teacherId == null) {
            classId = req.params.classId.replace(/\s+/g, '');
            Class.findOneAndUpdate({
                _id: this.classId,
            },
                {
                    $set: { "_teacherId": req.body._teacherId }
                }).then(() => {
                    res.status(200).send({ message: "Hủy thành công!"} );
                });
        }
        if(!req.body) {
            res.sendStatus(401);
        }

    });

    // app.delete('/category/:categoryId/product/:productId', (req, res) => {
    //     Product.findOneAndRemove({
    //         _id: req.params.productId,
    //         _categoryId: req.params.categoryId
    //     }).then((removedProductDoc) => {
    //         res.send(removedProductDoc);
    //     })
    // });
}

