
var mongoose = require('mongoose');

var ProjectUserSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  role: String,
  rating: Number,
  followedUsers: [String],
  followedByUsers: [String],
  followedDiets: [String],
  followedWorkouts: [String],
  gymMemberships: [String],
  storeMemberships: [String],
}, {collection: 'projectUser'});

module.exports = ProjectUserSchema;
