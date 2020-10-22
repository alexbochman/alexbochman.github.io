
function generateTable() {
    var xStart = document.getElementById('xStart').value;
    var xEnd = document.getElementById('xEnd').value;
    var yStart = document.getElementById('yStart').value;
    var yEnd = document.getElementById('yEnd').value;
    console.log(xStart);
    console.log(xEnd);
    console.log(yStart);
    console.log(yEnd);
    
    var test = document.getElementById('test');
    test.innerHTML = xStart + " " + xEnd + " " + yStart + " " + yEnd;
    
    for(xStart; xStart < xEnd; xStart++)
        console.log(xStart);
}
