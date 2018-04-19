/*
 * Create a list that holds all of your cards
 */

let gameCardsFaces = ['fa-beer', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube',
  'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-beer', 'fa-bomb', 'fa-leaf', 'fa-bomb',
  'fa-bolt', 'fa-bicycle', 'fa-paper-plane', 'fa-cube'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function initGameCards() {
  gameCardsFaces = shuffle(gameCardsFaces);
  const gameCardElements = document.querySelectorAll('.card'); //get all card elements

  //loop through all the cards and set the face
  for (let i = 0; i < gameCardElements.length; i++) {
    // Removing all children from an card element
    let gameCard = gameCardElements[i];
    while (gameCard.firstChild) {
      gameCard.removeChild(gameCard.firstChild);
    }
    // show the cards
    // Adding card face
    let newFace = document.createElement('i');
    newFace.classList.add('fa', gameCardsFaces[i]);
    gameCard.appendChild(newFace);

    //remove classes  (for reseting game)
    gameCard.classList.remove('animated');
    gameCard.classList.remove('match');
    gameCard.classList.remove('show');
    gameCard.classList.remove('open');
    gameCard.classList.remove('rubberBand');
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let openCardsList = [];
let matchedCounter = 0;
let movesCounter = 0;
let starRating = 3;
let interval;
let timer = "0m 0s";

//Star rating levels
const threeStars = 15;
const twoStars = 20;
const oneStar = 25;

//Get the Moves element
const movesElement = document.querySelector('.moves');
//Get the Timer element
const timerElement = document.getElementById('timer');
// Get the modal
const modal = document.getElementById('myModal');
// Get the modal text
const modalText = document.getElementById('modal-text');
// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];
// Get the deck element
const deck = document.querySelector('.deck');
// Get the reset button element
const reset = document.querySelector('.restart');
// Get list of stars element
const stars = document.querySelector('.stars').children;
// Get the play again button element
const play = document.querySelector('.button');


//Displays stars based on current star rating (0-3)
function resetStarRating() {
  //loop through all the stars and set the icon
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i].firstChild;
    s.classList.remove('fa-star-o');
    s.classList.add('fa-star');
  }
}

//Set and Displays stars based on current star rating (0-3)
function setStarRating(starsNumber) {
  if (starsNumber === 2) {
    stars[2].firstChild.classList.remove('fa-star');
    stars[2].firstChild.classList.add('fa-star-o');
  } else if (starsNumber === 1) {
    stars[1].firstChild.classList.remove('fa-star');
    stars[1].firstChild.classList.add('fa-star-o');
  } else if (starsNumber === 0) {
    stars[0].firstChild.classList.remove('fa-star');
    stars[0].firstChild.classList.add('fa-star-o');
  }
}

//Calculates star rating based on the number of moves
function calculateStarRating(moves){
  if(moves < threeStars){
    return 3;
  } else if (moves >= threeStars && moves < twoStars){
    return 2;
  } else if (moves >= twoStars && moves < oneStar){
    return 1;
  } else {
    return 0;
  }
}

//Initiate the game
function initGame() {
  movesElement.innerText = movesCounter;
  timerElement.innerText = timer;
  initGameCards();
}

//Reset the counters, rating & time
function resetGame() {
  stopTimer();
  openCardsList = [];
  matchedCounter = 0;
  movesCounter = 0;
  starRating = 3;
  resetStarRating();
  timer = "0m 0s";
  timerElement.innerText = timer;
}

//Check if all the cards are matched
function gameOver() {
  return matchedCounter === 8;
}

//Clear open cards list list
function resetOpenCardsList() {
  openCardsList = [];
}

//Animate opening card
function pickCard(card) {
  card.classList.add('show');
  card.classList.add('open');
  card.classList.add('animated');
  card.classList.add('flip');
}

//Animate closing cards
function closeCards(card1, card2) {
  setTimeout(function() {
    card1.classList.add('flip');
    card1.classList.remove('shake');

    card2.classList.add('flip');
    card2.classList.remove('shake');
  }, 500);

  setTimeout(function() {
    card1.classList.remove('animated');
    card1.classList.remove('flip');
    card1.classList.remove('show');
    card1.classList.remove('open');

    card2.classList.remove('animated');
    card2.classList.remove('flip');
    card2.classList.remove('show');
    card2.classList.remove('open');
  }, 900);
}

//Add to open cards list
function addToOpenCardsList(card) {
  openCardsList.push(card);
}

//Check if two open cards match (return 'true')
function cardsMatch(card1, card2) {
  return card1.querySelector('i').className === card2.querySelector('i').className;
}

//Animate matched cards
function setMatchedCards(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  card1.classList.remove('flip');
  card2.classList.remove('flip');
  card1.classList.add('rubberBand');
  card2.classList.add('rubberBand');
}

//Animate cards not matched
function setNotMatchedCards(card1, card2) {
  card1.classList.remove('flip');
  card2.classList.remove('flip');
  card1.classList.add('shake');
  card2.classList.add('shake');
}

//Main logic, opening cards
function openCard(card) {

  //start timer on the pick of the very first card
  if(movesCounter === 0 && openCardsList.length === 0){
    startTimer();
  }

  // if two card are already opened do not pick any more
  if (openCardsList.length >= 2) {
    return;
  }

  //pick the card and proceed to check the current conditions
  pickCard(card);

  //if no cards opened alredy, open card and add to the list of open cards
  if (openCardsList.length === 0) {
    addToOpenCardsList(card);
  }
  //if one card already opened - open card and add to the list of open cards
  //then check if the card match
  else if (openCardsList.length === 1) {

    //opening two cards caounts as a one move
    movesCounter++;
    //update moves counter on page
    movesElement.innerText = movesCounter;
    //check star rating
    starRating = calculateStarRating(movesCounter);
    //update star rating on page (display correct number of stars)
    setStarRating(starRating)

    addToOpenCardsList(card);

    //if cards match - mark them
    setTimeout(function() {
      if (cardsMatch(openCardsList[0], openCardsList[1])) {

        setMatchedCards(openCardsList[0], openCardsList[1]);

        matchedCounter++;
        //Check if it was last pair of cards (game over)
        if (gameOver()) {
          stopTimer();
          setTimeout(function() {
          modalText.innerText =  'You made it in ' + movesCounter + ' moves ! It took ' + timer + ' of time! Your Star Rating is: ' + starRating;
          modal.classList.toggle("opened");
          }, 500);
        }

      } else {
        setNotMatchedCards(openCardsList[0], openCardsList[1]);
        closeCards(openCardsList[0], openCardsList[1]);
      }
      resetOpenCardsList();
    }, 800);
  }
}

//function checking if the card is opened
function isCardOpened(e) {
  if (e.target.className === 'card') {
    return e.target.classList.contains('open');
  }
}

//function checking if the card is matched
function isCardMatched(e) {
  if (e.target.className === 'card') {
    return e.target.classList.contains('match');
  }
}

function cardClicked(e) {
  if (e.target.className === 'card') {
    //open card if not already opened
    if (!isCardOpened(e)) {
      openCard(e.target);
    }
  }
}

//timer based on W3C example at https://www.w3schools.com/howto/howto_js_countdown.asp
function startTimer(){
    // Get todays date and time
  let now = new Date().getTime();
  // Update the count up every 1 second
  interval = setInterval(function() {
    // Find the distance between now an the count down date
    let newNow = new Date().getTime() - now;

    // Time calculations for days, hours, minutes and seconds
    let minutes = Math.floor((newNow % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((newNow % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    timer = minutes + "m " + seconds + "s ";
    timerElement.innerText =  timer;
  }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

//add event listener to the cards deck
deck.addEventListener('click', function(event) {
  cardClicked(event);
}, true);

//add event listener to the reset button
reset.addEventListener('click', function() {
  resetGame();
  initGame();
});

// When the user clicks on <close> (x), close the modal
close.addEventListener("click", function() {
  modal.classList.toggle("opened");
});

// When the user clicks on <close> (x), close the modal
play.addEventListener("click", function() {
  modal.classList.toggle("opened");
  resetGame();
  initGame();
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target === modal) {
      modal.classList.toggle("opened");
  }
});

initGame();
