let checkHeaders = (req, res, next) => {
  if(req.headers.token) next()
  else res.status(400).send({msg: 'not authorized'})
}

module.exports = {
  checkHeaders
};