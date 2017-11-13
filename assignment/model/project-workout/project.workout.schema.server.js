
var mongoose = require('mongoose');

var ProjectWorkoutSchema = mongoose.Schema({
  name: String,
  type: String,
  difficulty: String,
  image: String
}, {collection: 'projectWorkout'});

module.exports = ProjectWorkoutSchema;


