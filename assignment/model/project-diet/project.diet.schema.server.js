

var mongoose = require('mongoose');

var ProjectFoodSchema = mongoose.Schema({
  name: String,
  type: String,
  userId: {},
  protein: String,
  carbs: String,
  fats: String,
  image: String
}, {collection: 'projectFood'});

module.exports = ProjectFoodSchema;


