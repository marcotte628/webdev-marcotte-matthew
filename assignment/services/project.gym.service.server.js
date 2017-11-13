
module.exports = function(app) {

  var gymModel = require("../model/project-gym/project.gym.model.server");

  var GYMS = [
    {_id: "101", name: "Global Fitness", type: "classic", address: "123 A street" },
    {_id: "102", name: "Fitness Together", type: "trainer", address: "234 B street"},
    {_id: "103", name: "Curves", type: "womens", address: "345 C street"},
    {_id: "104", name: "Planet Fitness", type: "classic", address: "456 D street"},
    {_id: "105", name: "Golds Gym", type: "classic", address: "567 E street"},
    {_id: "106", name: "New Balance Gym", type: "classic", address: "678 F street"},
    {_id: "107", name: "Title Boxing Gym", type: "boxing", address: "789 G street"},
    {_id: "108", name: "Boston Sports Club", type: "general", address: "890 H street"},
    {_id: "109", name: "YMCA Boston", type: "general", address: "901 I street"},
  ];


  app.get("/api/project/gym", getGyms);
  app.get("/api/project/gym/:gid", getGymById);
  app.post("/api/project/gym", createGym);
  app.put("/api/project/gym/:gid", updateGym);
  app.delete("/api/project/gym/:gid", deleteGym);


  function getGyms(req, res){
    var type = req.query["type"];
    var name = req.query["name"];

    if(name){
      gymModel.findGymByName(name).then(function(gym){
        res.json(gym);
      });

    }else if(type) {
      gymModel.findGymByType(type).then(function (gym) {
        res.json(gym);
      });

    }else{
      gymModel.findAllGyms().then(function(gyms){
        res.json(gyms);
      })
    }
  }

  function getGymById(req, res){
    var gid = req.params["gid"];
    gymModel.findGymById(gid).then(function(gym){
      res.json(gym);
    });
  }

  function createGym(req, res){
    var newGym = req.body;
    gymModel.createGym(newGym).then(function(gym){
      res.json(gym);
    });
  }

  function updateGym(req, res){
    var wid = req.params["gid"];
    var body = req.body;
    gymModel.updateGym(gid, body).then(function(gym){
      res.json(gym);
    });
  }

  function deleteGym(req, res){
    var gid = req.params["gid"];
    gymModel.deleteGym(gid).then(function(rest){
      res.json(rest);
    });

  }

};

