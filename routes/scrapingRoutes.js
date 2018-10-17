var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//Requiring models
var db = require("../models");

//Connecting to MongoDB
mongoose.connect(
  "mongodb://localhost/scrapeNewsdb",
  { useNewUrlParser: true }
);
module.exports = function(app) {
  //Get route for scraping website
  app.get("/", function(req, res) {
    res.render("index");
  });
  app.get("/scrape", function(req, res) {
    //Getting body of html
    axios.get("http://www.gamespot.com/").then(function(response) {
      //Loading HTML into cheerios
      var $ = cheerio.load(response.data);
      
      $("div.media-body").each(function(i, element) {
        var gameNews = {};
        // var results = {};

        gameNews.title = $(this)
          .children("h3.media-title")
          .text();
        gameNews.summary = $(this)
          .children("p")
          .text();
        gameNews.url = $(this)
          .parent()
          .attr("href");
        gameNews.image = $(this)
          .parent()
          .find("img")
          .attr("src");
        // gameNews[i] = results;

        if (gameNews.summary === "") {
          gameNews.summary = "No Summary Available";
        }
        db.News.create(gameNews)
        .then(function(dbNews){
          console.log(dbNews);
        })
        .catch(function(err){
          return res.json(err)
        })
      });
      // console.log("Articles: " + gameNews);
      // var articles = {
      //   data: gameNews
      // };
      res.send("Scrape Complete!");
    });
  });
 

  //Route for getting all News from database
  app.get("/news", function(req, res) {
    db.News.find({})
      .then(function(results) {
        res.render("index", {data: results});
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Route for getting News by id and populating its comments with it
  app.get("/news/:id", function(req, res) {
    db.News.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Route for saving and updating a comment
  app.post("/news/:id", function(req, res) {
    db.Comments.create(req.body)
      .then(function(results) {
        return db.News.findOneAndUpdate(
          { _id: req.params.id },
         {$push:  { comment: results._id }},
          { new: true }
        );
      })
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  //End of module
};
