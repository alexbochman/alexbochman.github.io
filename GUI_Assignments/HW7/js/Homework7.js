/*
Alex Bochman
alexander_bochman@student.uml.edu

UMass Lowell Computer Science
COMP 4610 Section 201 - GUI I Programming
HW 7 - Adding jQuery UI
11/23/2020
*/

// Validation Plugin
// Check if its not empty and is a number
$(document).ready(function(){

    $( "#myForm" ).validate({

        rules: {
            xStart: {
                required: true,
                number: true
            },
            xEnd: {
                required: true,
                number: true
            },
            yStart: {
                required: true,
                number: true
            },
            yEnd: {
                required: true,
                number: true
            }
        },
        // Custom messages to be displayed when and if things go wrong
        messages: {
            xStart: {
                required: "<b>Number</b> between -50 & 50 required!",
                number: "Please enter a <b>valid number</b>."
            },
            xEnd: {
                required: "<b>Number</b> between -50 & 50 required!",
                number: "Please enter a <b>valid number</b>."               
            },
            yStart: {
                required: "<b>Number</b> between -50 & 50 required!",
                number: "Please enter a <b>valid number</b>."
            },
            yEnd: {
                required: "<b>Number</b> between -50 & 50 required!",
                number: "Please enter a <b>valid number</b>."
            }
        }

    });
});


// Btn generate_table
$("#genTableBtn").click(function(){
    $(document).ready(function(){
        (function(){
            genTable();
        })();
    });
});

$( function() {
    var tableTabs = $( "#tableTabs" ).tabs();
    tableTabs.on( "click", "span.ui-icon-close", function() {
        var tableSize = $("#tableTabs ul li").length;
        var panelId = $( this ).closest( "li" );
        var i = 0;

        // get the index of the tab that is being closed
        for(i = 0; i < tableSize; i++)
            if($("#tableTabs ul li")[i] == $( this ).closest( "li" )[0]) break;

        // call transferTables on index i and then refresh
        transferTables(i);
        $('#table' + ((tableSize-1))).remove();
        $("#tableTabs ul li")[tableSize - 1].remove();
        tableTabs.tabs( "refresh" );
    });
});

// Btn to delete all tabs
$("#deleteAllTabsBtn").click(function(){
    $(document).ready(function(){
        (function(){
            delteAllTabs();
        })();
    });
});

// Function initializes and calls all of the required
// functions to validate the input and then create 
// the table.
function genTable() {
    // Varibles table, x, y, row, cell, errorMessages
    var xMin = Math.round(document.getElementById("xStart").value);
    var xMax = Math.round(document.getElementById("xEnd").value);
    var yMin = Math.round(document.getElementById("yStart").value);
    var yMax = Math.round(document.getElementById("yEnd").value);

    // Check if form is valid
    if(!$("#myForm").valid()){
        return;
    }

    // Create table
    createTable(xMin,xMax,yMin,yMax);
}

// Function creates table and tab
// Will handle if user puts larger number first
// ex. starting num = 50, ending num is = -50
function createTable(xMin,xMax,yMin,yMax){
    var table = document.createElement('table');
    var row;
    var cell;
    
    // tab text: table input values
    var tableName = xMin +" "+ xMax +" "+ yMin +" "+ yMax;
    
    // tab text: table index
    var tabNum = $("div#tableTabs ul li").length;
    
    // tab text
    $("div#tableTabs ul").append("<li><a href=#table"+tabNum+">" + "# " + (tabNum + 1) + " " + tableName + "<span class='ui-icon ui-icon-close' role='presentation'></span> </li>");

    // Add classes to table, styled by bootsrap
    table.className = "table table-striped table-dark table-bordered table-wrapper";

    // Set table ID and append to table tabs
    table.setAttribute("id", "table"+tabNum);
    tableTabs.appendChild(table);

    $("div#tableTabs").tabs("refresh");

    //set the new tab as active
    $("div#tableTabs").tabs({ active: tabNum});

    // If the xStart input is > xEnd input, swap
    if(xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
    }

    // If the yStart input is > yEnd input, swap
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
    }

    var inputX = document.getElementById("inputX");
    var inputY = document.getElementById("inputY");
    inputX.innerHTML = "X-Axis Start = " + xMin + " |  X-Axis End = " + xMax;
    inputY.innerHTML = "Y-Axis Start = " + yMin + " |  Y-Axis End = " + yMax;

    row = table.insertRow();
    cell = row.insertCell();
    cell.innerHTML = "x";

    // Create X-Axis Header
    for (var i = xMin; i <= xMax; i++) {
        cell = row.insertCell();
        cell.innerHTML = i;
    }

    for (var i = yMin; i <= yMax; i++) {
        row = table.insertRow();
        // First cell for y header
        cell = row.insertCell();
        cell.innerHTML = i;
        for (var j = xMin; j <= xMax; j++) { 
            cell = row.insertCell();
            cell.innerHTML = j*i;
        }
    }
}

