

var toggleState = "open";

function toggleNav() {
    
    if(toggleState == "open") {
        closeNav();
    }
    else if(toggleState == "closed") {
        openNav();
        
    }
}

function mediaToggle() {
    if (x.matches) { // If media query matches
        
    closeNav();
  } else {
    openNav();
  }
}

function openNav() {
    toggleState = "open";
    var img = document.getElementById("toggleIcon");
    img.setAttribute("class", "fas fa-angle-double-left");
    
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

function closeNav() {
    toggleState = "closed";
    var img = document.getElementById("toggleIcon");
    img.setAttribute("class", "fas fa-angle-double-left rotated-icon");
    
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
}

var x = window.matchMedia("(max-width: 800px)");
mediaToggle(x); // Call listener function at run time
x.addListener(mediaToggle); // Attach listener function on state changes


function showhide(id){
        if (document.getElementById(id)) {
            console.log(id);
          var divid = document.getElementById(id);
          var divs = document.getElementsByClassName("myHide");
          for(var i=0;i<divs.length;i++) {
             divs[i].style.display = "none";
          }
          divid.style.display = "block";
        } 
        return false;
 }










