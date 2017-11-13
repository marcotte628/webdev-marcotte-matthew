
module.exports = function(app) {

  var storeModel = require("../model/project-store/project.store.model.server");

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
      storeModel.findStoreByName(name).then(function(store){
        res.json(store);
      });

    }else if(type){
      storeModel.findStoreByType(type).then(function(stores){
        res.json(stores);
      });
    }else{
      storeModel.findAllStores().then(function(stores){
        res.json(stores);
      });
    }
  }

  function getStoreById(req, res){
    var sid = req.params["sid"];
    storeModel.findStoreById(sid).then(function(store){
      res.json(store);
    });
  }

  function createStore(req, res){
    var newStore = req.body;
    storeModel.createStore(newStore).then(function(store){
      res.json(store);
    });

  }

  function updateStore(req, res){
    var sid = req.params["sid"];
    var body = req.body;
    storeModel.updateStore(sid, body).then(function(store){
      res.json(store);
    });

  }

  function deleteStore(req, res){
    var sid = req.params["sid"];
    storeModel.deleteStore(sid).then(function (rest) {
      res.json(rest);
    });
  }

};

