# Memory Game Project

Well known memory game implemented with HTML, CSS & JS.

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)
* [Dependencies](#dependencies)

## Instructions

### Aim of the game
You need to match all the pairs in the deck in the shortest time possible. Find all of 8 pairs to win the game and earn the highest star rating.

### Start of the game
Start a game-opening the following page https://skozubek.github.io/memory-game/

### How to play
Click on a card, the symbol behind will be revealed. Click on another - if you're lucky enough you will find a pair which will remain open. Otherwise - remember the symbols and keep revealing other cards until you match all the pairs. Try to accomplish that in the shortest time and the smallest number of moves possible.

### Star rating
You start a game with the star rating of three. Revealing two cards counts for one move. You'll keep the star rating of three if you'll manage to finish the game with no more than 15 moves. After additional moves star rating goes down:

* 3 stars rating - not more than 15 moves
* 2 stars rating - not more than 20 moves
* 1-star rating - no more than 25 moves
* 0 stars rating - more than 25 moves

## Dependencies

### JS
The DOM is manipulated by the Vanilla JS in app.js file. openCard(card) function is handling the main logic of the game. Other functions are responsible for creating deck fo cards, shuffling cards, initiate the game, resetting the game, starting and stopping the timer, applying CSS classes responsible for animations, displaying a modal window on the game over event.

### CSS
All the elements are styled by the stylesheet in app.css file. There are also additional styles to make the game responsive and good looking on smaller screens.

## Contributing

This repository is Udacity FEND project. Therefore, I will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
