// ADD NEW ITEM TO END OF LIST

function newTail() {
    var one = document.getElementById("one");
    var ul = one.parentNode;
    var li = document.createElement("li");   
    li.appendChild(document.createTextNode("cream"));
    li.setAttribute("id", "five");
    ul.appendChild(li);
}

// ADD NEW ITEM START OF LIST
function newHead() {
    var one = document.getElementById("one");
    var ul = one.parentNode;
    var li = document.createElement("li");   
    li.appendChild(document.createTextNode("kale"));
    li.setAttribute("id", "zero");
    ul.insertBefore(li, one);
}


// ADD A CLASS OF COOL TO ALL LIST ITEMS
function addCoolClass() {
    document.getElementById("zero").classList.add("cool");
    document.getElementById("one").classList.add("cool");
    document.getElementById("two").classList.add("cool");
    document.getElementById("three").classList.add("cool");
    document.getElementById("four").classList.add("cool");
    document.getElementById("five").classList.add("cool");

}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
function addNumItems() { 
    var one = document.getElementById("one");
    var ul = one.parentNode;
    var numItems = ul.getElementsByTagName("li").length;

    var header = document.getElementsByTagName("h2")[0];
    header.innerHTML = header.innerHTML + "<span>" + numItems + "</span>";
}




// FUNCTION CALLS

window.onload = newTail();
window.onload = newHead();
window.onload = addCoolClass();
window.onload = addNumItems();