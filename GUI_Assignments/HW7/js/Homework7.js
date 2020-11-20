/*
Alex Bochman
alexander_bochman@student.uml.edu

UMass Lowell Computer Science
COMP 4610 Section 201 - GUI I Programming
HW 6 - Adding jQuery to Interactive Dynamic Table
10/29/2020
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

    //$("input").css("border-color", "red");

});


// Btn generate_table
$("#genTableBtn").click(function(){
    $(document).ready(function(){
        (function(){
            genTable();
        })();
    });
});

// Close icon: removing the tab on click
// Used example from https://jqueryui.com/tabs/
$( function() {
    var tableTabs = $( "#tableTabs" ).tabs();
    tableTabs.on( "click", "span.ui-icon-close", function() {
        var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
        $( "#" + panelId ).remove();
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

    //Create tab and link to table
    var tableName = xMin +" "+ xMax +" "+ yMin +" "+ yMax;
    var tabNum = $("div#tableTabs ul li").length;
    $("div#tableTabs ul").append("<li><a href=#table"+tabNum+">" + tableName + "<span class='ui-icon ui-icon-close' role='presentation'></span> </li>");

    // Add classes to table, styled by bootsrap
    table.className = "table table-striped table-dark table-bordered table-wrapper";

    // Set table ID and append to table tabs
    table.setAttribute("id", "table"+tabNum);
    tableTabs.appendChild(table);

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


