require('dotenv').config()
const mongoose = require('mongoose')
const database = process.env.DB_NAME
const server = process.env.DB_SERVER_ADDR
const port = process.env.DB_PORT
console.log(
  'Connecting to database - ' + `mongodb://${server}:${port}/${database}`
)
mongoose.connect(`mongodb://${server}:${port}/${database}`)
const UrlEntity = require('../models/urlShort')

exports.persistUrl = function (url) {
  const obj = {
    url,
    index: 1
  }

 return UrlEntity.find().limit(1).sort({ $natural: -1 }).then(data => {
    console.log('Most recent entity found : ' + JSON.stringify(data))
    if (data && data.length > 0) {
      let index = data[0].index
      console.log('Most recent entity index: ' + index + ' - ' + typeof index)

      obj.index = ++index
    }
    const urlDocument = new UrlEntity(obj)
    return urlDocument.save()
  })
}

exports.getByIndex = function (index) {
  return UrlEntity.findOne({ index })
}
