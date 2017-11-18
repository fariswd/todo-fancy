//require model
const User = require('../models/user')
const Todo = require('../models/todo')

//require helpers
const tok  = require('../helpers/token')

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
  tok.sign(obj, (err, token)=>{
    if(err) res.status(501).send(err)
    res.send({
      msg: 'login success',
      token: token
    })
  })
}

/* endpoint: /api/mytodo/
*  methode : GET
*  require : token(id)
*  desc    : find mytodo from db
*  return  : all my todo
*/ 
let mytodo = (req, res) => {
  //convert to obj
  tok.decr(req.headers.token, (err, decoded)=>{
    Todo.find({userId: decoded.id}, (err, todos) => {
      if (err) res.status(500).send(err)
      res.send({
        user: decoded,
        todos: todos
      })
    })
  })
}

module.exports = {
  welcomePage,
  signup,
  signin,
  mytodo
};