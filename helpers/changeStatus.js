//require model
const Todo = require('../models/todo')

let changeStatus = (id, decoded, status, cb) => {
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

module.exports = changeStatus;