
module.exports = function(app) {
  var widgets = [
    { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
    { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%", url: "http://lorempixel.com/400/200/"},
    { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
    { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
    { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%", url: "https://www.youtube.com/embed/AM2Ivdi9c4E" },
    { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
  ];

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);

  function createWidget( req, res ) {
    var pageId = req.params['pageId'];
    var widgetDetails = req.body;
    widgetDetails._id = widgets.length;
    widgets.push(widgetDetails);
    tmpWidgets = [];
    for(var i = 0; i < widgets.length; i++) {
      if(widgets[i].pageId === pageId){
        tmpWidgets.push(widgets[i])
      }
    }
    res.json(tmpWidgets);

  }

  function findAllWidgetsForPage( req, res ) {
    var pageId = req.params['pageId'];
    var pageList = [];
    for(var i = 0; i < widgets.length; i++) {
      if(widgets[i].pageId === pageId) {
        pageList.push(widgets[i]);
      }
    }
    res.json(pageList);
  }
  function findWidgetById( req, res ) {
    var widgetId = req.params['widgetId'];
    for(var i = 0; i < widgets.length; i++) {
      if(widgets[i]._id === widgetId) {
        res.json(widgets[i]);
      }
    }
  }

  function updateWidget( req, res ) {
    var widgetId = req.params['widgetId'];
    var widgetDetails = req.body;
    for(var i = 0; i < widgets.length; i++) {
      if(widgets[i]._id === widgetId) {
        widgets.splice(i, 1);
        widgets.push(widgetDetails);
      }
    }
    res.json(widgets);
  }
  function deleteWidget( req, res ) {
    var widgetId = req.params['widgetId'];
    for(var i = 0; i < widgets.length; i++) {
      if(widgets[i]._id === widgetId) {
        widgets.splice(i, 1);
      }
    }
    res.json(widgets);

  }


}
