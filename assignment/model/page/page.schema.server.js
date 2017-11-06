var mongoose = require('mongoose');

var PageSchema = mongoose.Schema({
  _website: String,
  name: String,
  description: String,
  widgets: [String],
  dateCreated: Date
}, {collection: 'page'});

module.exports = PageSchema;
