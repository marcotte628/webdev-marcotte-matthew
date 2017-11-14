
var mongoose = require('mongoose');

var ProjectWorkoutSchema = mongoose.Schema({
  name: String,
  type: String,
  difficulty: String,
  userId: String,
  image: String
}, {collection: 'projectWorkout'});

module.exports = ProjectWorkoutSchema;


