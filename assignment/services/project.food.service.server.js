const https = require("https");

module.exports = function(app) {

  var foodModel = require("../model/project-diet/project.diet.model.server");

  var FoodPosts = [
    {_id: "401", name: "chicken", type: "protein", userId: "012", protein: "43", carbs: "0", fats: "5" },
    {_id: "402", name: "lettuce", type: "vegetable", userId: "012", protein: "0", carbs: "1", fats: "0"  },
    {_id: "403", name: "mango", type: "fruit", userId: "012", protein: "3", carbs: "50", fats: "1"  },
    {_id: "404", name: "steak", type: "protein", userId: "012", protein: "40", carbs: "0", fats: "30" },
    {_id: "405", name: "fish", type: "protein", userId: "012", protein: "40", carbs: "0", fats: "30" }
  ];

  var FoodIDs = [
    {name: "chicken", _id: "05000"}, {name: "steak", _id: "23069"}, {name: "fish", _id: "15269"}, {name: "egg", _id: "01128"},
    {name: "beef", _id: "23502"}, {name: "lettuce", _id: "11253"}, {name: "asparagus", _id: "11012"}, {name: "squash", _id: "11490"},
    {name: "carrot", _id: "11124"}, {name: "green bean", _id: "11062"}, {name: "broccoli", _id: "11097"}, {name: "spinach", _id: "11459"},
    {name: "apple", _id: "09003"}, {name: "pear", _id: "09252"}, {name: "strawberry", _id: "09316"}, {name: "grape", _id: "09131"},
    {name: "pinapple", _id: 09266}, {name: "mango", _id: 09176}, {name: "blueberry", _id: 09050}, {name: "raspberry", _id: "09302"},
    {name: "white rice", _id: "20055"}, {name: "brown rice", _id: "20037"}, {name: "potato", _id: "11364"},
    {name: "sweet potato", _id: 11508}, {name: "bread", _id: 18967}, {name: "french fries", _id: "11412"},
    {name: "burger", _id: "21228"}, {name: "taco", _id: "21263"}
  ];

  //http://api.nal.usda.gov/ndb/nutrients/?ndbno=****ID****&format=json&api_key=vR2prVw9pN8TZTsVHb463Da3RoU8zm4PHBUvEUyN&nutrients=203&nutrients=205&nutrients=204


  app.get("/api/project/food/identifier", getFoodApiId);
  app.get("/api/project/food", getFoodPost);
  app.get("/api/project/food/:fid", getFoodPostById);
  app.post("/api/project/food", createFoodPost);
  app.put("/api/project/food/:fid", updateFoodPost);
  app.delete("/api/project/food/:fid", deleteFoodPost);
  app.get("/api/project/food/info/:fid", getFoodInformation);

 function getFoodApiId( req, res ) {
   var name = req.query["name"];
   if(name) {
     for(var i = 0; i < FoodIDs.length; i++) {
       if(FoodIDs[i].name === name) {
         var ret = FoodIDs[i];
       }
     }
     res.json(ret);
   }
 }
  function getFoodInformation(req, resp) {
    var fid = req.params["fid"];
    var urlStart = 'https://api.nal.usda.gov/ndb/nutrients/?ndbno=';
    var urlEnd = '&format=json&api_key=vR2prVw9pN8TZTsVHb463Da3RoU8zm4PHBUvEUyN&nutrients=203&nutrients=204&nutrients=205';
    var query = urlStart + fid + urlEnd;

    https.get(query, function(res) {
      res.setEncoding("utf8");
      var body = "";
      res.on("data", function(data) {
        body += data;
      });
      res.on("end", function() {
        body = JSON.parse(body);
        resp.send(body.report.foods[0].nutrients);
      });
    });


  }

  function getFoodPost( req, res ){
    var name = req.query["name"];
    var type = req.query["type"];
    var ret = [];
    if(name) {
      foodModel.findFoodByName(name).then(function(food){
        res.json(food);
      });


    } else if(type) {
      foodModel.findFoodByType(type).then(function(food){
        res.json(food);
      });

    } else {
      foodModel.findAllFoods().then(function(food){
        res.json(food);
      });
    }
  }

  function getFoodPostById( req, res ){
    var fid = req.params["fid"];
    foodModel.findFoodById(fid).then(function(food){
      res.json(food);
    });
  }

  function createFoodPost( req, res ){
    var newPost = req.body;
    foodModel.createFood(newPost).then(function(food){
     res.json(food);
    });
  }

  function updateFoodPost( req, res ){
    var fid = req.params["fid"];
    var body = req.body;
    foodModel.updateFood(fid, body).then(function(food){
      res.json(food);
    });
  }

  function deleteFoodPost( req, res ){
    var fid = req.params["fid"];
    foodModel.deleteFood(fid).then(function(rest){
      res.json(rest);
    });
  }

  function getAllIds() {
    var ids = [];
    for(var i = 0; i < FoodIDs.length; i++) {
      ids.push(FoodIDs[i]._id);
    }
    return ids;
  }

  function getFoodId(food){
    for(var i = 0; i < FoodIDs.length; i++) {
      if(FoodIDs[i].name === food ) {
        var ret = FoodIDs[i];
      }
    }
    if(ret){
      return ret._id;
    }else{
      return 0;
    }
  }

}
