const express = require('express');
const app = express();
const { mongoose } = require('./Database/mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('images')));

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

/* ROUTES */
require("./routers/Category.js")(app);
require("./routers/Product.js")(app);
require("./routers/Class")(app);
require("./routers/Cart")(app);
require("./routers/ClassDetail")(app);
require("./routers/auth.routes")(app);
require("./routers/user.routes")(app);
require("./routers/UpLoadFile")(app);

// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });
var fileUpload = require('express-fileupload');
app.use(fileUpload());
app.listen(process.env.PORT || 3000)