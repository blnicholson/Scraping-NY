//Requiring npm packages
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = process.env.PORT || 8080;

//Initializing Express
var app = express();

//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Public static folder
app.use(express.static("public"));

//Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(logger("dev"));
//Routes
require("./routes/scrapingRoutes.js")(app)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrapedNewsdb";
mongoose.connect(MONGODB_URI);
  

//Connecting to MongoDB


//Starting Server
app.listen(PORT, function () {
  console.log("Connection Successful! App is running on port " + PORT + ".");
});

module.exports=app;
