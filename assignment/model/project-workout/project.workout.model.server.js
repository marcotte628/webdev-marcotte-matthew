var ProjectWorkoutSchema = require("./project.workout.schema.server");
var mongoose = require('mongoose');

var ProjectWorkoutModel = mongoose.model("ProjectWorkoutModel", ProjectWorkoutSchema);
ProjectWorkoutModel.createWorkout = createWorkout;
ProjectWorkoutModel.findWorkoutById = findWorkoutById;
ProjectWorkoutModel.findWorkoutByName = findWorkoutByName;
ProjectWorkoutModel.findWorkoutByType = findWorkoutByType;
ProjectWorkoutModel.findWorkoutByDifficulty = findWorkoutByDifficulty;
ProjectWorkoutModel.updateWorkout = updateWorkout;
ProjectWorkoutModel.deleteWorkout = deleteWorkout;
ProjectWorkoutModel.findAllWorkouts = findAllWorkouts;

module.exports = ProjectWorkoutModel;

function createWorkout(store){
  return ProjectWorkoutModel.create(store);
}

function findWorkoutById(sid){
  return ProjectWorkoutModel.findById(sid);
}

function findWorkoutByName(name){
  return ProjectWorkoutModel.find({name: name});
}

function findWorkoutByType(t){
  return ProjectWorkoutModel.find({type: t});
}

function findWorkoutByDifficulty(d){
  return ProjectWorkoutModel.find({difficulty: d});
}

function updateWorkout(sid, info){
  return ProjectWorkoutModel.update({_id: sid}, {$set : info});
}

function deleteWorkout(sid) {
  return ProjectWorkoutModel.remove({_id: sid});
}

function findAllWorkouts(){
  return ProjectWorkoutModel.find();
}



