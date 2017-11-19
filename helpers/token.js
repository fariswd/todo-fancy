const jwt = require('jsonwebtoken');
require('dotenv').config()

/* Require object
*  callback jwt-ed object
*/
let sign = (obj, cb) => {
  jwt.sign(obj, process.env.SECRET, function(err, token) {
    if(err) cb(err, null)
    else cb(null, token)
  })
}

/* Require jwt-ed
*  callback object
*/
let decr = (token, cb) => {
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if(err) cb (err, null)
    else cb(null, decoded)
  })
}

module.exports = {
  sign,
  decr
};