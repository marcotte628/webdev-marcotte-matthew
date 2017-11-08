
var WebsiteSchema = require("./website.schema.server");
var userModel = require("../user/user.model.server");

var mongoose = require('mongoose');

var WebsiteModel =  mongoose.model("WebsiteModel", WebsiteSchema);
WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;

module.exports = WebsiteModel;

function createWebsiteForUser(userId, website){
  // userModel.update({_id: userId}, { $push: { websites: website }});
  return WebsiteModel.create(website);

}

function findAllWebsitesForUser(userId){
  return WebsiteModel.find({_user: userId});

}

function findWebsiteById(websiteId){
  return WebsiteModel.findOne({_id: websiteId});

}

function updateWebsite(websiteId, website){
  WebsiteModel.update({_id: websiteId}, {$set: website});
}

function deleteWebsite(websiteId){
  return WebsiteModel.remove({_id: websiteId});

}

