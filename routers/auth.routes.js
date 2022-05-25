const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { User } = require('../Database/models');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/signin", controller.signin);

  app.post("/api/resetPassword", controller.resetPassword);
  app.post("/api/newPassword", controller.newPassword);


  app.patch('/api/updateRoles/:userId', (req, res) => {
    User.findOneAndUpdate({
      _id: req.params.userId,
    },
      {
        $set: req.body
      }).then(() => {
        res.sendStatus(200);
      });
  });
};
