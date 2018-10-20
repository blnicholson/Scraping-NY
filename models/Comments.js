//require mongoose
var mongoose = require("mongoose");

//Save to Schema
var Schema = mongoose.Schema;

//Create CommentsSchema Object (similar to Sequelize)
var CommentsSchema = new Schema({
  //Username
  body: {
    type: String,
    required: true
  }
});

//Create model from CommentsSchema
var Comments=mongoose.model("Comments", CommentsSchema);

//Export Comments model
module.exports = Comments;