const addUrl =  require('./controllers/urlHandler').addUrl;
const handleShortUrl =  require('./controllers/urlHandler').handleShortUrl;
// import { addUrl } from './controllers/urlHandler'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const urlHandler = require('./controllers/urlHandler.js')
require('dotenv').config()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');


app.use(function middleware (req, res, next) {
  const log = `${req.method} - ${req.path} - ${req.ip}`
  console.log(log)
  next()
})
app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

app.post('/api/shorturl/new', addUrl)

app.get('/api/shorturl/:link_id', handleShortUrl)

app.listen(port, () => console.log(`App listening on port ${port}!`))
