var winners = [[1,2,3], [4,5,6], [7,8,9], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
var compareArrays = []
var myArray = document.querySelectorAll(".thumbnail");

//vvv     below are your user profiles(objects/hashes). They store who's turn it is, the image for each player and the location each player has clicked.
var per1 = {
	image: "x.jpg",
	turn: true,
	turns: []
};

var per2 = {
	image: "o.jpg",
	turn: false,
	turns: []
};

var results1 = per1.turns.sort().map(Number);
var results2 = per2.turns.sort().map(Number);

/*vvv Adds a id="taken" to the tiles that have been used. vvv */
var tileRecorder = function(tile){
	tile.querySelector("img").setAttribute("id","taken");		
};

//vvv     Below changes the image on the board. Determines who's turn it is. And records the locations clicked in the object arrays     vvv 

var taketurn = function(tile) {
	// who's turn
	if (per1.turn && tile.querySelector("img", "src", "blank.jpg")){
		tile.querySelector("img").setAttribute("src",per1.image);
		per1.turns.push(tile.id);
		per1.turn = false;
		per2.turn = true;
	} else if (per1.turn && tile.querySelector("img", "src", "blank.jpg")){
		tile.querySelector("img").setAttribute("src",per2.image);
		per2.turns.push(tile.id);
		per2.turn = false;
		per1.turn = true;
	} else {
		console.log("That tile has already been used.")
	}
};

//vvv    anything you want to happen during the click needs to go in here.    vvv
var selectItem = function( event ){
	// console.log("something happened");
	taketurn(this);
	weHaveaWinner();
	tileRecorder(this);
};

// vvv     This is tha actual event listener, it calls the selectItem function.     vvv
for (i = 0; i < myArray.length; i++){
	myArray[i].addEventListener("click", selectItem);
}





//vvv     .equals will compare 2 arrays for a win     vvv
Array.prototype.equals = function (array) {
    if (!array)
        return false;
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
};


//vvv     checks to see if the locations match up to a win
var results1 = per1.turns.sort(Number);
var results2 = per2.turns.sort(Number);
var win = false;

var weHaveaWinner = function (){
	var results1 = per1.turns.sort().map(Number);
	var results2 = per2.turns.sort().map(Number);

	for (var i = 0; i < winners.length; i++) {
		if(winners[i].equals(results1)){
			console.log("Player 1 wins!");
			win = true;

		} else if (winners[i].equals(results2)){
			console.log("Player 2 wins!");
			win = true;

		} else if ((results2.length + results1.length) >= 9 && win === false){
			console.log("Tie!!!");
		}
	}

};

var resetButton = function () {
	for (var i = 0; i < myArray.length; i++) {
		per1.turns = [];
		per2.turns = [];
		win = false;

		myArray[i].querySelector("img").setAttribute("src", "blank.jpg");
	}
};


// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            return false;   
        }           
    }       
    return true;
};

var initialize = function(){

	document.querySelector("#reset").addEventListener("click",resetButton);
};

window.onload=initialize;
