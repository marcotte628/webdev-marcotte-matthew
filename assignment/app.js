// class notes.......

// being passed an instance of the app library
module.exports = function(app){
  // entry point for application

  //implement user service
  require("./services/user.service.server")(app);
  require("./services/website.service.server")(app);
  require("./services/page.service.server")(app);
  require("./services/widget.service.server")(app);
  require("./services/project.food.service.server")(app);
  require("./services/project.gym.service.server")(app);
  require("./services/project.store.service.server")(app);
  require("./services/project.user.service.server")(app);
  require("./services/project.workout.service.server")(app);

};
