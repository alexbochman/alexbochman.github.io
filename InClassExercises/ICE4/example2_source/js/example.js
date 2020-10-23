// Create variables for the welcome message
var greet = "Howdy ";
var name = "Alex";
var message = ", please check your order:";
// Concatenate the three variables above to create the welcome message
var welcome =  greet + name + message;

// Create variables to hold details about the sign
var sign = "Montague House";
var tiles = sign.length;
var subTotal = tiles * 5; //$5 for each tile
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
// Replace the content of that element with the personalized welcome message
var greetingMessage = document.getElementById('greeting');
greetingMessage.innerHTML = welcome;

// Get the element that has an id of userSign then update its contents
var userSign = document.getElementById('userSign');
userSign.innerHTML = sign;

// Get the element that has an id of tiles then update its contents
var tilesVal = document.getElementById('tiles');
tilesVal.innerHTML = tiles;

// Get the element that has an id of subTotal then update its contents
var subTotalVal = document.getElementById('subTotal');
subTotalVal.innerHTML = "$" + subTotal;

// Get the element that has an id of shipping then update its contents
var shippingVal = document.getElementById('shipping');
shippingVal.innerHTML = "$" + shipping;

// Get the element that has an id of grandTotal then update its contents
var grandTotalVal = document.getElementById('grandTotal');
grandTotalVal.innerHTML = "$" + grandTotal;