// dynamically updates the currently selected table on slider change
function updateTable(){

    // boolean for validation
    if($("#tableTabs ul li").length == 0) return;

    //grab variables from input fields
    var xMin = Math.round(document.getElementById('xStart').value);
    var xMax = Math.round(document.getElementById('xEnd').value);
    var yMin = Math.round(document.getElementById('yStart').value);
    var yMax = Math.round(document.getElementById('yEnd').value);

    // return if the input values aren't valid
    if(!$("#myForm").valid())
        return;


    //grab active tab name and tag
    var active = $("div#tableTabs").tabs("option", "active");
    var table = $("#table" + active)[0];
    var row;
    var cell;

    //Update tab text
    $("#tableTabs ul li")[active].firstChild.innerHTML = "#" + (active + 1) + " x: \(" +xMin +", "+ xMax +"\) y:\("+ yMin +", "+ yMax + "\) <span class='ui-icon ui-icon-close' role='presentation'></span> ";

    //refresh tabs
    $("div#tableTabs").tabs("refresh");

    // If the xStart input is > xEnd input, swap
    if(xMin > xMax) {
        temp = xMin;
        xMin = xMax;
        xMax = temp;
    }

    // If the yStart input is > yEnd input, swap
    if(yMin > yMax) {
        temp = yMin;
        yMin = yMax;
        yMax = temp;
    }

    var inputX = document.getElementById("inputX");
    var inputY = document.getElementById("inputY");
    inputX.innerHTML = "X-Axis Start = " + xMin + " |  X-Axis End = " + xMax;
    inputY.innerHTML = "Y-Axis Start = " + yMin + " |  Y-Axis End = " + yMax;

    table.innerHTML = "";
    row = table.insertRow();
    cell = row.insertCell();
    cell.innerHTML = "x";

    // Create X-Axis Header
    for (var i = xMin; i <= xMax; i++) {
        cell = row.insertCell();
        cell.innerHTML = i;
    }

    for (var i = yMin; i <= yMax; i++) {
        row = table.insertRow();
        // First cell for y header
        cell = row.insertCell();
        cell.innerHTML = i;
        for (var j = xMin; j <= xMax; j++) { 
            cell = row.insertCell();
            cell.innerHTML = j*i;
        }
    }
}

// Delete all tab button
function delteAllTabs(){
    $("div#tableTabs ul li").remove();
    $("table").remove();
}



// SLIDER ============================================================================

// xStart
$(document).ready(function(){
    $(function() {
        $("#xStartSlider").slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xStart" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });

    // xEnd
    $(function() {
        $("#xEndSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xEnd" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });

    // yStart
    $(function() {
        $( "#yStartSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yStart" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });

    // yEnd
    $(function() {
        $( "#yEndSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yEnd" ).val( ui.value );
                updateTable();
            },
            change: function( event, ui ) {
                updateTable();
            }
        });
    });
});

// jQuery when text input is changed slider updates. 
// Additionally updates the table dynamically

// xStartingNum
$("#xStart").change(function() {
    $("#xStartSlider").slider("value", $(this).val());
    updateTable();
});

// xEndingNum
$("#xEnd").change(function() {
    $("#xEndSlider").slider("value", $(this).val());
    updateTable();
});

// yStartingNum
$("#yStart").change(function() {
    $("#yStartSlider").slider("value", $(this).val());
    updateTable();
});

// yEndingNum
$("#yEnd").change(function() {
    $("#yEndSlider").slider("value", $(this).val());
    updateTable();
});


$(document).ready(function(){
    (function(){
        $("#tableTabs").tabs();
    });
});

// transfer table values from all tables to the right of tab that's
// being deleted
function transferTables(index){

    var tabArray = $('div#tableTabs ul li');
    var tab_count = $('div#tableTabs ul li').length - 1;

    for(var i = index; i < tab_count; i++){
        tabArray[i].firstChild.innerHTML = "#" + (i + 1) + " " + tabArray[i+1].firstChild.textContent.substring(4) + "<span class='ui-icon ui-icon-close' role='presentation'></span> ";
        $('#table' + i)[0].innerHTML = $('#table' + (i+1))[0].innerHTML;
    }
}
