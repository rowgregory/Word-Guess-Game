// Global variables
// ===========================================

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var selectableWords =           // create an array of words
    [
        {
            word: "sonic the hedgehog",
            image: "assets/images/sonic_giphy.gif",
        },
        {
            word: "shadow",
            image: "assets/images/shadow.gif",
        },
        {
            word: "knuckles",
            image: "assets/images/knuckles_gif.gif",
        },
        {
            word: "amy",
            image: "assets/images/amy_gif.gif",
        },
        {
            word: "tails miles prower",
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
            word: "chaos emeralds",
            image: "assets/images/chaosEmeralds_gif.gif",
        },
        {
            word: "sonic generations",
            image: "assets/images/sonic_generations_gif.gif",
        },
        {
            word: "sonic unleashed",
            image: "assets/images/sonic_unleashed_gif.gif",
        },
        {
            word: "metal sonic",
            image: "assets/images/metal_sonic_gif.gif",

        },
        {
            word: "supersonic",
            image: "assets/images/superSonic_giphy.gif",
        },
        {
            word: "rouge the bat",
            image: "assets/images/rouge_gif.gif",
        },
        {
            word: "sonic forces",
            image: "assets/images/sonicForces_gif.gif",
        },
        {
            word: "sonic lost world",
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
var letterClicked = '';

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

for (i = 0; i < letters.length; i++) {

    var letterBtn = $("<button>");

    letterBtn.addClass("letter-button letter letter-button-color");
    letterBtn.attr("data-letter", letters[i]);
    letterBtn.text(letters[i]);
    $("#buttons").append(letterBtn);
};

$(".letter-button").on("click", function () {
    letterClicked = $(event.target).text().toLowerCase();
    letterButtonClicked(letterClicked);

    var fridgeMagnet = $("<div>");

    fridgeMagnet.addClass("letter fridge-color");
    fridgeMagnet.text($(this).attr("data-letter"));
    $("answer").append(fridgeMagnet);
});

// DOM manipulation 
// =============================================

window.onload = function () {
    document.getElementById("underscore").innerHTML = answer.join("");
    document.getElementById("remaining").innerHTML = "Guesses remaing: " + guessesLeft;
    document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
    document.getElementById("losses").innerHTML = "Losses: " + " " + losses;
    document.getElementById("guessed").innerHTML = "Choosen letters: " + " " + wrongLtrs;
}

function beginGame() {

    $("#reset").hide();
    // === uses Math floor to select word at random
    var accessedIndex = Math.floor(Math.random() * selectableWords.length);
    currentWord = selectableWords[accessedIndex].word;
    currentImage = selectableWords[accessedIndex].image;

    // === divide (split) randomWord into an individual letters and store it into videoGameletters
    videoGameLetters = currentWord.split("");

    guessesLeft = 12;
    wrongLtrs = [];
    answer = [];

    for (var i=0, j=videoGameLetters.length; i < j; i++){
        // Put a space instead of an underscore between multi word "words"
        if (videoGameLetters[i] === " ") {
            answer.push(" ")
        } else {
            answer.push("_")
        }
    }
}

function letterButtonClicked(x) {

    x = x.toLowerCase();
    // === determine if key choosen was in the alphabet
    for (var i = 0; i < videoGameLetters.length; i++) { 		//scans through every letter in the array
        if (x === videoGameLetters[i]) {  				//if the letter that was clicked equals the letters of the random word
            answer[i] = x;
            document.getElementById("ring").play();				//then replace the blank space with the clicked letter
        }
    }
    $('#underscore').text(answer.join(' '));		//adds answer from letter arrary and displays it

    if (!(videoGameLetters.indexOf(x) > -1)) {			//if the word does not have the letter 
        document.getElementById("killed").play();
        wrongLtrs.push(x);
        guessesLeft--;
    }
    rounds();
    console.log("This is the answer " + answer);
}

function rounds() {

    document.getElementById("mad").style.visibility = "hidden";
    document.getElementById("winImage").style.visibility = "hidden";
    document.getElementById("remaining").innerHTML = "Guesses remaining: " + " " + guessesLeft;
    document.getElementById("underscore").innerHTML = answer.join("");
    document.getElementById("guessed").innerHTML = "Already used: " + " " + wrongLtrs.join(" ");

    if (videoGameLetters.toString() == answer.toString()) {
        wins++;

        //update wins
        document.getElementById("winImage").src = currentImage
        document.getElementById("cash").play();
        document.getElementById("wins").innerHTML = "Wins: " + " " + wins;
        document.getElementById("winImage").style.visibility = "visible";
        alert("You won");
        $("#reset").show();
        $('#myModal').modal('show');  

    } else if (guessesLeft == 0) {
        losses++;
        document.getElementById("shield").play();
        document.getElementById("mad").style.visibility = "visible";
        alert("you lose!");
        $("#reset").show();
        $('#myModal').modal('show');

        // Update the losses in the HTML document
        document.getElementById("losses").innerHTML = "Losses: " + " " + losses;
        document.getElementById("guessed").innerHTML = "Choosen letters:" + " " + wrongLtrs.join(" ");
    }
}

$('#reset').on('click', function () {

    beginGame();
});

beginGame();

document.keyCode = function (event) {

    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    console.log("User guess " + userGuess);

    compare(userGuess);
    rounds();
}