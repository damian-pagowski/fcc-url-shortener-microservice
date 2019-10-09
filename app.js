const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dns = require('dns')

require('dotenv').config()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function middleware (req, res, next) {
  const log = `${req.method} - ${req.path} - ${req.ip}`
  console.log(log)
  next()
})

const urls = {}
let latestIndex = 0

app.post('/api/shorturl/new', (req, res) => {
  try {
    const url = req.body.url
    const tokenizedUrl = url.split('://')
    dns.lookup(tokenizedUrl[1], (err, addr) => {
      console.log(`IP: ${addr} ERRORS: ${err}`)
      if (addr !== null && err == null) {
        urls[++latestIndex] = url
        console.log('STORED URLS: ' + JSON.stringify(urls))
        res.json({ original_url: url, short_url: latestIndex })
      } else {
        res.json({ error: 'Invalid Url' })
      }
    })
  } catch (err) {
    console.log('Invalid Parameter Provided: ' + err)
    res.json({ error: 'Invalid Url' })
  }
})

app.get('/api/shorturl/:link_id', (req, res) => {
  try {
    const param = req.params['link_id']
    console.log('Parameter received: ' + param)
    const linkId = parseInt(param)
    const savedUrl = urls[linkId]
    console.log('Saved URL: ' + savedUrl)
    if (savedUrl) {
      console.log('Found URL: ' + savedUrl)
      res.status(301).redirect(savedUrl)
    } else {
      res.status(400).json({ error: 'Invalid Url' })
    }
  } catch (err) {
    console.log('Invalid Parameter Provided: ' + err)
    res.status(400).json({ error: 'Invalid Url' })
  }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
