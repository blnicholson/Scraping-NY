$(document).ready(function() {
//Enter Button
$(".enterButton").on("click", function(event){
  window.location.href= "/news";
})  
// //Scrape Button
//   $("#scrapeButton").on("click", function(event){
//      console.log("click");

//      $.ajax({
//        method:"GET",
//        url:"/scrape"
//      });
//      window.location.href("/news");
//   });



  //Saved Articles
  $("#news").on("click", function(event){
    console.log("click");
   
    $.ajax({
      method:"GET",
      url:"/savedNews"
    })
     window.location.href= "/savedNews"
  })

  //Save Articles
  $(".saveButton").on("click", function(event){
    console.log("click");
    var commentId=$(this).attr("data-id");
    console.log(commentId);

    $.ajax({
      method:"POST",
      url:"/savedNews/" + commentId
    }).then(function(results){
    });
  });

  //Comment Form Modal shown on click Comment
  $(".commentButton").on("click", function(event){ 
    event.preventDefault();
    var commentId = $(this).attr("data-id");
    console.log(commentId)
    
    $("#" + commentId).modal("show");
    console.log("click")
   
    $.ajax({
      method: "GET",
      url: "/news/" + commentId
    });
    
  });

  //Submit Button
 $(".submitComment").on("click",function(event){
   var commentId = $(this).attr("data-id");
  event.preventDefault();
  event.stopImmediatePropagation();
    console.log(commentId)
   $.ajax({
     method: "POST",
     url: "/news/" + commentId,
     data: {
     name: $("#name_"+ commentId).val(),
     body: $("#text_" + commentId).val()
   }
  }).then(function(result){
    console.log(result)
  }) 
 })
  
  
  //Show Comments
  $(".viewComment").on("click", function(event){
  var commentId = $(this).attr("data-id");
  $(".modal2").modal("show");

    $.ajax({
      method: "GET",
      url: "/news/" + commentId
    }).then(function(result) {
      console.log(result);
      
    });
  });

  //Unsave news from saved
  $(".unsaveNews").on("click", function (event) {
    console.log("delete article button is working");
    var deleteArticle = $(this).attr("data-id");
    $.ajax({
      method: "POST",
      url: "/deleteNews/" + deleteArticle
    }).then(function (data) {
      window.location = "/savedNews"
    })
  });

}); //end doc.ready
