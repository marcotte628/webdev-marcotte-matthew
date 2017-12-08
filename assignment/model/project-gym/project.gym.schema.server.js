
var mongoose = require('mongoose');

var ProjectGymSchema = mongoose.Schema({
  name: String,
  type: String,
  address: String,
  workouts: [{}]
}, {collection: 'projectGym'});

module.exports = ProjectGymSchema;
