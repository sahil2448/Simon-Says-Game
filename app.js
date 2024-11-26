// ----------------------------------SIMON SAYS GAME-----------------------------------------------


// Variables to manage game state
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

// DOM element for displaying the level
let h2 = document.querySelector("h2");

// Event listener to start the game
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game has started");
    started = true;
    levelUp();
  }
});

// Function to flash a button (game sequence)
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

// Function to flash a button (user click)
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

// Function to handle level up
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Generate a random button
  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  gameSeq.push(randColor);

  console.log(gameSeq);

  // Flash the randomly selected button
  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
}

// Event listener for button clicks
function btnPressed() {
  console.log("Button was pressed");

  // Highlight the clicked button
  let btn = this;
  userFlash(btn);

  // Get the color of the clicked button and store it
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  // Verify the user's input
  checkAns(userSeq.length - 1);
}

// Add click event listeners to all buttons
let btnElements = document.querySelectorAll(".btn");
for (let btn of btnElements) {
  btn.addEventListener("click", btnPressed);
}

// Function to check the user's answer
function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    console.log("Both are equal");

    // Check if the user has completed the current level
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    // Game over scenario
    h2.innerHTML = `Game Over!<br>Your score was ${level}<br>Press any key to start again`;
    document.querySelector("body").style.backgroundColor = "red";

    // Flash the background briefly
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    // Reset the game
    reset();
  }
}

// Function to reset the game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
