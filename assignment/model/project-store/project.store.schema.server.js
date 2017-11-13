
// {_id: "201", name: "GNC", type: "nutrition", address: "123 J street" },

var mongoose = require('mongoose');

var ProjectStoreSchema = mongoose.Schema({
  name: String,
  type: String,
  address: String
}, {collection: 'projectStore'});

module.exports = ProjectStoreSchema;
