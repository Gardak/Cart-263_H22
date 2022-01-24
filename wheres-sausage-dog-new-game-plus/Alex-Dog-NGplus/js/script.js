"use strict";

/*****************
Asteroid Escape
Teacher: Pippin Barr
Student: Alex Lorrain

The player has to find his way through an asteroid field to get to the wormhole.
If the player clicks an asteroid he takes damage.
******************/

// Constants for image loading
const NUM_ASTEROID_IMG = 7;
const ASTEROID_IMG_PREFIX = `assets/images/Asteroid-`;
const WORMHOLE_IMG = `assets/images/wormhole.png`;

// Number of asteroids to display
const NUM_ASTEROID = 100;

// Array of the loaded asteroid images
let asteroidImages = [];
// Array of asteroid objects
let asteroids = [];
// Variable for the wormhole image
let wormHoleImage;
// Worm hole object
let wormHole;

// Player's missclick chances
let playerLife = 3;

// Hurt feedback properties when an asteroid is clicked on
let hurtTimer = 0;
let hurtOpacity = 0;

// Fade in of the Winning screen
let winOpacity = -30;

// Initial intro state of the game
let gameState = "INTRO";

// preload()
// Loads all the asteroid images and the wormhole image
function preload() {
  // Loop once for each asteroid image
  for (let i = 0; i < NUM_ASTEROID_IMG; i++) {
    // Load the image of the current number
    let asteroidImage = loadImage(`${ASTEROID_IMG_PREFIX}${i}.png`);
    asteroidImages.push(asteroidImage);
  }

  // Load the worm hole image
  wormHoleImage = loadImage(`${WORMHOLE_IMG}`);
}

// setup()
// Creates all the asteroid objects and a worm hole object
function setup() {
  createCanvas(windowWidth, windowHeight);

  createAsteroids();
  createWormHole();
}

// createAsteroids()
// Creates all the asteroids at random positions with random asteroid images
function createAsteroids() {
  // Create the correct number of asteroids
  for (let i = 0; i < NUM_ASTEROID; i++) {
    // Create one random asteroid
    let asteroid = createRandomAsteroid();
    // Add it to the asteroids array
    asteroids.push(asteroid);
  }
}

// createRandomAsteroid()
// Create an asteroid object at a random position with a random image and a random direction
// then return that created asteroid
function createRandomAsteroid() {
  let x = random(0, width);
  let y = random(0, height);

  // Randomise the direction of each asteroid
  let direction = Math.floor(random(0, 4));
  let rotation = random(0,10);
  let imgSize = 180;
  let asteroidImage = random(asteroidImages);
  let asteroid = new Asteroid(x, y, asteroidImage, imgSize, direction, rotation);
  return asteroid;
}

// createWormHole()
// Creates a worm hole at a random position
function createWormHole() {
  let x = random(0, width);
  let y = random(0, height);
  let imgSize = 100;
  wormHole = new WormHole(x, y, wormHoleImage, imgSize);
}

// draw()
// Draws the background then updates all asteroids and the worm hole
function draw() {
  background(0);

  // Determines at which state the game is
  if (gameState === "INTRO") {
    showIntro();
  } else if (gameState === "GAME") {
    showGame();
  } else if (gameState === "GAMEOVER") {
    showGameOver();
  } else if (gameState === "GAMEWIN") {
    showGame();
    showGameWin();
  }
}


// Properties of the intro screen
function showIntro() {
  textAlign(CENTER, CENTER);

  let title = "Asteroid Escape\n";

  let myText =
    "You have found yourself in an asteroid belt! \n Find the wormhole to escape \n";
  myText = myText + "--Press space to start--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0, 30, 150);
  fill(180);
  text(title, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(myText, width / 2, height / 2);
  pop();

  if (keyIsDown(32)) {
    gameState = "GAME";
  }
}


// Functions running the game itself
function showGame() {
  // Alternate the order in which the space objects are drawn
  if (!wormHole.found) {
    updateWormHole();
  }

  updateAsteroids();

  if (wormHole.found) {
    updateWormHole();
  }

  //Call the method for the player's damage
  showDmg();
}


// Properties of the game over screen
function showGameOver() {
  showDmg();

  let title = "You crashed\n";

  let myText = "You are lost into the empty void of space\n";
  myText = myText + "--Press 'r' to retry--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0);
  fill(200, 20, 20);
  text(title, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(myText, width / 2, height / 2);
  pop();

  if (keyIsDown(82)) {
    location.reload();
  }
}


// Properties of the winning screen
function showGameWin() {
  textAlign(CENTER, CENTER);

  let title = "You have fled the asteroid belt\n";

  let myText = "But your travel may have put you in the wrong place\n";
  myText = myText + "--Press 'r' to find out--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0, 30, 150, winOpacity);
  fill(180, 180, 180, winOpacity);
  text(title, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(myText, width / 2, height / 2);
  pop();

  if (winOpacity <= 255) {
    winOpacity++;
  }

  if (keyIsDown(82)) {
    location.reload();
  }
}


// updateAsteroids()
// Calls the update() method for all asteroids
function updateAsteroids() {
  // Loop through all asteroids
  // console.groupCollapsed('updateAsteroids()');
  for (let i = 0; i < asteroids.length; i++) {
    // Update the current asteroid
    asteroids[i].update();
  }
  // console.groupEnd();
}


// updateWormHole()
// Calls the update() method of the worm hole
function updateWormHole() {
  wormHole.update();
}


// Manage the feedback when the player takes damage
function showDmg() {
  if (hurtTimer > 0) {
    if (playerLife == 0) {
      hurtTimer -= 0.5;
    } else {
      hurtTimer -= 1;
    }

    hurtOpacity = map(hurtTimer, 120, 0, 180, 0);

    push();

    fill(200, 0, 0, hurtOpacity);
    rect(0, 0, windowWidth, windowHeight);

    pop();
  }
}

// mousePressed()
// Automatically called by p5 when the mouse is pressed.
// Call the wormhole's onOverlapClick() method so it knows.
function mousePressed() {
  if (gameState === "GAME" && !wormHole.found && playerLife > 0) {
    // Did the user click on the worm hole
    if (!wormHole.mousePressed()) {
      // Did the user click on an asteroid
      let asteroidClicked = false;
      for (let i = 0; i < asteroids.length; i++) {
        asteroidClicked = asteroids[i].mousePressed();

        // Prevent a click on overlapping asteroids to trigger multiple onOverlapClick()
        if (asteroidClicked) {
          break;
        }
      }
      // Start the hurt feedback animation
      if (asteroidClicked) {
        hurtTimer = 120;
      }
    }
  }
}
