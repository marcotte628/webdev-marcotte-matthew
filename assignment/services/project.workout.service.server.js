
module.exports = function(app) {

  var workoutModel = require("../model/project-workout/project.workout.model.server");

  var WORKOUTS = [
    {_id: "001", name: "bench press", type: "chest", difficulty: 50 },
    {_id: "002", name: "pull up", type: "back", difficulty: 70},
    {_id: "003", name: "squat", type: "legs", difficulty: 60},
    {_id: "004", name: "jog", type: "cardio", difficulty: 50},
    {_id: "005", name: "sprint", type: "cardio", difficulty: 100},
    {_id: "006", name: "climb stairs", type: "legs", difficulty: 30},
    {_id: "007", name: "push up", type: "chest", difficulty: 40},
    {_id: "008", name: "sit up", type: "abs", difficulty: 40},
    {_id: "009", name: "walk", type: "cardio", difficulty: 10},
    {_id: "010", name: "row", type: "back", difficulty: 50},
  ];

  app.get("/api/project/workout", getWorkouts);
  app.get("/api/project/workout/:wid", getWorkoutById);
  app.post("/api/project/workout", createWorkout);
  app.put("/api/project/workout/:wid", updateWorkout);
  app.delete("/api/project/workout/:wid", deleteWorkout);


  function getWorkouts(req, res){
    var type = req.query["type"];
    var name = req.query["name"];
    var difficulty = req.query["difficulty"];

    if(name){
      workoutModel.findWorkoutByName(name).then(function(ret){
        res.json(ret);
      });

    }else if(type){
      workoutModel.findWorkoutByType(type).then(function(ret){
        res.json(ret);
      });
    }else if(difficulty){
      workoutModel.findWorkoutByDifficulty(difficulty).then(function(ret){
        res.json(ret);
      });
    }else{
      workoutModel.findAllWorkouts().then(function(ret){
        res.json(ret);
      });
    }

  }

  function getWorkoutById(req, res){
    var wid = req.params["wid"];
    workoutModel.findWorkoutById(wid).then(function(ret){
      res.json(ret);
    });

  }

  function createWorkout(req, res){
    var newWO = req.body;
    workoutModel.createWorkout(newWO).then(function(ret){
      res.json(ret);
    });

  }

  function updateWorkout(req, res){
    var wid = req.params["wid"];
    var body = req.body;
    workoutModel.updateWorkout(wid, body).then(function(ret){
      res.json(ret);
    });
  }

  function deleteWorkout(req, res){
    var wid = req.params["wid"];
    workoutModel.deleteWorkout(wid).then(function(ret){
      res.json(ret);
    });
  }


}

