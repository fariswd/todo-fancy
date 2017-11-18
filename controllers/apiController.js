const jwt = require('jsonwebtoken');
require('dotenv').config()

//require model
const User = require('../models/user')

let welcomePage = (req, res) => {
  res.send({msg: 'welcomePage'})
}

/* endpoint: /api/signup/
*  methode : POST
*  require : email, password
*  desc    : store database
*  return  : obj msg & user
*/ 
let signup = (req, res) => {
  let user = new User ({
    email: req.body.email,
    password: req.body.password
  })
  user.save()
  .then((result)=>{
    res.send({
      msg: 'user created',
      user: result
    })
  }).catch(err=>{
    res.status(501).send({err: err})
  })
}

/* endpoint: /api/signin/
*  methode : POST
*  require : email, password
*  desc    : save token to local storage
*  return  : obj msg & token
*/ 
let signin = (req, res) => {
  let obj = {
    id: req.user.id,
    email: req.user.email
  }
  //convert to jwt
  jwt.sign(obj, process.env.SECRET, function(err, token) {
    if(err) res.status(501).send(err)
    res.send({
      msg: 'login success',
      token: token
    })
  })
}

module.exports = {
  welcomePage,
  signup,
  signin
};