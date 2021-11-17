var letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

var selectableWords =
  // create an array of words
  [
    {
      word: 'sonic the hedgehog',
      image: 'assets/images/sonic_giphy.gif',
    },
    {
      word: 'shadow',
      image: 'assets/images/shadow.gif',
    },
    {
      word: 'knuckles',
      image: 'assets/images/knuckles_gif.gif',
    },
    {
      word: 'amy',
      image: 'assets/images/amy_gif.gif',
    },
    {
      word: 'tails miles prower',
      image: 'assets/images/tails_gif.gif',
    },
    {
      word: 'eggman',
      image: 'assets/images/eggman_giphy.gif',
    },
    {
      word: 'infinite',
      image: 'assets/images/infinite_gif.gif',
    },
    {
      word: 'chaos emeralds',
      image: 'assets/images/chaosEmeralds_gif.gif',
    },
    {
      word: 'sonic generations',
      image: 'assets/images/sonic_generations_gif.gif',
    },
    {
      word: 'sonic unleashed',
      image: 'assets/images/sonic_unleashed_gif.gif',
    },
    {
      word: 'metal sonic',
      image: 'assets/images/metal_sonic_gif.gif',
    },
    {
      word: 'supersonic',
      image: 'assets/images/superSonic_giphy.gif',
    },
    {
      word: 'rouge the bat',
      image: 'assets/images/rouge_gif.gif',
    },
    {
      word: 'sonic forces',
      image: 'assets/images/sonicForces_gif.gif',
    },
    {
      word: 'sonic lost world',
      image: 'assets/images/sonicLostWorld.gif',
    },
  ];

var wins = 0;
var losses = 0;
var guessesLeft = 12;
var currentWord = '';
var currentImage = '';
var videoGameLetters = [];
var numBlanks = 0;
var wrongLtrs = [];
var answer = [];
var guessedLetter = '';
var letterBtn;

const underscores = document.getElementById('underscore');
const guessesRemaining = document.getElementById('remaining');
const totalWins = document.getElementById('wins');
const totalLosses = document.getElementById('losses');
const incorrectGuesses = document.getElementById('guessed');
const winSound = document.getElementById('cash');
const winImg = document.getElementById('winImage');
const loseSound = document.getElementById('shield');
const loseImg = document.getElementById('mad');

$(() => {
  $('[data-toggle="tooltip"]').tooltip();
});

const createKeyboard = () => {
  for (i = 0; i < letters.length; i++) {
    letterBtn = $('<button>');

    letterBtn.addClass('letter-button letter letter-button-color');
    letterBtn.attr('id', letters[i]);
    letterBtn.text(letters[i]);
    $('#buttons').append(letterBtn);
  }

  $('.letter-button').on('click', (e) => {
    guessedLetter = $(e.target).text().toLowerCase();
    determineCorrectLetter(guessedLetter.toLowerCase());
  });
};

const displayStats = () => {
  underscores.innerHTML = answer.join('');
  guessesRemaining.innerHTML = `Guesses remaing: ${guessesLeft}`;
  totalWins.innerHTML = `Wins: ${wins}`;
  totalLosses.innerHTML = `Losses: ${losses}`;
  incorrectGuesses.innerHTML = `Incorrect letters: ${wrongLtrs}`;
};

const getWordToGuess = (cb) => {
  var accessedIndex = Math.floor(Math.random() * selectableWords.length);
  currentWord = selectableWords[accessedIndex].word;
  currentImage = selectableWords[accessedIndex].image;

  videoGameLetters = currentWord.split('');

  for (var i = 0, j = videoGameLetters.length; i < j; i++) {
    if (videoGameLetters[i] === ' ') {
      answer.push(' ');
    } else {
      answer.push('_');
    }
  }

  return cb();
};

const determineCorrectLetter = (x) => {
  for (var i = 0; i < videoGameLetters.length; i++) {
    if (x === videoGameLetters[i]) {
      answer[i] = x;
      document.getElementById('ring').play();
    }
  }

  const wrongLetter = !(videoGameLetters.indexOf(x) > -1);

  if (wrongLtrs.includes(x)) {
    console.log('here');
    document.getElementById('killed').play();
  } else if (wrongLetter) {
    $(`#${x.toUpperCase()}`).addClass('darken');

    wrongLtrs.push(x);
    guessesLeft--;
    document.getElementById('killed').play();
  }
  updateScore();
};

const updateScore = () => {
  guessesRemaining.innerHTML = `Guesses remaining: ${guessesLeft}`;
  incorrectGuesses.innerHTML = `Incorrect letters: ${wrongLtrs.join(' ')}`;
  underscores.innerHTML = answer.join('');

  const userWon = videoGameLetters.toString() == answer.toString();

  if (userWon) {
    win();
  } else if (guessesLeft == 0) {
    lose();
  }
};

const win = () => {
  wins++;
  winSound.play();
  winImg.src = currentImage;
  winImg.style.visibility = 'visible';
  totalWins.innerHTML = `Wins: ${wins}`;
  $('#myModal').modal('show');
  $('.modal-title').text('You won!');
};

const lose = () => {
  losses++;
  loseSound.play();
  loseImg.style.visibility = 'visible';
  totalLosses.innerHTML = `'Losses: ${losses}`;
  $('#myModal').modal('show');
  $('.modal-title').text('You lost');
};

$('#reset').on('click', () => {
  const reset = () => {
    currentWord = '';
    currentImage = '';
    videoGameLetters = [];
    numBlanks = 0;
    wrongLtrs = [];
    answer = [];
    guessedLetter = '';
    guessesLeft = 12;

    underscores.innerHTML = answer.join('');
    guessesRemaining.innerHTML = `Guesses remaing: ${guessesLeft}`;
    totalWins.innerHTML = `Wins: ${wins}`;
    totalLosses.innerHTML = `Losses: ${losses}`;
    incorrectGuesses.innerHTML = `Choosen letters: ${wrongLtrs}`;

    $('button').each(() => {
      $('button').removeClass('darken');
    });

    return getWordToGuess(displayStats);
  };

  reset();
});

const start = () => {
  createKeyboard();
  getWordToGuess(displayStats);
};

start();
