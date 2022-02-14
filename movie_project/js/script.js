/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let playerImg;
let playerFighter;
let playerPunchImg;

let enemyImg;
let enemyFighter;
let enemyPunchImg;

/**
Description of preload
*/
function preload() {

 enemyImg = loadImage('assets/images/enemy.png');
 enemyPunchImg = loadImage('assets/images/enemy_punch.png');

 playerImg = loadImage('assets/images/player.png');
 playerPunchImg = loadImage('assets/images/player_punch.png');

}


/**
Description of setup
*/
function setup() {

  frameRate(30);

  createCanvas(1000,800);

  createPlayer();
  createEnemy();
}

function createPlayer() {

  let x = width;
  let y = height;

  playerFighter = new Player( x, y, playerImg, playerPunchImg);
  console.log('player Spawned');

}

function createEnemy() {

  let x = width;
  let y = height;

  enemyFighter = new Enemy( x, y, enemyImg, enemyPunchImg);
  console.log('enemy Spawned');

}

/**
Description of draw()
*/
function draw() {

  background(100);

  playerFighter.update();
  enemyFighter.update();

}
