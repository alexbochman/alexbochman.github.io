$(function() {
    
    const $backgroundColor = $("#one").css("background-color");
    
    $("ul:last-child").append("<p>" + $backgroundColor + "</p>");
    
    $("li").css({
        "background-color": "#c5a996", 
        "border": "solid white 1px",
        "color": "black",
        "text-shadow": "none",
        "font-family": "georgia"
    });
});