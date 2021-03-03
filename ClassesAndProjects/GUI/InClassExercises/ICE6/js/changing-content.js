$(function() {

    $("li:contains(pine)").text("almonds");
    
    $("li:first").remove();
    
    $(".hot:nth-child(1)").html("<em>" + $(".hot:nth-child(1)").html() + "</em>");
    $(".hot:nth-child(2)").html("<em>" + $(".hot:nth-child(2)").html() + "</em>");
    $(".hot:nth-child(3)").html("<em>" + $(".hot:nth-child(3)").html() + "</em>");

});