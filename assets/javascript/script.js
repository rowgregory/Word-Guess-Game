// Global variables
// ===========================================

var selectableWords =           // create an array of words
    [
        "sonicthehedgehog",
        "shadow", 
        "knuckles", 
        "amy", 
        "tailsmilesprowers", 
        "drrobotnik",
        "eggman",
        "chaos",
        "infinite",
        "chaosemeralds",
        "sonicgenerations",
        "sonicunleashed",
        "sonicforces",
    ];
    
var wins = 0;                   // how many wins the player has racked up
var losses = 0;                 // tallies number of lossses
var guessesLeft = 12;           // guesses the user has left

var currentWord = "";           // left empty to store word
var videoGameLetters = [];      // empty array to store letters of currentWord
var numBlanks = 0;              // holds the number of "blanks"(where letters will pop up)
var wrongLtrs = [];             // empty array to store incorrect guesses
var answer = [];                // empty array to store users answer

// set out game sounds
//==============================================



// DOM manipulation 
// =============================================

window.onload = function() {
    document.getElementById("underscore").innerHTML = answer.join(" ");
    document.getElementById("remaining").innerHTML ="guesses remaing " + guessesLeft;
    document.getElementById("wins").innerHTML = "Wins: " + " "
     + wins;
    document.getElementById("losses").innerHTML = "Losses " + " " + losses;
    document.getElementById("guessed").innerHTML = "Choosen letters: " + " " + wrongLtrs;
    
}
                    
function beginGame() {
    // === uses Math floor to select word at random
    currentWord = selectableWords[Math.floor(Math.random() * selectableWords.length)];
        console.log(currentWord);

    // === divide (split) randomWord into an individual letters and store it into videoGameletters
    videoGameLetters = currentWord.split("");
        console.log(videoGameLetters);

    // === obrtain number of letters in randomWord and store it into numBlanks
     numBlanks = videoGameLetters.length;
        console.log(numBlanks);

            guessesLeft = 12;
            wrongLtrs = [];
            answer = [];

        // === replace (push) the correct amount of letters in the randomWord with underscores 
        for (i=0; i < numBlanks; i++) {
            answer.push('_');
            // console.log(answer);
        }

        
    
    }


function compare(character) {

    // === determine if key choosen was in the alphabet
    if(event.keyCode >= 65 && event.keyCode <= 90) {

    // === check to see if letter is in randomWord
    var rightLetter = false;

    for(i=0; i < numBlanks; i++) {
        if(videoGameLetters[i] == character) {
            rightLetter = true;
            document.getElementById("ring").play();
            
        }
    }
    // === check where the letter is in the word
    if(rightLetter) {
        for( var i = 0; i < numBlanks; i++ ) {
            if(videoGameLetters[i] == character) {
                answer[i] = character;
                
            }
        }   
    }
    // === if it is not in the word
    else {
        document.getElementById("killed").play();
        wrongLtrs.push(character);
        guessesLeft--;
        
    }
}
console.log("This is the answer " + answer);
}

function rounds() {
    document.getElementById("eggMan").style.visibility = "hidden";
    //document.getElementById("giphy").style.visibility = "hidden";
    document.getElementById("mad").style.visibility = "hidden";
    document.getElementById("remaining").innerHTML = "Guesses remaining " + " " + guessesLeft;
    document.getElementById("underscore").innerHTML = answer.join(" ");
    document.getElementById("guessed").innerHTML = "Already used: " + " " + wrongLtrs.join(" ");
    

    if(videoGameLetters.toString() == answer.toString()) {
        wins++;
        
            
        //update wins
        document.getElementById("cash").play();
        document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
        document.getElementById("giphy").style.visibility = "visible";
        alert("You won");
        beginGame();   
        
    } else if (guessesLeft == 0) {
            losses++;
            document.getElementById("shield").play();
            document.getElementById("mad").style.visibility = "visible";
            alert("you lose!");
            beginGame();
       

        // Update the losses in the HTML document
        document.getElementById("losses").innerHTML = "Losses: " + " " + losses;
        
        
        // beginGame();
        document.getElementById("guessed").innerHTML = "Choosen letters:" + " " + wrongLtrs.join(" ");
    }

    
}






        
beginGame();

    
    document.onkeyup = function(event) {

    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
        console.log("User guess " + userGuess);

        compare(userGuess);
        rounds ();
        
        
    }



        
   

   




























    




