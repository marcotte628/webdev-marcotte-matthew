
module.exports = function(app) {


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
      for(var i = 0; i < GYMS.length; i++) {
        if(GYMS[i].name === name ) {
          var ret = GYMS[i];
        }
      }
    }else if(type){
      for(var i = 0; i < GYMS.length; i++) {
        if(GYMS[i].type === type ) {
          var ret = GYMS[i];
        }
      }
    }

    if(ret){
      res.json(ret);
    } else{
      res.json(GYMS);
    }
  }

  function getGymById(req, res){
    var gid = req.params["gid"];
    for(var i = 0; i < GYMS.length; i++) {
      if(GYMS[i]._id === gid ) {
        var ret = GYMS[i];
      }
    }
    res.json(ret);

  }

  function createGym(req, res){
    var newWO = req.body;
    newWO._id = '' + GYMS.length;
    GYMS.push(newWO);
    res.json(newWO);

  }

  function updateGym(req, res){
    var wid = req.params["wid"];
    var body = req.body;
    for(var i = 0; i < GYMS.length; i++) {
      if(GYMS[i]._id === wid) {
        GYMS[i]= body;
      }
    }
    res.json(body)
  }

  function deleteGym(req, res){
    var wid = req.params["wid"];
    for(var i = 0; i < GYMS.length; i++) {
      if(GYMS[i]._id !== wid ) {
        GYMS.splice(i, 1);
      }
    }
    res.json(GYMS);
  }

}

