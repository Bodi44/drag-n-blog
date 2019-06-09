const mongoose = require('mongoose')
const Schema = mongoose.Schema

articleSchema = Schema({
  title: String,
  content: String,
  date: String,
  author: String,
  tags: [{
    type: String
  }]
})

module.exports = mongoose.model('Article', articleSchema)