var UserSchema = require("./user.schema.server");
var mongoose = require('mongoose');

var UserModel = mongoose.model("UserModel", UserSchema);
UserModel.findUserById = findUserById;
UserModel.createUser =  createUser;
UserModel.findAllUsers = findAllUsers;
UserModel.findUserByCredentials = findUserByCredentials;

module.exports = UserModel;

function findUserByCredentials(username, password){
  return UserModel.findOne({username: username, password: password});
}

function createUser(user){
  UserModel.create(user, function(err, doc){
    conslole.log(err);
    console.log(doc);
  });
}

function findAllUsers(){
  UserModel.find(function(err, docs){
    console.log(docs);
  });
}

function findUserById(userId){
  UserModel.findById(userId, function(err, docs) {
    console.log(docs);
  });
}
