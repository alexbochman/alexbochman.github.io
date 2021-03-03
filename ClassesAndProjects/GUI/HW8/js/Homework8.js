/*
Alex Bochman
alexander_bochman@student.uml.edu

UMass Lowell Computer Science
COMP 4610 Section 201 - GUI I Programming
HW 8 - Scrabble
12/10/2020

USING TWO OF MY EXTENSION TOKENS TO SUBMIT ON 12/17
*/

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

//adapted from structure built by Ramon Meza provided by Professor Zhou
var tiles = [
    {"letter": "A", "points": 1, "amount": 9, "remain": 9, "image": "image/tiles/Scrabble_Tile_A.jpg"},
    {"letter": "B", "points": 3, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_B.jpg"},
    {"letter": "C", "points": 3, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_C.jpg"},
    {"letter": "D", "points": 2, "amount": 4, "remain": 4, "image": "image/tiles/Scrabble_Tile_D.jpg"},
    {"letter": "E", "points": 1, "amount": 12, "remain": 12, "image": "image/tiles/Scrabble_Tile_E.jpg"},
    {"letter": "F", "points": 4, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_F.jpg"},
    {"letter": "G", "points": 2, "amount": 3, "remain": 3, "image": "image/tiles/Scrabble_Tile_G.jpg"},
    {"letter": "H", "points": 4, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_H.jpg"},
    {"letter": "I", "points": 1, "amount": 9, "remain": 9, "image": "image/tiles/Scrabble_Tile_I.jpg"},
    {"letter": "J", "points": 8, "amount": 1, "remain": 1, "image": "image/tiles/Scrabble_Tile_J.jpg"},
    {"letter": "K", "points": 5, "amount": 1, "remain": 1, "image": "image/tiles/Scrabble_Tile_K.jpg"},
    {"letter": "L", "points": 1, "amount": 4, "remain": 4, "image": "image/tiles/Scrabble_Tile_L.jpg"},
    {"letter": "M", "points": 3, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_M.jpg"},
    {"letter": "N", "points": 1, "amount": 5, "remain": 5, "image": "image/tiles/Scrabble_Tile_N.jpg"},
    {"letter": "O", "points": 1, "amount": 8, "remain": 8, "image": "image/tiles/Scrabble_Tile_O.jpg"},
    {"letter": "P", "points": 3, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_P.jpg"},
    {"letter": "Q", "points": 10, "amount": 1, "remain": 1, "image": "image/tiles/Scrabble_Tile_Q.jpg"},
    {"letter": "R", "points": 1, "amount": 6, "remain": 6, "image": "image/tiles/Scrabble_Tile_R.jpg"},
    {"letter": "S", "points": 1, "amount": 4, "remain": 4, "image": "image/tiles/Scrabble_Tile_S.jpg"},
    {"letter": "T", "points": 1, "amount": 6, "remain": 6, "image": "image/tiles/Scrabble_Tile_T.jpg"},
    {"letter": "U", "points": 1, "amount": 4, "remain": 4, "image": "image/tiles/Scrabble_Tile_U.jpg"},
    {"letter": "V", "points": 4, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_V.jpg"},
    {"letter": "W", "points": 4, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_W.jpg"},
    {"letter": "X", "points": 8, "amount": 1, "remain": 1, "image": "image/tiles/Scrabble_Tile_X.jpg"},
    {"letter": "Y", "points": 4, "amount": 2, "remain": 2, "image": "image/tiles/Scrabble_Tile_Y.jpg"},
    {"letter": "Z", "points": 10, "amount": 1, "remain": 1, "image": "image/tiles/Scrabble_Tile_Z.jpg"}
];

//initialize global variables
var totalTiles = 100;
var currentScore = 0;

//one row of scrabble board
var boardTiles = [];
boardTiles[0] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/star.png"};
boardTiles[1] = { "letterMultiplier": 2, "wordMultiplier": 1, "image": "image/double_letter.jpg"};
boardTiles[2] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardTiles[3] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardTiles[4] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};
boardTiles[5] = { "letterMultiplier": 1, "wordMultiplier": 2, "image": "image/double_word.jpg"};
boardTiles[6] = { "letterMultiplier": 1, "wordMultiplier": 1, "image": "image/normal_space.jpg"};

// ============================================================================
// GAME INIT - BOARD AND RACK FUNCTIONS
// ============================================================================

// GAME INIT. Runs on page load
$().ready(function(){
    initBoard();
    initRack();  
});

function initBoard(){
	// clear inner html of the board
	document.getElementById("board").innerHTML = "";
	
    // Generate the tiles on the board row, and set the letter and word multipliers
    for(var i = 0; i < boardTiles.length; i++){
		
		$("#board").append("<img src=" + boardTiles[i].image + " wordMult=" + boardTiles[i].multiplier 
                           + " letterMult=" + boardTiles[i].letterMult 
                           + " points='0' space='0' location='99' height='85' class='drops dragBack' isLetter='false'/>");
	}

	//the helper is what allows for the return to work without wierdness
	$(".dragBack").draggable({
		disabled: true,
		helper: "clone",
		revert: true,
		revertDuration: 0
	});

	//this set's up each square with what is needed to allow a draggable to drop into it.
	$(".drops").droppable({
		tolerance: "intersect",
		accept: ".drags",
		disabled: false,
		drop: function(event, ui){
			//set the source image, points, and location in the array, as well as declare a letter there
			this.src = ui.draggable[0].src;
			this.setAttribute("points", ui.draggable[0].getAttribute("points"));
			this.setAttribute("location", ui.draggable[0].getAttribute("location"));
			this.setAttribute("isLetter", "true");
			
			//remove the dragged element so it doesn't leave a ghost of a tile on the rack
			$(this).draggable({
				disabled: false
			});

			$(this).droppable({
				disabled: true
			});
			ui.draggable.remove();

			if(!isValid()){
				document.getElementById("wordScore").innerHTML = "Word Score: 0";
				document.getElementById("currentWord").innerHTML = "Current Word: ";
				return false;
			}
		}
	});
    calculateScore();
}

function initRack() {
   //get pointer and generate random tiles
    document.getElementById("tileRack").innerHTML = "<br><br>";

    for(var i = 0; i < 7 && totalTiles > 6; i++){
        var index = Math.floor(Math.random() * 25);

        while(tiles[index].remain < 1)
            index = Math.round(Math.random() * 25);
        
        //add tiles to rack and remove them from the pool
        $("#tileRack").append("<img src=" + tiles[index].image 
                              + " points=" + tiles[index].points 
                              + " location=" + index +" height='75' class='drags' id= " 
                              + tiles[index].letter + ">");
        tiles[index].remain -= 1;
    }

    $(".drags").draggable({
        revert: true,
    });

    initBoard();
    totalTiles -= 7;
    document.getElementById("remainingTiles").innerHTML = "Remaining Tiles: " + totalTiles;
    document.getElementById("wordScore").innerHTML = "Word Score: 0";
    document.getElementById("currentWord").innerHTML = "Current Word: ";
    
    //setup the droppable state so that the rack can accept letters that were on the board.
	$("#tileRack").droppable({
		tolerance: "intersect",
		accept: ".dragBack",
		drop: function(event, ui){
			var location = ui.draggable[0].getAttribute("location");
			//adds the letter back into the rack
			$("#tileRack").append("<img src=" + tiles[location].image + " points=" + tiles[location].points + " location=" + location +" height='75' class='drags'/>");
			//resets it's draggability
			$(".drags").draggable({
				revert: true
			});

			//find which node was the one that was dragged
			var board = ui.draggable[0].parentNode;
			for(var i = 0; i < board.children.length; i++){
				if(board.children[i] == ui.draggable[0]){
					//once found reset the image, points, location, and the letters
					board.children[i].src = boardTiles[i].image;
					board.children[i].setAttribute("points", "0");
					board.children[i].setAttribute("location", "99");
					board.children[i].setAttribute("isLetter", "false");

					$(board.children[i]).draggable({
						disabled: true
					});

					$(board.children[i]).droppable({
						tolerance: "intersect",
						accept: ".drags",
						disabled: false
					});
					
					if(!isValid()){
						document.getElementById("wordScore").innerHTML = "word score: 0";
						document.getElementById("currentWord").innerHTML = "current word: ";
						return false;
					}
                    calculateScore();
					
				}
			}
		}
	});
    
}

function reset() {
    initBoard();
    for(var i = 0; i < tiles.length; i++)
		tiles[i].numLeft = tiles[i].numStart;
	
	totalTiles = 100;
	//player rack needs to be reset so that the tiles are actually re-drawn
	document.getElementById("tileRack").innerHTML = "<br><br>";
	initRack();
	document.getElementById("currentWord").innerHTML = "Current Word: ";
	document.getElementById("currentScore").innerHTML = "Total Score: 0";
	currentScore = 0;
}

function newLetters() {
    //finds the letters on the board and adds them back into the bag
	var bag = document.getElementById("board").children;
	for(var i = 0; i < bag.length; i++){
		if(bag[i].getAttribute("location") != "99"){
			tiles[parseInt(bag[i].getAttribute("location"))].numLeft++;
			totalTiles++;
		}
	}
	//reset the board
	initBoard();

	//adds the letters left in the rack back into the bag
	var rack = document.getElementById("tileRack").children;
	for(i = 2; i < rack.length; i++){
		tiles[parseInt(rack[i].getAttribute("location"))].numLeft++;
		totalTiles++;
	}

	//reset the rack
	rack[0].parentNode.innerHTML = "<br><br>";

	//generate the rack
	initRack();
	return true;
}

// ============================================================================
// WORD FUNCTIONS
// ============================================================================

// iterate through all of the letter tiles on the board and add up the scores,
// while checking to see if the tile is a letter or word multiplier 
function calculateScore() {
    var board = document.getElementById("board");
	var wordScoreMult = 1;
	var tempScore = 0;
	var currentWord = "";
    
	for(var i = 0; i < board.children.length; i++){
		tempScore += parseInt(board.children[i].getAttribute("points"));

		if(parseInt(board.children[i].getAttribute("letterMultiplier")) == 2)
			tempScore += parseInt(board.children[i].getAttribute("points"));

		if(board.children[i].getAttribute("isLetter") == "true")
			wordScoreMult *= board.children[i].getAttribute("wordMultiplier");

		if(board.children[i].getAttribute("isLetter") == "true")
			currentWord += tiles[parseInt(board.children[i].getAttribute("location"))].letter;
	}
    
	//afterwards multiply the total score by the word score mult
	tempScore = tempScore * wordScoreMult;
	document.getElementById("wordScore").innerHTML = "Word Score: " + currentScore;
	document.getElementById("currentWord").innerHTML = "Current Word: " + currentWord;
	return tempScore;
}

function isValid() {
    var lastLetter = 0;
	var totalLetters = 0;
	var children = document.getElementById("board").children;
	//finds the number of letters and the last letter
	for(var i = 0; i < children.length; i++){
		if(children[i].getAttribute("isLetter") == "true"){
			lastLetter = i;
			totalLetters++;
		}
	}
	//if any letter before hte last letter is not a letter return false
	for(i = 0; i < lastLetter; i++)
		if(children[i].getAttribute("isLetter") == "false")
			return false;

	if(totalLetters < 2)
		return false;

	return true;
}

//submits the word, updates the score
function submitWord(){
   
	if(!isValid()){
		return false;
	}else {
        initRack();
        
    }
		
	return true;
}