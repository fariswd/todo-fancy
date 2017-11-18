const app = require('express')()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(morgan('tiny'))

//route variable
const index = require('./routers/indexRouter')

//route use
app.use('/', index)

//listen
app.listen(3000, () => {
  console.log('App running on port 3000!')
})