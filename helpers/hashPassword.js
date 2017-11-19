const bcrypt = require('bcrypt');

//require model
const User = require('../models/user')

/* Require from req.body.password (non hashed)
*  Return req.body.password (hashed)
*/
let hashed = (req, res, next) => {
  if(req.body.username && req.body.password){
    const saltRounds = 10
    const myPlaintextPassword = req.body.password
    bcrypt.hash(myPlaintextPassword, saltRounds)
    .then(function(hash) {
      req.body.password = hash
      next()
    }).catch(err=>{
      res.status(501).send({err: err})
    })
  } else {
    res.status(401).send({err: "wrong input"})
  }
}

/* Require: email & password from req.body
*  check email if exist,
*  and password if true next()
*/
let unHashed = (req, res, next) => {
  if(req.body.username && req.body.password){
    User.findOne({'email': req.body.email }, function (err, result) {
      if(err){
        res.status(501).send({err: err})
      } else {
        bcrypt.compare(req.body.password, result.password)
        .then(function(response) {
          req.user = result
          next()
        }).catch(err=>{
          res.status(501).send({err: err})
        })
      }
    })
  } else {
    res.status(401).send({err: "wrong input"})
  }
}

module.exports = {
  hashed,
  unHashed
};