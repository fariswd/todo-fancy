const router = require('express').Router()

//require controllers
const indexController = require('../controllers/indexController')

//route
router.get('/', indexController.welcomePage)

//export
module.exports = router;