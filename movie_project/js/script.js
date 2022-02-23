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
let playerBlockImg;

let enemyImg;
let enemyFighter;
let enemyPunchImg;
let enemyBlockImg;

/**
Description of preload
*/
function preload() {

 enemyImg = loadImage('assets/images/enemy_idle.png');
 enemyPunchImg = loadImage('assets/images/enemy_punch.png');
 enemyBlockImg = loadImage('assets/images/enemy_block.png');

 playerImg = loadImage('assets/images/player_idle.png');
 playerPunchImg = loadImage('assets/images/player_punch.png');
 playerBlockImg = loadImage('assets/images/player_block.png');

}


/**
Description of setup
*/
function setup() {

  frameRate(30);

  createCanvas(1000,800);

  createPlayer();
  annyang.start();

  setTimeout(function(){
    annyang.trigger('punch')
  }, 2000);

  setTimeout(function(){
    annyang.trigger('block')
  }, 4000);

  createEnemy();
}

function createPlayer() {

  let x = width;
  let y = height;

  playerFighter = new Player( x, y, playerImg, playerPunchImg, playerBlockImg);
  playerFighter.me = playerFighter;
  console.log('player Spawned');
}

function createEnemy() {

  let x = width;
  let y = height;

  enemyFighter = new Enemy( x, y, enemyImg, enemyPunchImg, enemyBlockImg);
  console.log('enemy Spawned');

}

/**
Description of draw()
*/
function draw() {
push();
  background(100);
pop();

  playerFighter.update();
  enemyFighter.update();

}
