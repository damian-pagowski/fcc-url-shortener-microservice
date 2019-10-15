const controller = require('./controllers/urls')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.APP_PORT
const mongoose = require('mongoose')
const database = process.env.DB_NAME
const server = process.env.DB_SERVER_ADDR
const dbPort = process.env.DB_PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

app.use(function middleware (req, res, next) {
  const log = `${req.method} - ${req.path} - ${req.ip}`
  console.log(log)
  next()
})
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/shorturl/new', controller.addUrl)

app.get('/api/shorturl/:link_id', controller.handleShortUrl)

console.log(
  'Connecting to database - ' + `mongodb://${server}:${dbPort}/${database}`
)
mongoose.connect(`mongodb://${server}:${dbPort}/${database}`)

app.listen(port, () => console.log(`App listening on port ${port}!`))
