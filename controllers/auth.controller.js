const config = require("../config/auth.config");
const crypto = require('crypto')
const { Role } = require('../Database/models');
const { User } = require('../Database/models');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"
  }
}));


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    fullname: req.body.fullname,
    phonnumber: req.body.phonnumber,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    sex: req.body.sex,
    birthday: req.body.birthday,
    photo: req.body.photo,
    address: req.body.address,
    description: req.body.description,
  });

  user.save((err, user) => {

    if (err) {
      res.status(500).send({ message: lỗi1 });
      return;
    }
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: lỗi2 });
            return;
          }
          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: lỗi3 });
              return;
            }
            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: lỗi4 });
          return;
        }
        user.roles = role._id;
        user.save(err => {
          if (err) {
            res.status(500).send({ message: lỗi5 });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};


exports.signin = (req, res) => {
  User.findOne({
    phonnumber: req.body.phonnumber
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(401).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      res.status(200).send({
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        roles: user.roles.name,
        accessToken: token
      });
    });
};









exports.resetPassword = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err)
    }
    const token = buffer.toString("hex")
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(422).json({ error: "User dont exists with that email" })
        }
        user.resetToken = token
        user.expireToken = Date.now() + 3600000
        user.save().then((result) => {
          transporter.sendMail({
            to: user.email,
            from: "thecoffeestudied@gmail.com",
            subject: "password reset",
            html: `
                <p>You requested for password reset</p>
                <h5>click in this <a href="http://localhost:5000/newpassword/${token}">link</a> to reset password</h5>
                `
          })
          res.status(200).json({ message: "check your email" });
        })

      })
  })
};


exports.newPassword = (req, res) => {
  const newPassword = req.body.password
  const sentToken = req.body.token
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Try again session expired" })
      }
      bcrypt.hash(newPassword, 12).then(hashedpassword => {
        user.password = hashedpassword
        user.resetToken = undefined
        user.expireToken = undefined
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" })
        })
      })
    }).catch(err => {
      console.log(err)
    })
}

exports.updateRole = (req, res) => {
  
}