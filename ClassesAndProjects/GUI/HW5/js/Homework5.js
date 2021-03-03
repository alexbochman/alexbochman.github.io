/*
Alex Bochman
alexander_bochman@student.uml.edu

UMass Lowell Computer Science
COMP 4610 Section 201 - GUI I Programming
HW 5 - Creating an Interactive Dynamic Table
10/22/2020
*/

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
    var table = document.getElementById("dynamicTable");
    var row = table.insertRow();
    var cell = row.insertCell();

    // Clear the table and any error messages
    table.innerHTML ="";
    xStartError.innerHTML = "";
    xEndError.innerHTML = "";
    yStartError.innerHTML = "";
    yEndError.innerHTML = "";

    // Check input validity, and display errors if necessary
    isValid(xStart, xStartError);
    isValid(xEnd, xEndError);
    isValid(yStart, yStartError);
    isValid(yEnd, yEndError);

    // Only create the table if all four input values are valid
    if (isValid(xStart, xStartError) 
        && isValid(xEnd, xEndError)
        && isValid(yStart, yStartError)
        && isValid(yEnd, yEndError)) {
        createTable(Math.round(xStart), Math.round(xEnd), Math.round(yStart), Math.round(yEnd), table, row, cell);
    }
    return;   
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

// Function to check input validity.
// Returns false and displays an error message if the input
// has no value, or is outside of the range -50 to 50.
function isValid(input, errorID) {
    errorID.innerHTML = "";
    if(isNaN(input) || input == "" || input > 50 || input < -50){
        errorID.innerHTML = "[INPUT ERROR] Please provide a number between -50 and 50.";
        return false;
    }
    return true;
}


