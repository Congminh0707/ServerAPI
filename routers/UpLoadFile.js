xlstojson = require("xls-to-json-lc");
xlsxtojson = require("xlsx-to-json-lc");
var multer = require('multer');

var store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: store }).single('file');
module.exports = function (app) {
    app.post('/api/upload', (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                return res.status(501).json({ error: err })
            }
            //res.json({ originalname: req.file.originalname, uploadname: req.file.filename })

            var sampleFile;
            var exceltojson;
            sampleFile = req.file;
            try {
                console.log(req.file);
                if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                    exceltojson = xlsxtojson;
                    console.log("xlxs");

                } else {
                    exceltojson = xlstojson;
                    console.log("xls");
                }
                exceltojson({
                    input: './upload/' + req.file.originalname,
                    output: "output.json", //since we don't need output.json
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err) {
                        return res.json({ error_code: 1, err_desc: err, data: null });
                    }
                    res.json({ error_code: 0, err_desc: null, data: result });
                    result.forEach(element => {
                        console.log(element);
                    });

                    var fs = require('fs');
                    try {
                        //fs.unlinkSync('./upload/' + req.file.originalname);
                    } catch (e) {
                        //error deleting the file
                    }
                });
            } catch (e) {
                console.log("error");
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
            }
        });
        // sampleFile.mv('./upload' + req.file.name, function (err) {
        //     if (err) {
        //         console.log("eror saving");
        //     }
        //     else {
        //         console.log("saved");
        //         if (req.files.file.name.split('.')[req.files.file.name.split('.').length - 1] === 'xlsx') {
        //             exceltojson = xlsxtojson;
        //             console.log("xlxs");
        //         } else {
        //             exceltojson = xlstojson;
        //             console.log("xls");
        //         }

        // }
    });
    //});
}