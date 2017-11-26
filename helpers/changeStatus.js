//require model
const Todo = require('../models/todo')
const Tag = require('../models/tag')

/* Require id, decoded user, status(true/false)
*  callback (err, obj(status,user,before_data))
*/
let todo = (id, decoded, status, cb) => {
  Todo.findById(id)
  .then(before=>{
    Todo.update({ _id: id }, { status: status })
    .then(result=>{
      if(result.nModified == 1){
        cb(null, {
          status: "success",
          user: decoded,
          before: before
        })
      } else {
        cb({err: "unsuccessfull edit"}, null)
      }
    }).catch(err=>{
      cb({err: err}, null)
    })
  }).catch(err=>{
    cb({err: err}, null)
  })
}

/* Require id, decoded user, status(true/false)
*  callback (err, obj(status,user,before_data))
*/
let tag = (id, decoded, status, cb) => {
  Tag.findById(id)
  .then(before=>{
    Tag.update({ _id: id }, { status: status })
    .then(result=>{
      if(result.nModified == 1){
        cb(null, {
          status: "success",
          user: decoded,
          before: before
        })
      } else {
        cb({err: "unsuccessfull edit"}, null)
      }
    }).catch(err=>{
      cb({err: err}, null)
    })
  }).catch(err=>{
    cb({err: err}, null)
  })
}


module.exports = {
  todo,
  tag
};