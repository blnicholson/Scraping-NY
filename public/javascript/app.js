$(document).ready(function() {
  //Comment Form Modal shown on click Comment
  $(document).on("click", "#commentButton", function() {
    var commentId = $(this).attr("data-id");
    $("#modal1").modal("show");

    $.ajax({
      method: "GET",
      url: "/news/" + commentId
    });
    console.log(commentId);
  });

  $("#commentSubmit").on("click", function(event) {
    console.log("click");
    event.preventDefault();
    var commentId = $(this).attr("data-id");
    console.log(commentId);

    // $.ajax({
    //   method: "POST",
    //   url: "/news/" + commentId,
    //   data: {
    //     name: $("#name").val(),
    //     body: $("#text").val()
    //   }
    // }).then(function(data) {
    //   console.log("this is: " + data);
    // });
  });
  //Comment Show Modal shows on click show

  //Submit Comment

  //Show Comments
  $(document).on("click", "#showComments", function(event) {
    console.log("click");
    var commentId = $(this).data("data-id");
    $("#modal2").modal("show");

    $.ajax({
      method: "GET",
      url: "/news/" + commentId
    }).then(function(result) {
      console.log(result);
      if (result.comment) {
        $("#userComments").append("<p>" + $("#name").val(result.comment.name));
        $("#userComments").append("<p>" + $("#body").val(result.comment.body));
      }
    });
  });
}); //end doc.ready
