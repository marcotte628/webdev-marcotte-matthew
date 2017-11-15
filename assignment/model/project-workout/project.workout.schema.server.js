
var mongoose = require('mongoose');

var ProjectWorkoutSchema = mongoose.Schema({
  name: String,
  type: String,
  difficulty: String,
  userId: {},
  image: String
}, {collection: 'projectWorkout'});

module.exports = ProjectWorkoutSchema;


