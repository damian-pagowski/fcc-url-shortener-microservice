const dns = require('dns')
const dao = require('./urlDao')

exports.addUrl = (req, res) => {
  const url = req.body.url
  try {
    const tokenizedUrl = url.split('://')
    dns.lookup(tokenizedUrl[1], (err, addr) => {
      console.log(`DNS lookup: ${addr} ERRORS: ${err}`)
      if (addr) {
        dao.persistUrl(url).then(data =>
          res.render('result', {
            originalURL: data.url,
            shortURL: data.index
          })
        )
      } else {
        res.render('error')
      }
    })
  } catch (err) {
    console.log('Invalid Parameter Provided: ' + err)
  }
}

exports.handleShortUrl = (req, res) => {
  const param = req.params['link_id']
  console.log('Parameter received: ' + param)
  const linkId = parseInt(param)
  // savedUrl = urls[linkId]
  // savedUrl.then(d => console.log(JSON.stringify(d)))
  dao
    .getByIndex(linkId)
    .then(data => {
      if (data) {
        console.log('Found URL: ' + data.url)
        res.status(301).redirect(data.url)
      } else {
        // res.status(400).json({ error: 'Invalid Url' })
        res.render('error')
      }
    })
    .catch(err => {
      console.log('Invalid Parameter Provided: ' + err)
    })
}
