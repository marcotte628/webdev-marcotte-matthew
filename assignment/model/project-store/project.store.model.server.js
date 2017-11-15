var ProjectStoreSchema = require("./project.store.schema.server");
var mongoose = require('mongoose');

var ProjectStoreModel = mongoose.model("ProjectStoreModel", ProjectStoreSchema);
ProjectStoreModel.findStoreById = findStoreById;
ProjectStoreModel.createStore = createStore;
ProjectStoreModel.findStoreByName = findStoreByName;
ProjectStoreModel.findStoreByType = findStoreByType;
ProjectStoreModel.updateStore = updateStore;
ProjectStoreModel.deleteStore = deleteStore;
ProjectStoreModel.findAllStores = findAllStores;

module.exports = ProjectStoreModel;

function createStore(store){
  return ProjectStoreModel.create(store);
}

function findStoreById(sid){
  return ProjectStoreModel.findById(sid);
}

function findStoreByName(name){
  return ProjectStoreModel.findOne({name: name});
}

function findStoreByType(type){
  return ProjectStoreModel.find({type: type});
}

function updateStore(sid, info){
  return ProjectStoreModel.update({_id: sid}, {$set : info});
}

function deleteStore(sid) {
  return ProjectStoreModel.remove({_id: sid});
}

function findAllStores(){
  return ProjectStoreModel.find();
}



