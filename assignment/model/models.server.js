var mongoose = require('mongoose');
// definitely not the location of my mongodb... also need like { user } or something
var db = mongoose.connect('mongodb://127.0.0.1:27017');
module.exports = db;
