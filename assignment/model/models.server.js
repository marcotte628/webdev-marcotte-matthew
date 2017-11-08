var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017'; // for local


if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds129344.mlab.com:29344/heroku_ngcnjr87';
}

var db = mongoose.connect(connectionString);
module.exports = db;
