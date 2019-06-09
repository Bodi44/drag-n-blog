const mongoose = require('mongoose')
const Schema = mongoose.Schema

layoutSchema = Schema({
  columnSize: String,
  rowId: String,
  indexInRow: Number
})

module.exports = mongoose.model('Layout', layoutSchema)