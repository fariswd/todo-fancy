//require model
const Tag = require('../models/tag')
const User = require('../models/user')

let tag = (req, cb) => {
  if(req.body.tag[0]==''){
    cb(null, [])
  } else {
    let arrOfPromise = []
    if(typeof(req.body.tag) == 'object'){ 
      for(let i = 0; i<req.body.tag.length; i++){
        let prom = new Promise((resolve, reject)=>{
          User.findOne({ email: req.body.tag[i] })
          .then(result=>{
            resolve(result._id)
          })
          .catch(err=>{
            reject(err)
          })
        })
        arrOfPromise.push(prom)
      }
    } else {
      let prom = new Promise((resolve, reject)=>{
        User.findOne({ email: req.body.tag })
        .then(result=>{
          resolve(result._id)
        })
        .catch(err=>{
          reject(err)
        })
      })
      arrOfPromise.push(prom)
    }
    Promise.all(arrOfPromise)
    .then(values=>{ 
      console.log('values', values)
      cb(null, values)
    })
    .catch(err=>{
      cb(err, null)
    })
  }
}

let insert = (userId, todo, decoded, cb)=>{
  let arrOfPromise = []
  for(let i = 0; i<userId.length; i++){
    let prom = new Promise((resolve, reject)=>{
      let tag = new Tag({
        userId: userId[i],
        todoId: todo._id,
        fromId: todo.userId,
        todo: todo.todo,
        from: decoded.email,
        status: false
      })
      tag.save()
      .then(result=>{
        console.log('ini result',result)
        resolve(null, result)
      }).catch(err=>{
        reject(err, null)
      })
    })
    arrOfPromise.push(prom)
  }
  Promise.all(arrOfPromise)
  .then(values=>{ 
    cb(null, values)
  })
  .catch(err=>{
    cb(err, null)
  })
}

module.exports = {
  tag,
  insert
};