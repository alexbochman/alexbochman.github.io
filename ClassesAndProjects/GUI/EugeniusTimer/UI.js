

// TOGGLE THE NAV BAR (OPEN AND CLOSED)
var toggleState = "open";

function toggleNav() {

    if (toggleState == "open") {
        closeNav();
    }
    else if (toggleState == "closed") {
        openNav();

    }
}

// SET THE PROPERTIES AND STYLES WHEN THE NAV BAR OPENS
function openNav() {
    toggleState = "open";

    var img = document.getElementById("toggleIcon");
    img.setAttribute("class", "fas fa-angle-double-left");

    var extLinks = document.getElementsByClassName("fas fa-external-link-alt");
    for (var i = 0; i < extLinks.length; i++)
        extLinks[i].setAttribute("class", "fas fa-external-link-alt");


    document.getElementById("mySidenav").style.width = "200px";
    document.getElementById("main").style.marginLeft = "200px";
    document.getElementById("sideNavHeader").style.visibility = "visible";
    var x = document.getElementById("navList");
    var y = x.getElementsByTagName("A");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
    }
}

// SET THE PROPERTIES AND STYLES WHEN THE NAV BAR CLOSES
function closeNav() {
    toggleState = "closed";

    var img = document.getElementById("toggleIcon");
    img.setAttribute("class", "fas fa-angle-double-left rotated-icon");

    var extLinks = document.getElementsByClassName("fas fa-external-link-alt");
    for (var i = 0; i < extLinks.length; i++)
        extLinks[i].setAttribute("class", "fas fa-external-link-alt hide");

    document.getElementById("mySidenav").style.width = "50px";
    document.getElementById("main").style.setProperty("margin-left", "50px", "important");
    document.getElementById("sideNavHeader").style.visibility = "hidden";

    var x = document.getElementById("navList");
    var y = x.getElementsByTagName("A");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.visibility = "hidden";
    }

    var x = document.getElementById("navList");
    var y = x.getElementsByClassName("fas");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
    }

    var x = document.getElementById("navList");
    var y = x.getElementsByClassName("fab");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
    }

    var x = document.getElementById("navList");
    var y = x.getElementsByClassName("far");
    var i;
    for (i = 0; i < y.length; i++) {
        y[i].style.visibility = "visible";
    }
}

function activeTab(id) {
    var divid = document.getElementById(id);
    var divs = document.getElementsByClassName("tab");

    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = "#34527d";
    }

    divid.style.backgroundColor = "#44628d";
}

function newTab() {
    window.open(
        "https://github.com/alexbochman/VS-Saturn-3", "_blank");
}

// FUNCTIONS BELOW SHOWS THE CONTENT OF THE TAB WHEN CLICKED IN THE NAV BAR
// AND HIDES ALL OTHER CONTENT
function mediaToggle() {
    if (x.matches) { // If media query matches
        closeNav();
    } else {
        openNav();
    }
}

var x = window.matchMedia("(max-width: 800px)");
//mediaToggle(x); // Call listener function at run time
x.addListener(mediaToggle); // Attach listener function on state changes


function showhide(id) {
    if (document.getElementById(id)) {
        var divid = document.getElementById(id);
        var divs = document.getElementsByClassName("myHide");
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.display = "none";
        }
        divid.style.display = "block";
    }
    return false;
}


// UPDATES SECTION ===============================================================

function rotateChevron(id) {
    var chevron = document.getElementById(id);

    if (chevron.classList.contains("rotatedChevron"))
        chevron.setAttribute("class", "fas fa-chevron-right");
    else
        chevron.setAttribute("class", "fas fa-chevron-right rotatedChevron");
}
