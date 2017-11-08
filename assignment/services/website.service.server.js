
module.exports = function (app) {

  var websiteModel = require("../model/website/website.model.server");

  var WEBSITES = [
    { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
    { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
    { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
    { _id: "890", name: "Go",          developerId: "123", description: "Lorem" },
    { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
    { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
    { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }
  ];

  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.post("/api/user/:userId/website", createWebsite);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId", deleteWebsite);


  function createWebsite(req, res) {
    var userId = req.params['userId'];
    var websiteDetails = req.body;
    websiteModel.createWebsiteForUser(userId, websiteDetails).then(function(site){
      res.json(site);
    });
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId).then(function(sites){
      console.log(sites);
      res.json(sites);
    });
  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websteId).then(function(site){
      res.json(site);
    });
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var newDetails = req.body;
    websiteModel.updateWebsite(websiteId, newDetails).then(function(sites){
      res.json(sites)
    });
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId).then(function(sites){
      res.json(sites);
    });
  }

};
