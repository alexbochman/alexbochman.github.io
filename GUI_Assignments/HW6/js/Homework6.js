/*
Alex Bochman
alexander_bochman@student.uml.edu

UMass Lowell Computer Science
COMP 4610 Section 201 - GUI I Programming
HW 6 - Creating an Interactive Dynamic Table
10/22/2020
*/




// Validation Plugin
// Check if its not empty and is a number
$().ready(function(){
   
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
        messages: {
            xStart: {
                required: "<b>Number</b> required!",
                number: "Please enter a valid <b>number</b>."
            },
            xEnd: {
                required: "<b>Number</b> required!",
                number: "Please enter a valid <b>number</b>."               
            },
            yStart: {
                required: "<b>Number</b> required!",
                number: "Please enter a valid <b>number</b>."
            },
            yEnd: {
                required: "<b>Number</b> required!",
                number: "Please enter a valid <b>number</b>."
            }
        }
      
    });
    
    //$("input").css("border-color", "red");
    
});

// Function initializes and calls all of the required
// functions to validate the input and then create 
// the table.
function generateTable() {
    // Initialization. Input captured from the form
    var xStart = document.getElementById('xStart').value;
    var xEnd = document.getElementById('xEnd').value;
    var yStart = document.getElementById('yStart').value;
    var yEnd = document.getElementById('yEnd').value;
    var temp = 0;

    // Initialization for inserting values.
    var inputX = document.getElementById("inputX");
    var inputY = document.getElementById("inputY");
    var table = document.getElementById("dynamicTable");
    var row = table.insertRow();
    var cell = row.insertCell();
    
    // Clear the table and any error messages
    table.innerHTML ="";
    inputX.innerHTML = "";
    inputY.innerHTML = "";
    
    if(!$("#myForm").valid()){
        return;
    }
    
    createTable(Math.round(xStart), Math.round(xEnd), Math.round(yStart), Math.round(yEnd), table, row, cell);
}

// Function creates table
// First creates X-Axis header, then in the
// nested for loop, the first cell of each 
// row is styled to denote the multiplicand column.
function createTable(xMin,xMax,yMin,yMax,table,row,cell){
    
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

