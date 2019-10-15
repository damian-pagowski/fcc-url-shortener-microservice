const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

urlSchema.statics.getLastIndex = function () {
  return this.find().limit(1).sort({ $natural: -1 }).then(data => {
    if (data && data.length > 0) {
      console.log('Most recent entity found : ' + JSON.stringify(data))
      return data[0].index
    } else {
      console.log('Entity not found')
      return 0
    }
  })
}

urlSchema.statics.findByIndex = function (index) {
  return this.findOne({ index })
}

module.exports = mongoose.model('UrlEntity', urlSchema)
