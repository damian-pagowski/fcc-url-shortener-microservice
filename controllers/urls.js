const dns = require('dns')
const UrlEntity = require('../models/urlEntity')

exports.addUrl = (req, res) => {
  const url = req.body.url
  try {
    const tokenizedUrl = url.split('://')
    dns.lookup(tokenizedUrl[1], (err, addr) => {
      console.log(`DNS lookup: ${addr} ERRORS: ${err}`)
      if (addr) {
        UrlEntity.getLastIndex().then(i => {
          const entity = new UrlEntity({ url, index: ++i })
          entity.save().then((data, err) => {
            if (err) {
            } else {
              res.render('result', {
                originalURL: data.url,
                shortURL: data.index
              })
            }
          })
        })
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
  UrlEntity.findByIndex(linkId)
    .then(data => {
      if (data) {
        console.log('Found URL: ' + data.url)
        res.status(301).redirect(data.url)
      } else {
        res.render('error')
      }
    })
    .catch(err => {
      console.log('Invalid Parameter Provided: ' + err)
    })
}
