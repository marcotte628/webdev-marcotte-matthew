
var mongoose = require('mongoose');

var ProjectUserSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  email: String,
  role: String,
  rating: Number,
  followedUsers: [{}],
  followedByUsers: [{}],
  followedDiets: [{}],
  followedWorkouts: [{}],
  gymMemberships: [{}],
  storeMemberships: [{}],
}, {collection: 'projectUser'});

module.exports = ProjectUserSchema;
