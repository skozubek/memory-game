/*
 * Create a list that holds all of your cards
 */

let gameCardsFaces = ['fa-beer', 'fa-paper-plane', 'fa-anchor', 'fa-bolt', 'fa-cube',
  'fa-anchor', 'fa-leaf', 'fa-bicycle', 'fa-beer', 'fa-bomb', 'fa-leaf', 'fa-bomb',
  'fa-bolt', 'fa-bicycle', 'fa-paper-plane', 'fa-cube'];

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
  for(let i = 0; i < gameCardElements.length; i++){
    // Removing all children from an card element
    let gameCard = gameCardElements[i];
    while (gameCard.firstChild) {
    gameCard.removeChild(gameCard.firstChild);
    }
    // show the cards
    //gameCard.classList.add('open', 'show');
    // Adding new card face
    let newFace = document.createElement('i');
    newFace.classList.add('fa',  gameCardsFaces[i]);
    gameCard.appendChild(newFace);
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
 let matchedCardsList = [];
 let firstCard;
 let secondCard;

 //fuction addToOpenCardsList
 function resetOpenCardsList(){
   openCardsList = [];
   firstCard = null;
   secondCard = null;
 }

 function showSymbol(e){
   e.target.classList.add('show');
  }

 function addToOpenCardsList(card){
    openCardsList.push(card);
 }

 function openCard(e){

   if (e.target.className === 'card'){
     let card = e.target;

     if(openCardsList.length === 0){
       card.classList.add('open');
       showSymbol(e);
       addToOpenCardsList(card);
     }
     else if (openCardsList.length === 1) {
       card.classList.add('open');
       showSymbol(e);
       addToOpenCardsList(card);
     } else if (openCardsList.length === 2){
       let firstCard = openCardsList[0];
       let secondCard = openCardsList[1];

       firstCard.classList.toggle('show');
       firstCard.classList.toggle('open');
       secondCard.classList.toggle('show');
       secondCard.classList.toggle('open');
       //clear openCards
       resetOpenCardsList();
       card.classList.add('open');
       showSymbol(e);
       addToOpenCardsList(card);
     }
   }
 }

 //function checking if the card is opened
 function isCardOpened(e){
   if (e.target.className === 'card'){
     return e.target.classList.contains('open');
   }
 }

 //function checking if the card is matched
 function isCardMatched(e){
   if (e.target.className === 'card'){
     return e.target.classList.contains('match');
   }
 }

 function cardClicked(e){
   if (!isCardOpened(e) && !isCardMatched(e)){
     openCard(e);
   }
 }

 const deck = document.querySelector('.deck');

 deck.addEventListener('click', function(event) {
      cardClicked(event);
  }, true);
