// Declare variables to store game-related information
let cards = []; // Array to store the drawn cards
let totalCard = 0; // The sum of the values of the drawn cards
let message = ""; // Message to display to the player
let cardEl = document.getElementById("card-el"); // Element to display the drawn cards
let sumEl = document.getElementById("sum-el"); // Element to display the total sum of the cards
let messageEl = document.querySelector("#message-el"); // Element to display the game message
let hasBlackJack = false; // Indicates if the player has achieved Blackjack
let isalive = false; // Indicates if the player is still in the game

// Get the "Start Game" and "New Card" buttons from the document
let startGameBtn = document.getElementById("startGame");
let newCardBtn = document.getElementById("newCard");

// Add event listeners to the buttons
startGameBtn.addEventListener("click", startGameFn);
newCardBtn.addEventListener("click", newCardFn);

// Function to start the game
function startGameFn() {
  isalive = true;
  let firstCard = getRandCard();
  let secondCard = getRandCard();
  cards = [firstCard, secondCard]; // Store the drawn cards in the array
  totalCard = firstCard + secondCard; // Calculate the total sum of the cards
  renderGame(); // Update the game display
}

// Function to update the game display
function renderGame() {
  cardEl.textContent = "Cards: ";
  cards.forEach((card) => {
    cardEl.textContent += card + " "; // Display each card
    sumEl.textContent = "Sum: " + totalCard; // Display the total sum
  });
  
  // Determine the game message based on the total sum of the cards
  if (totalCard <= 20) {
    message = "Do you wanna draw a new card?";
  } else if (totalCard === 21) {
    message = "You've got BlackJack";
    hasBlackJack = true;
  } else {
    message = "You are out of the game";
    isalive = false;
  }
  
  messageEl.textContent = message; // Display the game message
}

// Function to draw a new card
function newCardFn() {
  // Check if the player is still in the game and hasn't achieved Blackjack
  if (isalive === true && hasBlackJack === false) {
    let newCard = getRandCard();
    totalCard += newCard; // Update the total sum with the new card
    cards.push(newCard); // Add the new card to the array
    renderGame(); // Update the game display
  }
}

// Function to generate a random card value
function getRandCard() {
  let randNum = Math.floor(Math.random() * 13) + 1; // Generate a random number between 1 and 13
  if (randNum > 10) {
    return 10; // Face cards have a value of 10
  } else if (randNum === 1) {
    return 11; // Ace can be either 1 or 11
  } else {
    return randNum; // Return the random number itself
  }
}