
var PageSchema = require("./page.schema.server");
var websiteModel = require("../website/website.model.server")
var mongoose = require('mongoose');

var PageModel =  mongoose.model("PageModel", PageSchema);
PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;

module.exports = PageModel;

function createPage(websiteId, page) {
  // websiteModel.update({_id: websiteId}, { $push: { pages: page }})
  return PageModel.create(page);
}

function findAllPagesForWebsite(websiteId) {
  return PageModel.find({_website: websiteId});
}

function findPageById(pageId) {
  return PageModel.findOne({_id: pageId});
}

function updatePage(pageId, page) {
  PageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId) {
  return PageModel.remove({_id: pageId});
}
