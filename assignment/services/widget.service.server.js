
module.exports = function(app) {

  var baseUrl;
  if(process.env.MLAB_USERNAME_WEBDEV) {
    baseUrl = 'https://webdev-marcotte-matthew.herokuapp.com';
  }else{
    baseUrl = 'http://localhost:3100';
  }

  var widgetModel = require("../model/widget/widget.model.server");
  var widgets = [
    { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
    { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
    { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://www.youtube.com/embed/AM2Ivdi9c4E" },
    { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
  ];

  var multer = require('multer'); // (did it!) npm install multer --save
  var upload = multer({ dest: __dirname+'/../../dist/assets/css' });

  app.post ("/api/upload", upload.single('myFile'), uploadImage);
  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  function uploadImage( req, res ){
    var newWidget = { _id: widgets.length, widgetType: "IMAGE", pageId:req.body.pageId, width: "100%", url: baseUrl + '/assets/css/'+ req.file.filename};
    widgets.push(newWidget);
    res.redirect(baseUrl +'/user/'+req.body.userId+'/website/'+req.body.websiteId+'/page/'+req.body.pageId+'/widget');
  }

  function createWidget( req, res ) {
    var pageId = req.params['pageId'];
    var widgetDetails = req.body;

    widgetModel.createWidget(pageId, widgetDetails).then(function(widgets){
      res.json(widgets);
    });

  }

  function findAllWidgetsForPage( req, res ) {
    var pageId = req.params['pageId'];
    widgetModel.findAllWidgetsForPage(pageId).then(function(widgets){
      console.log(widgets);
      res.json(widgets);
    })
  }
  function findWidgetById( req, res ) {
    var widgetId = req.params['widgetId'];
    widgetModel.findWidgetById(widgetId).then(function(widget){
      res.json(widget);
    });
  }

  function updateWidget( req, res ) {
    var widgetId = req.params['widgetId'];
    var widgetDetails = req.body;
    widgetModel.updateWidget(widgetId, widgetDetails).then(function(widgets){
      res.json(widgets);
    });
  }
  function deleteWidget( req, res ) {
    var widgetId = req.params['widgetId'];
    widgetModel.deleteWidget(widgetId).then(function(widgets){
      res.json(widgets);
    });
  }

}
