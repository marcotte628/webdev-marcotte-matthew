
module.exports = function(app) {

  var userModel = require("../model/user/user.model.server");

  var bcrypt = require("bcrypt-nodejs");
  var passport  = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.get("/api/user", getUser);
  app.get("/api/user?username=username&password=password", findUserByCredentials);
  app.get("/api/user?username=username", findUserByUsername);
  app.get("/api/user/:userId", findUserById);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);
  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#/profile',
      failureRedirect: '/#/login'
    }));


  var facebookConfig = {
    clientID     : 338818749860053,
    clientSecret : 'cefbff77745bcee7c83d08eed6517b98',
    callbackURL  : 'http://localhost:3100/user'
  };
  passport.use(
    new FacebookStrategy(facebookConfig, facebookStrategy));

  function facebookStrategy(token, refreshToken, profile, done)
  {
    userModel
      .findUserByFacebookId(profile.id)
      .then(function(user) {
        if(user) { return done(null, user); } // already in db
        else { // if not, insert into db using profile info
          var names = profile.displayName.split(" ");
          var newFacebookUser = { lastName:  names[1],
            firstName: names[0],
            email:     profile.emails ? profile.emails[0].value:"",
            facebook: { id:    profile.id, token: token }
          };
          return userModel.createUser(newFacebookUser);
        }
      }) // ...next few slides...
      .then(function(user){
          return done(null, user);
        }
      );

  }


  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }


  function logout(req, res) {
    req.logOut();
    res.send(200);
  }


  function login(req, res) {
    res.json(req.user);
  }

  function localStrategy(usr, pass, done) {
    userModel
      .findUserByUsername(usr)
      .then(
        function(user) {
          if(user.username === usr && user.password == pass){
            return done(null, user);
          }else if (user.username === usr &&bcrypt.compareSync(pass, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }

        }
      );
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(function(user){
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }

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

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

};
