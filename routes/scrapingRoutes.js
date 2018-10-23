var cheerio = require("cheerio");
var axios = require("axios");

//Requiring models
var db = require("../models");

module.exports = function(app) {
  //Route for index
  app.get("/", function(req, res) {
    res.render("index");
  });

  //Get route for scraping website
  app.get("/scrape", function(req, res) {
    //Getting body of html
    axios.get("http://www.gamespot.com/").then(function(response) {
      //Loading HTML into cheerios
      var $ = cheerio.load(response.data);

      $("div.media-body").each(function(i, element) {
        var gameNews = {};

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
        if (gameNews.summary === "") {
          gameNews.summary = "No Summary Available";
        }
        db.News.create(gameNews)
          .then(function(result) {
            console.log(result);
          })
          .catch(function(err) {
            console.log(err)
          });
          
      });
      // res.send("Scrape Complete!");
      res.redirect("/news");
    })
    .catch(function(err){
      console.log(err)
    })
  });

  //Route for getting all News from database
  app.get("/news", function(req, res) {
    db.News.find({})
      .then(function(results) {
        res.render("news", {
          data: results
        });
      })
      .catch(function(err) {
       console.log(err)
      });
  });

  //Route for getting News by id and populating its comments with it
  app.get("/news/:id", function(req, res) {
    console.log(req.params.id);
    db.News.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(results) {
        
        res.render("savedNews",{
          comment: results});
          console.log(results)
      })
      .catch(function(err) {
         console.log(err)
      });
  });

  //Route for saving and updating a comment
  app.post("/news/:id", function(req, res) {
    console.log(req.params.id);
    db.Comments.create(req.body)
      .then(function(results) {
        return db.News.findOneAndUpdate(
          { _id: req.params.id },
          { comment: results._id },
          { new: true }
        );
      })
      .then(function(results) {
        console.log(results);
        res.json(results);
      })
      .catch(function(err) {
        console.log(err);
       
      });
  });

  //Route to show saved articles
  app.get("/savedNews", function(req, res) {
    db.News.find({
      saved: true
    })
      .then(function(dbArticle) {
        res.render("savedNews", {
          savedNews: dbArticle
        });
      })

      .catch(function(err) {
         console.log(err)
      });
  });
  //Route for saving articles
  app.post("/savedNews/:id", function(req, res) {
    console.log(req.params.id);
    db.News.update({ _id: req.params.id }, { saved: true })
      .then(function(result) {
        res.redirect("/savedNews");
        
      })
      .catch(function(err) {
        console.log(err)
      });
  });

  //Route for unsaving an article
  app.post("/deleteNews/:id", function(req, res) {
    db.News.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        saved: false,
        notes: []
      }
    )

      .then(function(result) {
        res.json({
          success: true
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });
}; //End of module
