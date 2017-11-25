//require helpers
const tok  = require('../helpers/token')

/* Check Header
*  no header no authorized
*/
let checkHeaders = (req, res, next) => {
  if(req.headers.token) {
    tok.decr(req.headers.token, (err, decoded)=>{
      if(decoded){
        req.decoded = decoded
        next()
      } else {
        res.status(400).send({msg: 'not authorized'})
      }
    })
  }
  else res.status(400).send({msg: 'not authorized'})
}

module.exports = {
  checkHeaders
};