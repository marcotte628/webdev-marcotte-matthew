module.exports = function(app) {


  var pageModel = require("../model/page/page.model.server");

  pages = [
    { _id: "321", name: "Post 1", websiteId: "456", description: "Lorem" },
    { _id: "432", name: "Post 2", websiteId: "456", description: "Lorem" },
    { _id: "543", name: "Post 3", websiteId: "456", description: "Lorem" }
  ];

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage( req, res ){
    var websiteId = req.params['websiteId'];
    var pageDetails = req.body;

    pageModel.createPage(websiteId, pageDetails).then(function(pages){
      console.log(pages);
      res.json(pages);
    });
  }

  function findAllPagesForWebsite( req, res ){
    var websiteId = req.params['websiteId'];
    pageModel.findAllPagesForWebsite(websiteId).then(function(pages){
      res.json(pages);
    });
  }

  function findPageById( req, res ){
    var pageId = req.params['pageId'];
    pageModel.findPageById(pageId).then(function(page){
      res.json(page);
    });
  }

  function updatePage( req, res ){
    var pageId = req.params["pageId"];
    var pageDetails = req.body;
    pageModel.updatePage(pageId, pageDetails).then(function(pages){
      res.json(pages);
    });
  }

  function deletePage( req, res ){
    var pageId = req.params['pageId'];
    pageModel.deletePage(pageId).then(function(pages){
      res.json(pages);
    });
  }

}
