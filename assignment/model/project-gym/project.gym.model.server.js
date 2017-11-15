var ProjectGymSchema = require("./project.gym.schema.server");
var mongoose = require('mongoose');

var ProjectGymModel = mongoose.model("ProjectGymModel", ProjectGymSchema);
ProjectGymModel.createGym = createGym;
ProjectGymModel.findGymById = findGymById;
ProjectGymModel.findGymByName = findGymByName;
ProjectGymModel.findGymByType = findGymByType;
ProjectGymModel.updateGym = updateGym;
ProjectGymModel.deleteGym = deleteGym;
ProjectGymModel.findAllGyms = findAllGyms;

module.exports = ProjectGymModel;

function createGym(gym){
  return ProjectGymModel.create(gym);
}

function findGymById(gid){
  return ProjectGymModel.findById(gid);
}

function findGymByName(name){
  return ProjectGymModel.findOne({name: name});
}

function findGymByType(type){
  return ProjectGymModel.find({type: type});
}

function updateGym(gid, info){
  return ProjectGymModel.update({_id: gid}, {$set : info});
}

function deleteGym(gid) {
  return ProjectGymModel.remove({_id: gid});
}

function findAllGyms(){
  return ProjectGymModel.find();
}



