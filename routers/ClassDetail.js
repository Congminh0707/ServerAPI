const { Class, ClassDetail } = require('../Database/models');
var mongodb = require("mongodb")
module.exports = function (app) {
    app.get('/api/classdetail', (req, res) => {
        ClassDetail.find({}).then((ClassDetail) => {
            res.send(ClassDetail);
        });
    });
    app.post('/api/classdetail/:classId', (req, res, next) => {
        try {
            if (req.params.classId) {
                classId = req.params.classId.replace(/\s+/g, '');
                console.log(_classId);
                if (!mongodb.ObjectID.isValid(_classId)) {
                    res.status(500).send({ message: "False" });
                    return;
                }
                const classdetail = new ClassDetail({
                    classId,
                });
                classdetail.save().then((classdetail, err) => {
                    if (classdetail) {
                        res.status(200).send({ message: "Sucess", classdetail });
                        return;
                    }
                    else
                        res.send(err);
                })
            }
            else if (!req.params.classId) {
                res.sendStatus(401);
            }
        } catch (err) {
            if (err.kind === "ObjectId") {
                return res.status(404).json({
                    errors: [
                        {
                            msg: "Class not found",
                            status: "404",
                        },
                    ],
                });
            }
            next(err);
        }
    });
    app.put('/api/classdetail/:classId', (req, res, next) => {
        try {
            if (req.params.classId && req.body) {
                classId = req.params.classId.replace(/\s+/g, '');
                // console.log(req.body);
                // console.log(classId);
                const { status } = req.body;
                const { studentId } = req.body;
                const { qty } = req.body;
                if (!mongodb.ObjectID.isValid(classId)) {
                    res.status(500).send({ message: "False" });
                    return;
                }
                ClassDetail.find({
                    classId: classId,
                }).then((classDetail) => {
                    classDetail.forEach(element => {
                        if (element.qty == 0 || element.qty <= 0) {
                            res.status(200).send({ message: "Lớp học đã đủ học viên!" });
                            return;
                        }
                        element.student.forEach(student => {
                            // console.log(student);
                            // console.log(studentId)
                            if (student.studentId == studentId) {
                                res.status(200).send({ message: "Bạn đã có trong lớp này!" });
                                return false;
                            }
                        });
                    });
                });
                ClassDetail.findOneAndUpdate({
                    classId: classId,
                },
                    {
                        qty: qty,
                        $push: {
                            // "ClassDetail.student": {"studentId":studentId, "status": false }
                            student: {
                                $each: [{ studentId: studentId, status }],
                            }
                        }
                    }).then((success, error) => {
                        if (error) {
                            //console.log(error);
                        } else {
                            console.log(success);
                            res.status(200).send({ message: "Đăng ký thành công!", success });
                        }
                    });
            }
            else if (!req.body) {
                res.sendStatus(401);
            }
        } catch (err) {
            if (err.kind === "ObjectId") {
                return res.status(404).json({
                    errors: [
                        {
                            msg: "Class not found",
                            status: "404",
                        },
                    ],
                });
            }
            next(err);
        }
    });
}