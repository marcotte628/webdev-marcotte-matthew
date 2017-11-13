var ProjectFoodSchema = require("./project.diet.schema.server");
var mongoose = require('mongoose');

var ProjectFoodModel = mongoose.model("ProjectFoodModel", ProjectFoodSchema);
ProjectFoodModel.findFoodById = findFoodById;
ProjectFoodModel.createFood = createFood;
ProjectFoodModel.findFoodByName = findFoodByName;
ProjectFoodModel.findFoodByType = findFoodByType;
ProjectFoodModel.updateFood = updateFood;
ProjectFoodModel.deleteFood = deleteFood;
ProjectFoodModel.findAllFoods = findAllFoods;

module.exports = ProjectFoodModel;

function createFood(food){
  return ProjectFoodModel.create(user);
}

function findFoodById(fid){
  return ProjectFoodModel.findById(fid);
}

function findFoodByName(name){
  return ProjectFoodModel.findOne({name: name});
}

function findFoodByType(type){
  return ProjectFoodModel.findOne({type: type});
}

function updateFood(fid, food){
  return ProjectFoodModel.update({_id: fid}, {$set : food});
}

function deleteFood(fid) {
  return ProjectFoodModel.remove({_id: fid});
}

function findAllFoods(){
  return ProjectFoodModel.find();
}



