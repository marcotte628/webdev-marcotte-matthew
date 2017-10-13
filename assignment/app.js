// class notes.......

module.exports = function(app){
  // entry point for application

  //console.log("hello from app module");

  //implement user service
  require("./services/user.service.server")(app);
};
