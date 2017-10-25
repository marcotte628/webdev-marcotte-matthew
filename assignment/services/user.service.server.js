
module.exports = function(app) {

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
      var user = getUserByCredentials(username, password);
      res.json(user);
    }else if(username){
      var user = getUserByUsername(username, password);
    }else{
      res.json(users);
    }
  }

  function getUserByCredentials(username, password){
    for(var i = 0; i < users.length; i++) {
      if(users[i].username === username && users[i].password === password) {
        return users[i];
      }
    }
  }

  function getUserByUsername(username, password){
    for(var i = 0; i < users.length; i++) {
      if(users[i].username === username) {
        return users[i];
      }
    }
  }

  function findUserById(req, res){
    var uid = req.params["userId"];
    var user = users.find(function(user){
      return user._id === uid;
    });
    res.json(user);
  }

  function createUser(req, res) {
    var newUser = req.body;
    newUser._id = '' + users.length;
    users.push(newUser);
    res.json(newUser);
  }

  function updateUser(req, res) {
    var uid = req.params["userId"];
    var body = req.body;
    for(var i = 0; i < users.length; i++) {
      if(users[i]._id === uid) {
        users[i]= body;
      }
    }
  }

  function deleteUser(req, res) {
    var uid = req.params["userId"];
    for(var i = 0; i < users.length; i++) {
      if(users[i]._id !== uid ) {
        users.splice(i, 1);
      }
    }
    res.json(users);
  }


  function findUserByUsername(req, res) {
    console.log("FIND USER BY USERNAME");
    var username = req.query["username"];
    var user = users.find(function(user){
      return user.username === username;
    });
    res.json(user);
  }

  function findUserByCredentials(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    var user = users.find(function(user){
      return (user.username === username && user.password === password);
    });
    res.json(user);
  }


};
