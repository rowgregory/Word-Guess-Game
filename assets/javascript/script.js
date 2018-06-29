// Global variables
// ===========================================

var selectableWords =           // create an array of words
    [
        {
            word: "sonicthehedgehog", 
            image: "assets/images/sonic_giphy.gif",
        },
        {
            word: "shadow",
            image: "assets/images/shadow.gif",
        }, 
        {
            word: "knuckles",
            image:"assets/images/knuckles_gif.gif",
        }, 
        {
            word: "amy",
            image: "assets/images/amy_gif.gif",
        }, 
        {
            word: "tailsmilesprower",
            image: "assets/images/tails_gif.gif",
        }, 
        {
            word: "eggman",
            image: "assets/images/eggman_giphy.gif",
        },
        {
            word: "infinite",
            image: "assets/images/infinite_gif.gif",
        },
        {
            word: "chaoseemeralds",
            image: "assets/images/chaosEmeralds_gif.gif",
        },
        {
            word: "sonicgenerations",
            image: "assets/images/sonic_generations_gif.gif",
        },
        {
            word: "sonicunleashed",
            image: "assets/images/sonic_unleashed_gif.gif",
        },
        {
            word: "metalsonic",
            image: "assets/images/metal_sonic_gif.gif",
        
        },
        {
            word: "supersonic",
            image: "assets/images/superSonic_giphy.gif",
        },
        {
            word: "rougethebat",
            image: "assets/images/rouge_gif.gif",
        },
        {
            word: "sonicforces",
            image: "assets/images/sonicForces_gif.gif",
        },
        {
            word: "soniclostworld",
            image: "assets/images/sonicLostWorld.gif",
        },
      
    ];
    
var wins = 0;                   // how many wins the player has racked up
var losses = 0;                 // tallies number of lossses
var guessesLeft = 12;           // guesses the user has left

var currentWord = ""; 
var currentImage = "";          // left empty to store word
var videoGameLetters = [];      // empty array to store letters of currentWord
var numBlanks = 0;              // holds the number of "blanks"(where letters will pop up)
var wrongLtrs = [];             // empty array to store incorrect guesses
var answer = [];                // empty array to store users answer





// DOM manipulation 
// =============================================

window.onload = function() {
    document.getElementById("underscore").innerHTML = answer.join(" ");
    document.getElementById("remaining").innerHTML ="Guesses remaing: " + guessesLeft;
    document.getElementById("wins").innerHTML = "Wins: " + " "
     + wins;
    document.getElementById("losses").innerHTML = "Losses: " + " " + losses;
    document.getElementById("guessed").innerHTML = "Choosen letters: " + " " + wrongLtrs;
    
    
}
                    
function beginGame() {
    // === uses Math floor to select word at random
    
    var accessedIndex = Math.floor(Math.random() * selectableWords.length);
    currentWord = selectableWords[accessedIndex].word;
    currentImage = selectableWords[accessedIndex].image;

    // === divide (split) randomWord into an individual letters and store it into videoGameletters
    videoGameLetters = currentWord.split("");
        console.log(videoGameLetters);

    // === obtain number of letters in randomWord and store it into numBlanks
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
    
    document.getElementById("mad").style.visibility = "hidden";
    document.getElementById("winImage").style.visibility = "hidden";
    document.getElementById("remaining").innerHTML = "Guesses remaining: " + " " + guessesLeft;
    document.getElementById("underscore").innerHTML = answer.join(" ");
    document.getElementById("guessed").innerHTML = "Already used: " + " " + wrongLtrs.join(" ");
    

    if(videoGameLetters.toString() == answer.toString()) {
        wins++;
        
            
        //update wins
        document.getElementById("winImage").src=currentImage
        document.getElementById("cash").play();
        document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
        document.getElementById("winImage").style.visibility = "visible";
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



        
   

   




























    




