
module.exports = function(app) {
  var STORES = [
    {_id: "201", name: "GNC", type: "nutrition", address: "123 J street" },
    {_id: "202", name: "Whole Foods", type: "grocery", address: "234 K street"},
    {_id: "203", name: "Shaws", type: "grocery", address: "345 L street"},
    {_id: "204", name: "CVS", type: "pharmacy", address: "456 M street"},
    {_id: "205", name: "Walmart", type: "general", address: "567 N street"},
  ];

  app.get("/api/project/stores", getStores);
  app.get("/api/project/stores/:sid", getStoreById);
  app.post("/api/project/stores", createStore);
  app.put("/api/project/stores/:sid", updateStore);
  app.delete("/api/project/stores/:sid", deleteStore);


  function getStores(req, res){
    var type = req.query["type"];
    var name = req.query["name"];

    if(name){
      for(var i = 0; i < STORES.length; i++) {
        if(STORES[i].name === name ) {
          var ret = STORES[i];
        }
      }
    }else if(type){
      for(var i = 0; i < STORES.length; i++) {
        if(STORES[i].type === type ) {
          var ret = STORES[i];
        }
      }
    }

    if(ret){
      res.json(ret);
    } else{
      res.json(STORES);
    }
  }

  function getStoreById(req, res){
    var sid = req.params["sid"];
    for(var i = 0; i < STORES.length; i++) {
      if(STORES[i]._id === wid ) {
        var ret = STORES[i];
      }
    }
    res.json(ret);

  }

  function createStore(req, res){
    var newStore = req.body;
    newStore._id = '' + WORKOUTS.length;
    STORES.push(newWO);
    res.json(newWO);

  }

  function updateStore(req, res){
    var sid = req.params["sid"];
    var body = req.body;
    for(var i = 0; i < STORES.length; i++) {
      if(STORES[i]._id === sid) {
        STORES[i]= body;
      }
    }
    res.json(body)
  }

  function deleteStore(req, res){
    var sid = req.params["sid"];
    for(var i = 0; i < STORES.length; i++) {
      if(STORES[i]._id !== sid ) {
        STORES.splice(i, 1);
      }
    }
    res.json(STORES);
  }

}

