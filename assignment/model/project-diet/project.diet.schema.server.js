

var mongoose = require('mongoose');

var ProjectFoodSchema = mongoose.Schema({
  name: String,
  type: String,
  userId: String,
  protein: String,
  carbs: String,
  fats: String
}, {collection: 'projectFood'});

module.exports = ProjectFoodSchema;


