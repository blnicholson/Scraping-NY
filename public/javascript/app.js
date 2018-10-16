$(document).ready(function () {
    //Comment Form Modal shown on click Comment
    $('#modal1')
        .modal("attach events", '#commentButton', 'show');

    //Comment Show Modal shows on click show
    $('#modal2')
    .modal("attach events", '#showComments', 'show');

    //Submit Comment
    $("#submit").on("submit", function(event){
        console.log("click")
        event.preventDefault();
        var commentId = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/news/" + commentId,
            data: {
                name: $("#name").val(),
                body: $("#text").val()
            }
        }).then(function (result) {
            console.log("this is: " + result);
        });
    })

    //Show Comments
    // $(document).on("click","#showComments", function(event){
    //     console.log("click")
    //     var commentId = $(this).data("data-id");
    //     $.ajax({
    //         method: "GET",
    //         url:"/news/" + commentId
    //     }).then(function(result){
    //         console.log(result);
    //     if (result.comment){
    //         $("#userComments").append("<p>" + $("#name").val(result.comment.name));
    //         $("#userComments").append("<p>" + $("#body").val(result.comment.body));
    //     }
    //     })
    // })
});//end doc.ready