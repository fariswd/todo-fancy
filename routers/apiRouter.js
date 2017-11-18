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
router.get('/mytodo', loginState.checkHeaders ,apiController.mytodo)

// | /api/add        | POST   | desc         | post new task        |
// | /api/edit/:id   | PUT    | desc         | edit desc            |
// | /api/done/:id   | PUT    | id           | checklist todo       |
// | /api/undone/:id | PUT    | id           | uncheck todo         |
// | /api/del/:id    | DELETE | id           | delete todo          |

//export
module.exports = router;