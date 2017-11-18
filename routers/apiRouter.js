const router = require('express').Router()

//require controllers
const apiController = require('../controllers/apiController')

//helper
const hashHelper = require('../helpers/hashPassword')
const loginState = require('../middlewares/loginState')

//route
router.get('/', apiController.welcomePage)

// | /api/signup/    | POST   | email,password  | signup with facebook |
router.post('/signup/', hashHelper.hashed, apiController.signup)

// | /api/signin/    | POST   | email,token  | signin with facebook |
router.post('/signin/', hashHelper.unHashed, apiController.signin)

// | /api/mytodo     | GET    | token        | get only my todo     |
router.get('/mytodo/', loginState.checkHeaders, apiController.mytodo)

// | /api/add        | POST   | desc         | post new task        |
router.post('/add/', loginState.checkHeaders, apiController.add)

// | /api/edit/:id   | PUT    | desc         | edit desc            |
router.put('/edit/:id', loginState.checkHeaders, apiController.edit)

// | /api/done/:id   | PUT    | id           | checklist todo       |
router.put('/done/:id', loginState.checkHeaders, apiController.done)

// | /api/undone/:id | PUT    | id           | uncheck todo         |
router.put('/undone/:id', loginState.checkHeaders, apiController.undone)

// | /api/del/:id    | DELETE | id           | delete todo          |
router.delete('/del/:id', loginState.checkHeaders, apiController.del)

//export
module.exports = router;