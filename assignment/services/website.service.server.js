
module.exports = function (app) {

  //var WEBSITES = require( "./website.mock");

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
    websiteDetails._id = '' + WEBSITES.length;
    WEBSITES.push(websiteDetails);
    var wesbiteList = [];
    for(var i = 0; i < WEBSITES.length; i++) {
      if(WEBSITES[i].developerId === userId) {
        wesbiteList.push(WEBSITES[i]);
      }
    }
    res.json(wesbiteList);
  }

  function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var wesbiteList = [];
    for(var i = 0; i < WEBSITES.length; i++) {
      if(WEBSITES[i].developerId === userId) {
        wesbiteList.push(WEBSITES[i]);
      }
    }
    res.json(wesbiteList);

  }

  function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    for(var i = 0; i < WEBSITES.length; i++) {
      if(WEBSITES[i]._id === websiteId) {
        res.json(WEBSITES[i]);
      }
    }
  }

  function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var newDetails = req.body;
    for(var i = 0; i < WEBSITES.length; i++){
      if(WEBSITES[i]._id == websiteId) {
        WEBSITES.splice(i, 1);
        WEBSITES.push(newDetails);
        res.json(WEBSITES);
      }
    }
  }

  function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    for(var i = 0; i < WEBSITES.length; i++){
      if(WEBSITES[i]._id == websiteId) {
        WEBSITES.splice(i, 1);
        res.json(WEBSITES);
      }
    }
  }
};
