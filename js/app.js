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

// initGameCards();

function gameOver() {
  return matchedCounter === 8;
}

function resetOpenCardsList() {
  openCardsList = [];
}

function pickCard(card) {
  card.classList.add('show');
  card.classList.add('open');
  card.classList.add('animated');
  card.classList.add('flip');
}

function closeCards(card1, card2) {
  setTimeout(function() {
    card1.classList.remove('open');
    card1.classList.remove('show');
    card1.classList.add('flip');
    card1.classList.remove('shake');

    card2.classList.remove('open');
    card2.classList.remove('show');
    card2.classList.add('flip');
    card2.classList.remove('shake');
  }, 1200);
  setTimeout(function() {
    card1.classList.remove('animated');
    card1.classList.remove('flip');

    card2.classList.remove('animated');
    card2.classList.remove('flip');
  }, 1500);
}

function addToOpenCardsList(card) {
  openCardsList.push(card);
}

function cardsMatch(card1, card2) {
  return card1.querySelector('i').className === card2.querySelector('i').className;
}

function setMatchedCards(card1, card2) {
  card1.classList.add('match');
  card2.classList.add('match');
  card1.classList.remove('flip');
  card2.classList.remove('flip');
  card1.classList.add('rubberBand');
  card2.classList.add('rubberBand');
}

function setNotMatchedCards(card1, card2) {
  card1.classList.remove('flip');
  card2.classList.remove('flip');
  card1.classList.add('shake');
  card2.classList.add('shake');
}

function openCard(card) {

  if (openCardsList.length >= 2) {
    return;
  }

  pickCard(card);

  //if no cards opened open card and add to the list of open cards
  if (openCardsList.length === 0) {
    addToOpenCardsList(card);
  }
  //if one card already opened - open card and add to the list of open cards
  //then check if the card match
  else if (openCardsList.length === 1) {

    movesCounter++;
    console.log("moves: " + movesCounter);
    addToOpenCardsList(card);

    //if cards match - mark them
    setTimeout(function() {
      if (cardsMatch(openCardsList[0], openCardsList[1])) {

        setMatchedCards(openCardsList[0], openCardsList[1]);

        matchedCounter++;

        if (gameOver()) {
          setTimeout(function() {
            alert('You made it in ' + movesCounter + ' moves !');
            movesCounter = 0;
          }, 500);
        }

      } else {
          setNotMatchedCards(openCardsList[0], openCardsList[1]);
          closeCards(openCardsList[0], openCardsList[1]);
        }

      resetOpenCardsList();
      console.log(openCardsList.length);

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

//add event listener to the cards deck
const deck = document.querySelector('.deck');

deck.addEventListener('click', function(event) {
  cardClicked(event);
}, true);
