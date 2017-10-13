// class notes........

//implement some user web service endpoints

module.exports = function(app) {

  app.get("/api/user/:uid", findUserById);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user", findUsers);

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function findUserById(req, res){

    var uid = req.params["uid"];
    var user = users.find(function(user){
      return user._id === uid;
    });
    res.json(user);
  }

  function helloUser(req, res) {
    res.send("hello from the user service");
  }

  function findUsers(req, res){
    //check for arguments in url query

    var username = req.query["username"];
    var password = req.query["password"];
    if(username && password){
      var user = users.find(function(user){
        return user.username === username && user.password === password;
      });
    }
    if(user){
      res.json(user);
    }else {
      res.json({});
    }
    res.json(users);

  }

};
