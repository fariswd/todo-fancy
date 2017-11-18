const bcrypt = require('bcrypt');

//require model
const User = require('../models/user')

/* Get from req.body.password (non hashed)
*  Return req.body.password (hashed)
*/
let hashed = (req, res, next) {
  const saltRounds = 10
  const myPlaintextPassword = req.body.password
  bcrypt.hash(myPlaintextPassword, saltRounds)
  .then(function(hash) {
    req.body.password = hash
    next()
  }).catch(err=>{
    res.send({err: err})
  })
}

/* Get: username & password from req.body
*  check username if exist and
*  password if true next()
*/
let reHashed = (req, res, next) {
  User.findOne({'username': req.body.username }, function (err, result) {
    if(err){
      res.send({err: err})
    } else {
      bcrypt.compare(req.body.password, User.password)
      .then(function(response) {
        next()
      }).catch(err=>{
        res.send({err: err})
      })
    }
  })
}

module.exports = {
  hashed,
  reHashed
};