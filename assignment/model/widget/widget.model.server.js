
var WidgetSchema = require("./widget.schema.server");
var mongoose = require('mongoose');
var pageModel = require("../page/page.model.server")

var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  pageModel.update({_id: pageId}, { $push: { widgets: widget }})
  return WidgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId});
}

function updateWidget(widgetId, widget) {
  return WidgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId) {
  return WidgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end) {

}
