
var User = require('../models/User')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
module.exports = {
    login:(req,res)=>{
        User.findOne({
            email: req.body.email
          }).exec((err,user)=>{
            if (err) {
                res.status(500).send({ message: err });
                return;
              }
              if (!user) {
                return res.status(404).send({ message: "No email found." });
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
              var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 
              });
              res.status(200).send({
                id: user._id,
                email: user.email,
                roles: user.role,
                accessToken: token
              });
          })
       
    },
    signup:(req,res)=>{
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            status:'active'
          });
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(200).send({ data:user,message: "User was registered successfully!" });
          });
    }
} 