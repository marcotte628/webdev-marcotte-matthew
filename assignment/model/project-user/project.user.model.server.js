var ProjectUserSchema = require("./project.user.schema.server");
var mongoose = require('mongoose');

var ProjectUserModel = mongoose.model("ProjectUserModel", ProjectUserSchema);
ProjectUserModel.findAccountById = findAccountById;
ProjectUserModel.createAccount =  createAccount;
ProjectUserModel.findAllAccounts = findAllAccounts;
ProjectUserModel.findAccountByCredentials = findAccountByCredentials;
ProjectUserModel.findAccountByUsername = findAccountByUsername;
ProjectUserModel.updateAccount = updateAccount;
ProjectUserModel.deleteAccount= deleteAccount;

module.exports = ProjectUserModel;

function createAccount(user){
  return ProjectUserModel.create(user);
}

function findAccountById(userId){
  return ProjectUserModel.findById(userId);
}

function findAccountByUsername(username){
  return ProjectUserModel.findOne({username: username});
}

function findAccountByCredentials(username, password){
  return ProjectUserModel.findOne({username: username, password: password});
}

function updateAccount(userId, user){
  return ProjectUserModel.update({_id: userId}, {$set : user});
}

function deleteAccount(userId) {
  return ProjectUserModel.remove({_id: userId});
}

function findAllAccounts(){
  return ProjectUserModel.find();
}

