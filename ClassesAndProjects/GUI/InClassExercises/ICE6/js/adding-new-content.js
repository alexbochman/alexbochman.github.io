$(function() {
	
    $("ul").before("<p>Just Updated</p>");

    $("li.hot").prepend('+ ');

    const $myItem = $("<li><em>gluten-free soy sauce</em></li>");
    $("ul:last-child").after($myItem);
    
});