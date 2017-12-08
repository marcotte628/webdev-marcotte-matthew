
module.exports = function(app) {

  var bcrypt = require("bcrypt-nodejs");
  var userModel = require("../model/project-user/project.user.model.server");
  var passport  = require('passport');
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;
  passport.use(new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.get("/api/project/user", getPerson);
  app.get("/api/project/user/:uid", getPersonById);
  app.post("/api/project/user", createAccount);
  app.put("/api/project/user/:uid", updateAccount);
  app.delete("/api/project/user/:uid", deleteAccount);
  app.post('/api/project/register', register);
  app.post('/api/project/login', passport.authenticate('local'), login);
  app.post('/api/project/loggedIn', loggedIn);
  app.post('/api/project/logout', logout);
  app.get("/api/project/getAllUsers", checkIsAdmin, getAllAccounts);
  app.get('/api/admin/isAdmin', isAdmin);
  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/#/profile',
      failureRedirect: '/#/login'
    }));

  var facebookConfig = {
    clientID     : 338818749860053,
    clientSecret : 'cefbff77745bcee7c83d08eed6517b98',
    callbackURL  : 'http://localhost:3100/auth/facebook/callback'
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

  function checkIsAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.username === 'admin') {
      next();
    } else {
      res.send(403);
    }
  }

  function isAdmin(req, res) {
    if(req.isAuthenticated() && req.user.username === 'admin') {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }


  function getAllAccounts(req, res) {
    userModel.findAllAccounts().then(function(users){
      res.json(users);
    });
  }
  function logout(req, res) {
    req.logOut();
    res.send(200);
  }

  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function login(req, res) {
    res.json(req.user);
  }

  function localStrategy(usr, pass, done) {
    userModel
      .findAccountByUsername(usr)
      .then(
        function(user) {
          // if to allow login on previous users without encrypted passwords
          if(user.username === usr && user.password == pass){
            return done(null, user);
            // if to allow new registered users to use encrypted passwords
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
      .createAccount(user)
      .then(function(user){
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }

  function getPerson(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    if(username && password){
      userModel.findAccountByCredentials(username, password).then(function (user) {
        res.json(user);
      });
    }else if(username){
      userModel.findAccountByUsername(username).then(function (user) {
        res.json(user);
      });
    }else{
      res.sendStatus(404);
    }
  }


  function getPersonById(req, res){
    var uid = req.params["uid"];
    userModel.findAccountById(uid).then(function (user) {
      res.json(user);
    });

  }

  function createAccount(req, res) {
    var newUser = req.body;
    userModel.createAccount(newUser).then(function (user) {
      res.json(user);
    });
  }

  function updateAccount(req, res) {
    var uid = req.params["uid"];
    var body = req.body;
    userModel.updateAccount(uid, body).then(function (user) {
      res.json(user);
    });
  }

  function deleteAccount(req, res) {
    var uid = req.params["uid"];
    userModel.deleteAccount(uid).then(function(rest){
      res.json(rest);
    });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findAccountById(user._id)
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
