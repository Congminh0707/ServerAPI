const { User } = require('../Database/models');
const ROLES = ["Admin", "Staff", "Guest", "Student", "Lecturers", "Ministry"];

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    phonnumber: req.body.phonnumber
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    if (!ROLES.includes(req.body.roles)) {
      res.status(400).send({
        message: `Failed! Role ${req.body.roles} does not exist!`
      });
      return;
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
