var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
var compareArrays = [];
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


//vvv     Below changes the image on the board. Determines who's turn it is. And records the locations clicked in the object arrays     vvv 
var taketurn = function(tile) {

	var test = tile.querySelector("img").getAttribute("src");
	if (test == "x.jpg" || test == "o.jpg") {
  		return;
	}
	// who's turn
	if (per1.turn/* && tile.querySelector("img", "src", "blank.jpg")*/){
		tile.querySelector("img").setAttribute("src",per1.image);
		per1.turns.push(tile.id);
		per1.turn = false;
		per2.turn = true;
	} else {
		tile.querySelector("img").setAttribute("src",per2.image);
		per2.turns.push(tile.id);
		per2.turn = false;
		per1.turn = true;
	}
};

//vvv    any function you want to happen during the click needs to go in here.    vvv
var selectItem = function( event ){
	// console.log("something happened");
	taketurn(this);
	weHaveaWinner();
	// tileRecorder(this);
};

// vvv     This is tha actual event listener, it calls the selectItem function as long as the src="blank.jpg"    vvv
for (i = 0; i < myArray.length; i++){
	if (myArray[i].querySelector("img", "src", "blank.jpg")){
		myArray[i].addEventListener("click", selectItem);
	} else {
		console.log("Already taken, dummy");
	}
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



var weHaveaWinner = function (){
	var results1 = per1.turns.sort().map(Number);
	var results2 = per2.turns.sort().map(Number);

	for (var i = 0; i < winners.length; i++) {
		if(winners[i].equals(results1)){
			alert("Player 1 wins!");
			win = true;

		} else if (winners[i].equals(results2)){
			alert("Player 2 wins!");
			win = true;

		} else if ((results2.length + results1.length) >= 9 && win === false){
			console.log("Tie!!!");
		}
	}

};
/* finding a winner in more than 3 moves. Maybe you push the current possible wins into another array and check the values off from there
//Iterate over the possible moves array and see if that move is in any of the possible wins. If index = then return true. if 

// if theres an index from the play?
var winners = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
var iPlayed = [0, 1, 2];
var taco = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];

var checKer = function(){
	for (var i = 0; i < winners.length; i++) {

		for (var x = 0; x < winners[i].length; x++) {
			if (iPlayed[x] === winners[i][x] && false){
				taco.splice(i,1, true);
			} else {
				return;
			}
		}
	}
};
checKer();
console.log(taco);
if (taco[0] && taco[1] && taco[2]){
	console.log("Player Wins!");
} else if (taco[3] && taco[4] && taco[5]){
	console.log("Player Wins!");
} else if (taco[1] && taco[4] && taco[7]){
	console.log("Player Wins!");
} else if (taco[6] && taco[7] && taco[8]){
	console.log("Player Wins!");
} else if (taco[0] && taco[3] && taco[6]){
	console.log("Player Wins!");
} else if (taco[2] && taco[5] && taco[8]){
	console.log("Player Wins!");
} else if (taco[2] && taco[4] && taco[6]){
	console.log("Player Wins!");
} else if (taco[0] && taco[4] && taco[8]){
	console.log("Player Wins!");
} else {
	console.log("4 moves is too much for me to handle.");
}

*/



var resetButton = function () {
	for (var i = 0; i < myArray.length; i++) {
		per1.turns = [];
		per2.turns = [];
		win = false;
		results1 = [];
		results2 = [];
		myArray[i].querySelector("img").setAttribute("src", "blank.jpg");
	}
};


// attach the .equals method to Array's prototype to call it on any array
// Array.prototype.equals = function (array) {
//     // if the other array is a falsy value, return
//     if (!array)
//         return false;
//     if (this.length != array.length)
//         return false;

//     for (var i = 0, l=this.length; i < l; i++) {
//         if (this[i] instanceof Array && array[i] instanceof Array) {
//             if (!this[i].equals(array[i]))
//                 return false;       
//         }           
//         else if (this[i] != array[i]) { 
//             return false;   
//         }           
//     }       
//     return true;
// };

var initialize = function(){

	document.querySelector("#reset").addEventListener("click",resetButton);
};

window.onload=initialize;
