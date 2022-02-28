/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let enemyImg;
let enemyFighter;
let enemyPunchImg;
let enemyBlockImg;
let enemyHurtImg;

let playerImg;
let playerFighter;
let playerPunchImg;
let playerBlockImg;
let playerHurtImg;

let overTimer = 30;

let gameState = "INTRO";

/**
Description of preload
*/
function preload() {
  enemyImg = loadImage("assets/images/enemy_idle.png");
  enemyPunchImg = loadImage("assets/images/enemy_punch.png");
  enemyBlockImg = loadImage("assets/images/enemy_block.png");
  enemyHurtImg = loadImage("assets/images/enemy_hurt.png");

  playerImg = loadImage("assets/images/player_idle.png");
  playerPunchImg = loadImage("assets/images/player_punch.png");
  playerBlockImg = loadImage("assets/images/player_block.png");
  playerHurtImg = loadImage("assets/images/player_hurt.png");
}

/**
Description of setup
*/
function setup() {
  frameRate(30);

  createCanvas(1000, 800);

  createPlayer();
  annyang.start();

  // setTimeout(function(){
  //   annyang.trigger('punch')
  // }, 2000);
  //
  // setTimeout(function(){
  //   annyang.trigger('block')
  // }, 4000);

  createEnemy();
}

function createPlayer() {
  let x = width;
  let y = height;

  playerFighter = new Player(x, y, playerImg, playerPunchImg, playerBlockImg, playerHurtImg);
  playerFighter.me = playerFighter;
  console.log("player Spawned");
}

function createEnemy() {
  let x = width;
  let y = height;

  enemyFighter = new Enemy(x, y, enemyImg, enemyPunchImg, enemyBlockImg, enemyHurtImg);
  console.log("enemy Spawned");
}

function draw() {
  background(0);

  // Determines at which state the game is at
  if (gameState === "INTRO") {
    showIntro();
  } else if (gameState === "GAME") {
    showGame();
  } else if (gameState === "GAMEOVER") {
    showGame();
    showGameOver();
  } else if (gameState === "GAMEWIN") {
    showGame();
    showGameWin();
  }
}

// Properties of the intro screen
function showIntro() {
  textAlign(CENTER, CENTER);

  let introTitle = "Steel Street Fight\n";

  let introText =
    "Tell your bot to 'punch' and 'block' to defeat the enemy fighter\n";
  introText = introText + "--Press space to start--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0, 30, 150);
  fill(180);
  text(introTitle, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(introText, width / 2, height / 2);
  pop();

  if (keyIsDown(32)) {
    gameState = "GAME";
  }
}

//Manage and update both fighters during the game
function showGame() {
  push();
  background(100);
  pop();

  playerFighter.update();
  enemyFighter.update();

  if (playerFighter.life <= 0) {
    if (overTimer <= 0) {
      gameState = "GAMEOVER";
    }
    overTimer--;
  } else if (enemyFighter.life <= 0) {
    if (overTimer <= 0) {
      gameState = "GAMEWIN";
    }
    overTimer--;
  }
}

// Properties of the game over screen
function showGameOver() {

  let overTitle = "You got trashed\n";

  let overText = "Time to prove your worth\n";
  overText = overText + "--Press 'r' to retry--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0);
  fill(200, 20, 20);
  text(overTitle, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(overText, width / 2, height / 2);
  pop();

  if (keyIsDown(82)) {
    location.reload();
  }
}

// Properties of the winning screen
function showGameWin() {
  textAlign(CENTER, CENTER);

  let winTitle = "You have won this match\n";

  let winText = "You must keep your title\n";
  winText = winText + "--Press 'r' for the next fight--";

  push();
  textSize(100);
  strokeWeight(10);
  stroke(0, 30, 150);
  fill(180, 180, 180);
  text(winTitle, width / 2, height / 3);
  textSize(36);
  strokeWeight(3);
  text(winText, width / 2, height / 2);
  pop();

  if (keyIsDown(82)) {
    location.reload();
  }
}
