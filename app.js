const express = require('express')
const path = require('path')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const todosRouter = require('./routes/todos')

const app = express()

let allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE')
  next()
}
app.use(allowCrossDomain)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/todos', todosRouter)

module.exports = app
