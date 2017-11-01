
module.exports = function(app) {

  var PEOPLE = [
    {_id: "012", username: "matt",    password: "matt",    name: "Matt Marcotte", role: "athlete",
      rating: 1000, followedIds: ["123", "234", "345", "456", "567", "678", "789"], postIds: ["000", "001", "002" ],
      gymIds: [], storeIds: [] },
    {_id: "123", username: "alice",    password: "alice", name: "Alice Wonder",  role: "trainer",
      rating: 1000,  followedIds: [ "234", "345", "456", "567", "678", "789"], postIds: ["003", "004", "005" ],
      gymIds: [], storeIds: [] },
    {_id: "234", username: "bob",      password: "bob",  name: "Bob Marley",  role: "nutritionist",
      rating: 1000,  followedIds: ["123", "345", "456", "567" ], postIds: ["006", "007", "008" ],
      gymIds: [], storeIds: [] },
    {_id: "345", username: "tyrone",   password: "tyrone", name: "Tyrone Woodly", role: "athlete",
      rating: 750,  followedIds: ["123", "234" ], postIds: ["009", "010", "011" ],
      gymIds: [], storeIds: []},
    {_id: "456", username: "tyler", password: "tyler", name: "Tyler Durden", role: "athlete",
      rating: 500, followedIds: [ ], postIds: ["012", "013" ],
      gymIds: [], storeIds: []},
    {_id: "567", username: "joe", password: "joe", name: "Joe Rogan", role: "athlete",
      rating: 250, followedIds: ["123", "234", "345", "678", "789"], postIds: ["014", "015", "016" ],
      gymIds: [], storeIds: []},
    {_id: "678", username: "owen", password: "owen", name: "Owen Woods", role: "athlete",
      rating: 100, followedIds: ["123", "234", "345", "456", "567"], postIds: ["017", "018", "019" ],
      gymIds: [], storeIds: []},
    {_id: "789", username: "ronald", password: "mcdonald", name: "Ronald McDonald", role: "athlete",
      rating: 1, followedIds: ["012"], postIds: ["020", "021", "022" ],
      gymIds: [], storeIds: []}
  ];

  app.get("/api/project/user", getPerson);
  app.get("/api/project/user/:uid", getPersonById);
  app.post("/api/project/user", createAccount);
  app.put("/api/project/user/:uid", updateAccount);
  app.delete("/api/project/user/:uid", deleteAccount);

  function getPerson(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    if(username && password){
      var user = getPersonByCredentials(username, password);
      res.json(user);
    }else if(username){
      var user = getPersonByUsername(username);
      res.json(user);
    }else{
      res.json(PEOPLE);
    }
  }

  function getPersonByCredentials(username, password) {
    for(var i = 0; i < PEOPLE.length; i++) {
      if(PEOPLE[i].username === username && PEOPLE[i].password === password) {
        return PEOPLE[i];
      }
    }
  }

  function getPersonByUsername(username) {
    for(var i = 0; i < PEOPLE.length; i++) {
      if(PEOPLE[i].username === username){
        return PEOPLE[i];
      }
    }
  }

  function getPersonById(req, res){
    var uid = req.params["uid"];
    for(var i = 0; i < PEOPLE.length; i++) {
      if(PEOPLE[i]._id === uid){
        var user = PEOPLE[i];
      }
    }
    res.json(user);
  }

  function createAccount(req, res) {
    var newUser = req.body;
    newUser._id = '' + users.length;
    PEOPLE.push(newUser);
    res.json(newUser);
  }

  function updateAccount(req, res) {
    var uid = req.params["uid"];
    var body = req.body;
    for(var i = 0; i < PEOPLE.length; i++) {
      if(PEOPLE[i]._id === uid) {
        PEOPLE[i]= body;
      }
    }
  }

  function deleteAccount(req, res) {
    var uid = req.params["uid"];
    for(var i = 0; i < PEOPLE.length; i++) {
      if(PEOPLE[i]._id !== uid ) {
        PEOPLE.splice(i, 1);
      }
    }
    res.json(PEOPLE);
  }

}
