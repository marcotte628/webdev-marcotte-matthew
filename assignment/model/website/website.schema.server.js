
var mongoose = require('mongoose');

var WebsiteSchema = mongoose.Schema({
  _user: String,
  name: String,
  description: String,
  pages: [String],
  dateCreated: Date
}, {collection: 'website'});

module.exports = WebsiteSchema;
