
module.exports = function(app) {

  var FoodPosts = [
    {_id: "401", name: "chicken", type: "protein", userId: "012", protein: "43", carbs: "0", fats: "5" },
    {_id: "402", name: "lettuce", type: "vegetable", userId: "012", protein: "0", carbs: "1", fats: "0"  },
    {_id: "403", name: "mango", type: "fruit", userId: "012", protein: "3", carbs: "50", fats: "1"  }
  ];

  var FoodIDs = [
    {name: "chicken", _id: 05000}, {name: "steak", _id: 23069}, {name: "fish", _id: 15269}, {name: "egg", _id: 01128},
    {name: "beef", _id: 23502}, {name: "lettuce", _id: 11253}, {name: "asparagus", _id: 11012}, {name: "squash", _id: 11490},
    {name: "carrot", _id: 11124}, {name: "green bean", _id: 11062}, {name: "broccoli", _id: 11097}, {name: "spinach", _id: 11459},
    {name: "apple", _id: 09003}, {name: "pear", _id: 09252}, {name: "strawberry", _id: 09316}, {name: "grape", _id: 09131},
    {name: "pinapple", _id: 09266}, {name: "mango", _id: 09176}, {name: "blueberry", _id: 09050}, {name: "raspberry", _id: 09302},
    {name: "white rice", _id: 20055}, {name: "brown rice", _id: 20037}, {name: "potato", _id: 11364},
    {name: "sweet potato", _id: 11508}, {name: "bread", _id: 18967}, {name: "french fries", _id: 11412},
    {name: "burger", _id: 21228}, {name: "taco", _id: 21263}
  ];

  // query for protein, carbs, fats
  //http://api.nal.usda.gov/ndb/nutrients/?ndbno=****ID****&format=json&api_key=vR2prVw9pN8TZTsVHb463Da3RoU8zm4PHBUvEUyN&nutrients=203&nutrients=205&nutrients=204

 app.get("/api/project/food", getFoodPost);
 app.get("/api/project/food/:fid", getFoodPostById);
 app.post("/api/project/food", createFoodPost);
 app.put("/api/project/food/:fid", updateFoodPost);
 app.delete("/api/project/food/:fid", deleteFoodPost);

  function getFoodPost( req, res ){
    var name = req.query["name"];
    if(name) {
      for(var i = 0; i < FoodPosts.length; i++) {
        if(FoodPosts[i].name === name) {
          var ret =  FoodPosts[i];
        }
      }
      res.json(ret);
    } else {
      res.json(FoodPosts);
    }
  }

  function getFoodPostById( req, res ){
    var fid = req.params["fid"];
    for(var i = 0; i < FoodPosts.length; i++) {
      if(FoodPosts[i]._id === fid) {
        var ret =  FoodPosts[i];
      }
    }
    res.json(ret);
  }

  function createFoodPost( req, res ){
    var newPost = req.body;
    newPost._id = '' + FoodPosts.length;
    FoodPosts.push(newPost);
    res.json(newPost);
  }

  function updateFoodPost( req, res ){
    var fid = req.params["fid"];
    var body = req.body;
    for(var i = 0; i < FoodPosts.length; i++) {
      if(FoodPosts[i]._id === uid) {
        FoodPosts[i]= body;
      }
    }
  }

  function deleteFoodPost( req, res ){
    var fid = req.params["fid"];
    for(var i = 0; i < FoodPosts.length; i++) {
      if(FoodPosts[i]._id !== fid ) {
        FoodPosts.splice(i, 1);
      }
    }
    res.json(FoodPosts);
  }


  function getFoodById(req, res){
    var fid = req.params["fid"];
    var resp = getFoodInformation(fid);
    res.json(resp);
  }

  function getAllFoods(req, res) {
    var ids = getAllIds();
    var ret = [];
    ids.forEach(function(id) {
      ret.push(getFoodInformation(id));
    });
    res.json(ret);
  }

  function getFoodInformation(id) {
    var urlStart = 'http://api.nal.usda.gov/ndb/nutrients/?ndbno=';
    var urlEnd = '&format=json&api_key=vR2prVw9pN8TZTsVHb463Da3RoU8zm4PHBUvEUyN&nutrients=205&nutrients=204&nutrients=208';
    var query = urlStart + id + urlEnd;
    $.ajax({
      url: query,
      success: function (resp) {
        return resp;
      }
    })
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
