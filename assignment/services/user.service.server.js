
module.exports = function(app) {

  var userModel = require("../model/user/user.model.server");

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  app.get("/api/user", getUser);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  function getUser(req, res){
    var username = req.query["username"];
    var password = req.query["password"];
    if(username && password){
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function(user){
        res.json(user);
      });
      return;
    }else if(username){
      userModel.findUserByUsername(username).then(function(user){
        res.json(user);
      });
    }else{
      userModel.findAllUsers().then(function(users){
        res.json(users);
      });
    }
  }

  function findUserById(req, res){
    var uid = req.params["userId"];
    userModel.findUserById(uid).then(function(user){
      res.json(user);
    });
  }

  function createUser(req, res) {
    var newUser = req.body;
    userModel.createUser(newUser).then(function(user){
      res.json(user);
    });
  }

  function updateUser(req, res) {
    var uid = req.params["userId"];
    var body = req.body;
    userModel.updateUser(uid, body).then(function(user){
      res.json(user);
    });
  }

  function deleteUser(req, res) {
    var uid = req.params["userId"];
    userModel.deleteUser(uid).then(function(result){
      res.json(result);
    });
  }

  function findUserByUsername(req, res) {
    userModel.findUserByUsername(username).then(function(user){
      res.json(user);
    });
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var promise = userModel.findUserByCredentials(username, password);
    promise.then(function(user){
      res.json(user);
    });
  }


};
