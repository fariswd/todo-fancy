const router = require('express').Router()

//require controllers
const apiController = require('../controllers/apiController')

//helper
const hashHelper = require('../helpers/hashPassword')
const loginState = require('../middlewares/loginState')

//route
router.get('/', apiController.welcomePage)

// | Route           | HTTP   | Require Data    | Description          |
// |-----------------|--------|-----------------|----------------------|
// | /api/signup/    | POST   | email, password | signup               |
router.post('/signup/', hashHelper.hashed, apiController.signup)

// | /api/signin/    | POST   | email, password | signin return token  |
router.post('/signin/', hashHelper.unHashed, apiController.signin)

// | /api/mytodo     | GET    | token           | get only my todo     |
router.get('/mytodo/', loginState.checkHeaders, apiController.mytodo)

// | /api/add        | POST   | token, todo     | post new todo        |
router.post('/add/', loginState.checkHeaders, apiController.add)

// | /api/edit/:id   | PUT    | token, todo     | edit desc            |
router.put('/edit/:id', loginState.checkHeaders, apiController.edit)

// | /api/done/:id   | PUT    | token, id       | checklist todo       |
router.put('/done/:id', loginState.checkHeaders, apiController.done)

// | /api/undone/:id | PUT    | token, id       | uncheck todo         |
router.put('/undone/:id', loginState.checkHeaders, apiController.undone)

// | /api/del/:id    | DELETE | token, id       | delete todo          |
router.delete('/del/:id', loginState.checkHeaders, apiController.del)

// | /api/signfb/    | POST   | fb_token        | login with fb        |
router.post('/signfb/', apiController.signfb)

//export
module.exports = router;