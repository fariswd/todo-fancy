//require model
const User = require('../models/user')
const Todo = require('../models/todo')

//require helpers
const changeStatus = require('../helpers/changeStatus')
const tok  = require('../helpers/token')
const fbApi = require('../helpers/fb')

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
    else {
      res.send({
      msg: 'login success',
      token: token
      })
    }
  })
}

/* endpoint: /api/mytodo/
*  methode : GET
*  require : token(id)
*  desc    : find mytodo from db
*  return  : user, all my todo
*/ 
let mytodo = (req, res) => {
  Todo.find({userId: req.decoded.id}, (err, todos) => {
    if (err) res.status(500).send(err)
    res.send({
      user: req.decoded,
      todos: todos
    })
  })
}

/* endpoint: /api/add/
*  methode : POST
*  require : token(id), todo
*  desc    : store database
*  return  : status, user, last inserted 
*/
let add = (req, res) => {
  let addTodo = new Todo({
    todo: req.body.todo,
    status: false,
    userId: req.decoded.id
  })
  addTodo.save()
  .then(result=>{
    res.send({
      status: "success",
      user: req.decoded,
      inserted: result
    })
  }).catch(err=>{
    res.status(500).send({err: err})
  })
}

/* endpoint: /api/edit/:id
*  methode : PUT
*  require : token(id), params(id_todo), newtodo
*  desc    : edit database database
*  return  : status, user, before
*/
let edit = (req, res) => {
  if (!req.body.todo) res.status(400).send({err: "no todo send"})
  else {
    Todo.findById(req.params.id)
    .then(before=>{
      Todo.update({ _id: req.params.id }, { todo: req.body.todo })
      .then(result=>{
        if(result.nModified == 1){
          res.send({
            status: "success",
            user: req.decoded,
            before: before
          })
        } else {
          res.status(500).send({err: "unsuccessfull edit"})
        }
      }).catch(err=>{
        res.status(500).send({err: err})
      })
    }).catch(err=>{
      res.status(500).send({err: err})
    })
  }
}

/* endpoint: /api/done/:id
*  methode : PUT
*  require : token(id), params(id_todo)
*  desc    : change todo status to done
*  return  : status, user, before
*/
let done = (req, res) => {
  changeStatus(req.params.id, req.decoded, true, (err, msg)=>{
    if(err) res.status(500).send(err)
    else res.send(msg)
  })
}

/* endpoint: /api/undone/:id
*  methode : PUT
*  require : token(id), params(id_todo)
*  desc    : change todo status to undone
*  return  : status, user, before
*/
let undone = (req, res) => {
  changeStatus(req.params.id, req.decoded, false, (err, msg)=>{
    if(err) res.status(500).send(err)
    else res.send(msg)
  })
}

/* endpoint: /api/del/:id
*  methode : DELETE
*  require : token(id), params(id_todo)
*  desc    : delete todos
*  return  : status, user, itemdeleted
*/
let del = (req, res) => {
  Todo.findById(req.params.id)
  .then(before=>{
    Todo.remove({ _id: req.params.id })
    .then(result=>{
      if(result.n == 1){
        res.send({
          status: "success",
          user: req.decoded,
          before: before
        })
      } else {
        res.status(500).send({err: "unsuccessfull delete"})
      }
    }).catch(err=>{
      res.status(500).send({err: err})
    })
  }).catch(err=>{
    res.status(500).send({err: err})
  })
}

/* endpoint: /api/signfb/
*  methode : POST
*  require : headers.fb_token
*  desc    : verify data from fb, if validated return msg & token
*  return  : obj msg & token
*/
let signfb = (req, res) => {
  //get fb_token from user
  fbApi.unwrapToken(req.headers.fb_token, (err, response)=>{
    if(err) res.status(400).send(err)
    else {
      User.findOne({ "email": response.email})
      .then(user=>{
        if(user){
          //if email exist return token
          let obj = {
            id: user._id,
            email: user.email
          }
          //convert to jwt
          tok.sign(obj, (err, token)=>{
            if(err) res.status(501).send(err)
            else {
              res.send({
              msg: 'login success',
              token: token
              })
            }
          })
        
        //else create new user
        } else {
          //decode fb_token email user to db, password null
          let user = new User ({
            email: response.email,
            password: null
          })
          //save to database
          user.save()
          .then(result=>{
            let obj = {
              id: result._id,
              email: result.email
            }
            //convert to jwt
            tok.sign(obj, (err, token)=>{
              if(err) res.status(501).send(err)
              else {
                res.send({
                msg: 'login success',
                token: token
                })
              }
            })
          }).catch(err=>{
            res.status(500).send({err: err})
          })
          
        }
      }).catch(err=>{err: err})
    }
  })
}

module.exports = {
  welcomePage,
  signup,
  signin,
  mytodo,
  add,
  edit,
  done,
  undone,
  del,
  signfb
};