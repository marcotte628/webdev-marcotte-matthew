module.exports = function(app) {

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
    /*
    NEED TO BUILD IN _ID BEFORE PUSHING
     */
    var websiteId = req.params['websiteId'];
    var pageDetails = req.body;
    pages.push(pageDetails);
    var pageList = [];
    for(var i = 0; i < pages.length; i++) {
      if(pages[i].websiteId === websiteId) {
        pageList.push(pages[i]);
      }
    }
    res.json(pageList);
  }

  function findAllPagesForWebsite( req, res ){
    var websiteId = req.params['websiteId'];
    var pageList = [];
    for(var i = 0; i < pages.length; i++) {
      if(pages[i].websiteId === websiteId) {
        pageList.push(pages[i]);
      }
    }
    res.json(pageList);

  }

  function findPageById( req, res ){
    var pageId = req.params['pageId'];
    for(var i = 0; i < pages.length; i++) {
      if(pages[i]._id === pageId) {
        res.json(pages[i]);
      }
    }
  }

  function updatePage( req, res ){
    var pageId = req.params["pageId"];
    var pageDetails = req.body;
    for(var i = 0; i < pages.length; i++) {
      if(pages[i]._id === pageId) {
        pages[i] = pageDetails;
      }
    }
    res.json(pages);

  }

  function deletePage( req, res ){
    var pageId = req.params['pageId'];
    for(var i = 0; i < pages.length; i++) {
      if(pages[i]._id === pageId) {
        pages.splice(i, 1);
      }
    }
    res.json(pages);
  }

}
