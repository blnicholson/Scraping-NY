//require mongoose
var mongoose = require("mongoose");

//Save to Schema
var Schema = mongoose.Schema;

//Create CommentsSchema Object (similar to Sequelize)
var NewsSchema = new Schema({
  //Username
  title: {
    type: String,
    required: true,
    unique: true
    
  },
  summary: {
    type: String,
    required: true,
    unique: true
    
  },
  url: {
    type: String,
    required: true,
    unique: true
    
  },
  image: {
    type: String,
    required: true,
    unique: true
    
  },
  saved:{
    type: Boolean,
    default: false
},
  comment: {
      type:Schema.Types.ObjectId,
      ref: "Comments"

  }
});

//Create model from CommentsSchema
var News = mongoose.model("News", NewsSchema);

//Export Comments model
module.exports = News;
