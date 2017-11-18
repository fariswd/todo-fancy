const bcrypt = require('bcrypt');

//require model
const User = require('../models/user')

/* Get from req.body.password (non hashed)
*  Return req.body.password (hashed)
*/
let hashed = (req, res, next) => {
  const saltRounds = 10
  const myPlaintextPassword = req.body.password
  bcrypt.hash(myPlaintextPassword, saltRounds)
  .then(function(hash) {
    req.body.password = hash
    next()
  }).catch(err=>{
    res.status(501).send({err: err})
  })
}

/* Get: email & password from req.body
*  check email if exist and
*  password if true next()
*/
let unHashed = (req, res, next) => {
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
}

module.exports = {
  hashed,
  unHashed
};