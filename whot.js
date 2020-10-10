// const cards = require("./cards");
const dealCard = document.getElementById("deal");
const cardTable = document.getElementById("card-table");
const deckUpper = document.getElementById("upper-hand");
const deckLower = document.getElementById("lower-hand");
const restart = document.getElementById("restart");
const dealInput = document.getElementById("card-number");
const cardShuffle = document.getElementById("shuffle");

cards.init({ table: cardTable, type: STANDARD });

// New deck of cards
deck = new cards.Deck();
//Moving the position of the deck tot the left
deck.x -= 150;

// put all the cards in the deck
deck.addCards(cards.all);
//to get the deck onto the table.
deck.render({ immediate: true });

//Now lets create a couple of hands, one face down, one face up.
upperhand = new cards.Hand({ faceUp: true, y: 90 });
lowerhand = new cards.Hand({ faceUp: true, y: 340 });

//Lets add a discard pile
discardPile = new cards.Deck({ faceUp: true });
// discardPile.x += 50;

//Let's deal when the Deal button is pressed:
let dealNumber = 0;
dealInput.addEventListener("keyup", () => {
  dealNumber = dealInput.value;
});

dealCard.addEventListener("click", () => {
  dealCard.style.display = "none";
  deck.deal(dealNumber, [upperhand, lowerhand], 50, function () {
    //This is a callback function, called when the dealing
    //is done.
    discardPile.addCard(deck.topCard());
    discardPile.render();
  });
});

// lets shuffle the deck of card

//When you click on the top card of a deck, a card is added
//to your hand

// indicate which hand you want to add a card to
deckUpper.addEventListener("click", () => {
  deck.click(function (card) {
    if (card === deck.topCard()) {
      upperhand.addCard(deck.topCard());
      upperhand.render();
    }
  });
});

deckLower.addEventListener("click", () => {
  deck.click(function (card) {
    if (card === deck.topCard()) {
      lowerhand.addCard(deck.topCard());
      lowerhand.render();
    }
  });
  console.log("owo isale");
});

// for restartiung the game

restart.addEventListener("click", () => {
  window.location.assign("index.html");
});

//when you click a card in your hand, if it's
//the same suit or rank as the top card of the discard pile
//then it's added to it
lowerhand.click(function (card) {
  if (
    card.suit == discardPile.topCard().suit ||
    card.rank == discardPile.topCard().rank
  ) {
    discardPile.addCard(card);
    discardPile.render();
    lowerhand.render();
  }
});

upperhand.click(function (card) {
  if (
    card.suit == discardPile.topCard().suit ||
    card.rank == discardPile.topCard().rank
  ) {
    discardPile.addCard(card);
    discardPile.render();
    upperhand.render();
  }
});
