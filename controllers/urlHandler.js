const dns = require('dns')
const urls = {}
let latestIndex = 0

exports.addUrl = (req, res) => {
  try {
    const url = req.body.url
    const tokenizedUrl = url.split('://')
    dns.lookup(tokenizedUrl[1], (err, addr) => {
      console.log(`IP: ${addr} ERRORS: ${err}`)
      if (addr !== null && err == null) {
        urls[++latestIndex] = url
        console.log('STORED URLS: ' + JSON.stringify(urls))
        // res.json({ original_url: url, short_url: latestIndex })
        res.render('result', {
          originalURL: url,
          shortURL: latestIndex
        })
      } else {
        // res.json({ error: 'Invalid Url' })
        res.render('error')

      }
    })
  } catch (err) {
    console.log('Invalid Parameter Provided: ' + err)
    // res.json({ error: 'Invalid Url' })
    res.render('error')
  }
}

exports.handleShortUrl = (req, res) => {
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
}
