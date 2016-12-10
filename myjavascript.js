/* 
    Author : Ravy Thok                                      
    Email : ravy_thok@student.uml.edu                             
    School : UMass Lowell                                        
    Course : COMP 4610 - GUI Programming I                       
    Assignment :  No.9: Implementing a Bit of Scrabble with Drag-and-Drop    
    Filename: myjavascript.js
 */

//Creating the Scrabble tiles
var tiles = [];
    tiles["A"] = {"value": 1, "amount": 9, "inplay": 9, "image": "A.jpg"};
    tiles["B"] = {"value": 3, "amount": 2, "inplay": 2, "image": "B.jpg"};
    tiles["C"] = {"value": 3, "amount": 2, "inplay": 2, "image": "C.jpg"};
    tiles["D"] = {"value": 2, "amount": 4, "inplay": 4, "image": "D.jpg"};
    tiles["E"] = {"value": 1, "amount": 12, "inplay": 12, "image": "E.jpg"};
    tiles["F"] = {"value": 4, "amount": 2, "inplay": 2, "image": "F.jpg"};
    tiles["G"] = {"value": 2, "amount": 3, "inplay": 3, "image": "G.jpg"};
    tiles["H"] = {"value": 4, "amount": 2, "inplay": 2, "image": "H.jpg"};
    tiles["I"] = {"value": 1, "amount": 9, "inplay": 9, "image": "I.jpg"};
    tiles["J"] = {"value": 8, "amount": 1, "inplay": 1, "image": "J.jpg"};
    tiles["K"] = {"value": 5, "amount": 1, "inplay": 1, "image": "K.jpg"};
    tiles["L"] = {"value": 1, "amount": 4, "inplay": 4, "image": "L.jpg"};
    tiles["M"] = {"value": 3, "amount": 2, "inplay": 2, "image":"M.jpg"};
    tiles["N"] = {"value": 1, "amount": 6, "inplay": 6, "image": "N.jpg"};
    tiles["O"] = {"value": 1, "amount": 8, "inplay": 8, "image": "O.jpg"};
    tiles["P"] = {"value": 3, "amount": 2, "inplay": 2, "image": "P.jpg"};
    tiles["Q"] = {"value": 10, "amount": 1, "inplay": 1, "image": "Q.jpg"};
    tiles["R"] = {"value": 1, "amount": 6, "inplay": 6, "image": "R.jpg"};
    tiles["S"] = {"value": 1, "amount": 4, "inplay": 4, "image": "S.jpg"};
    tiles["T"] = {"value": 1, "amount": 6, "inplay": 6, "image": "T.jpg"};
    tiles["U"] = {"value": 1, "amount": 4, "inplay": 4, "image": "U.jpg"};
    tiles["V"] = {"value": 4, "amount": 2, "inplay": 2, "image": "V.jpg"};
    tiles["W"] = {"value": 4, "amount": 2, "inplay": 2, "image": "W.jpg"};
    tiles["X"] = {"value": 8, "amount": 1, "inplay": 1, "image": "X.jpg"};
    tiles["Y"] = {"value": 4, "amount": 2, "inplay": 2, "image": "Y.jpg"};
    tiles["Z"] = {"value": 10, "amount": 1, "inplay": 1, "image": "Z.jpg"};
    tiles["["] = {"value": 0, "amount": 2, "inplay": 2, "image": "Blank.jpg"};


//Array to hold the tiles in the players hand.
var currentLetters = [];

//Holds player's total score so far
var TotalScore = 0;

//Hold the word score before player plays or submit the word
var WordScore = 0;

//Runs when webpage is loaded buildRack() function runs
$(document).ready(function(){

    //Builds the initial playerRack
    buildRack();

    //Make the gameboard able to accept the players tiles.
    $(".boardspace").droppable({ drop: tileDropped, out:tileMoved});


});

// function creates a 7 new tile letters that the user can drag
function buildRack(){
    
    var tileImage, id, title;
    var tilesMAX = 7;
    var count = 1;
    
    // clearing table
    $('#lettertbl').empty();

    for( var i = 0; count <= tilesMAX; i++){
        
        // newTile is set to a random number
        var newTile = randomLetter();
        $('#lettertbl').append("<tr>");

        //Check if tile has any remaining and check if there is any tiles left in the board
        //If no tiles left then quit trying to add.
        if( tiles[newTile]["inplay"] !== 0){
            currentLetters[count] = {"letter" : newTile,
                                    "value" : tiles[newTile]["value"],
                                    "image" : tiles[newTile] ["image"]};
            
            //subtract number of tiles pieces that are still in play
            tiles[newTile]["inplay"]--;
            
            id = "tile" + count;
            title = newTile;
            tileImage = tiles[newTile]["image"];
            
            // appending a new column for each letter with tile image
            $('#lettertbl').append("<td><img id='" + id 
                                    + "' class = letterTile src= '" + tileImage 
                                    + "' title = '" + title + "' ></td>");
            count++;
        }
        
        //boardspace accepts letterTile to be dropped
        $(".boardspace").droppable({accept: ".letterTile"});
        
        //letterTile are draggable
        $(".letterTile").draggable({snap: ".boardspace", snapMode: "inner"});
        
    }
    
    // closing lettertble row
    $('#lettertbl').append("</tr>");
    
    //displays all scores
    displayScores();
}

// function picks a a random number between 1-27 which is then converted 
// to a letter A-Z or [ for blank letter
function randomLetter(){
    
    randomNUM = (Math.floor((Math.random() * 27)));
    return (String.fromCharCode(65 + randomNUM));
}

// function calculate the wordscore as tile being are being dragged 
// and dropped onto the boardspace
function tileDropped(event, ui){

    if($(this).attr("title") === 'regular'){
        WordScore += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ]  );
    }
    else if($(this).attr("title") === 'doubleletter'){
        WordScore += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2);
    }
    else if($(this).attr("title") === 'tripleletter'){

        WordScore += (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    displayScores();
}

// function calculate the wordscore as tile that are dropped on the 
// boardspace are being moved 
function tileMoved(event, ui){

    if($(this).attr("title") === 'regular'){
        WordScore -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if($(this).attr("title") === 'doubleletter'){
        WordScore -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if($(this).attr("title") === 'tripleletter'){

        WordScore -= (tiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    displayScores();
}

//reset WordScore to 0 and get new letters
function resetHand(){
    WordScore = 0;
    
    displayScores();
    buildRack();
}

//rest game by restoring all scores to 0 and getting new letters
function resetGame(){

    TotalScore = 0;
    WordScore = 0;
    
    displayScores();
    buildRack();
}

//displays the current WordScore and TotalScore
function displayScores(){
$('#wordScore').text(WordScore);
$('#totalScore').text(TotalScore);
}

// updates and displays the totalscore when the user wants to submit a word
// resets WordScore to 0 and give user new letters
function submitWord(){
    
    TotalScore = TotalScore + WordScore;
    WordScore = 0;
    
    displayScores();
    buildRack();
}