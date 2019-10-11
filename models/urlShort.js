var mongoose = require('mongoose')

let urlSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('urlSchema', urlSchema)
