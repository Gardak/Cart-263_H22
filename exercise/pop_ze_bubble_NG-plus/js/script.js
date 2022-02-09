/**
Pop ze Bubble NG+
Teacher: Pipcreature Barr
Student: Alex Lorrain
*/

"use strict";

let creatureImg;
/**
Description of preload
*/
function preload() {
  creatureImg = loadImage("assets/images/fish.png");
}

let video;

let handpose;

let predictions = [];

let creature = {
  fin: {
    x: undefined,
    y: undefined,
    diametre: 20,
  },

  head: {
    x: undefined,
    y: undefined,
  },
};

let bubble;

/**
setup of the variables necessary for the webcam recognition
*/
function setup() {
  //Obtain a steady framerate
  frameRate(60);

  //The webcam has a hard time going beyond 600 * 400 in the canvas
  createCanvas(600, 400);

  video = createCapture(VIDEO);
  video.hide();

  handpose = ml5.handpose(video, { flipHorizontal: true }, function () {
    //state = 'running';
  });

  handpose.on("predict", function (results) {
    predictions = results;
    //console.log('results',results);
    //console.log('predictions', predictions);
  });

  //create the bubble's properties
  bubble = {
    diametre: 50,
    x: random(width),
    y: height,
    vx: 0,
    vy: -2,
  };

  //Make sure ml5 has properly loaded
  //console.log("ml5 version:", ml5.version);
}

/**
Description of draw()
*/
function draw() {
  background(50);

  //console.log('draw',predictions.lenght);

  if (predictions.length > 0) {
    creaturePostions(predictions[0]);
    //console.log('creature fin X:', creature.head.x);

    //display the creature if the index is tracked
    displaycreature();
    bubblePop();
  }

  displayBubble();
}

//Update the position of the creature from ml5
function creaturePostions(prediction) {
  creature.head.x = prediction.annotations.indexFinger[3][0];
  creature.head.y = prediction.annotations.indexFinger[3][1];
  creature.fin.x = prediction.annotations.indexFinger[0][0];
  creature.fin.y = prediction.annotations.indexFinger[0][1];
}

//Draw the creature from the index predictions
function displaycreature() {
  // Draw creature
  let dx = creature.head.x - creature.fin.x;
  let dy = creature.fin.y - creature.head.y;
  let fishWidth = dist(
    creature.head.x,
    creature.head.y,
    creature.fin.x,
    creature.fin.y
  );
  let fishHeight = fishWidth / 2;
  let fishX = creature.fin.x + dx / 2;
  let fishY = creature.fin.y - dy / 2;
  let rotationAngle = atan(dy / dx) * -1;

  push();
  //rectMode(CENTER);
  angleMode(DEGREES);
  imageMode(CENTER);
  translate(fishX, fishY);
  rotate(rotationAngle);
  console.log("angle", rotationAngle);
  push();
  if (creature.head.x < creature.fin.x){
  scale(-1,1);
} else{
  scale(1,1);
}
  image(creatureImg, 0, 0, fishWidth, fishHeight);
  pop();
  //fill(255);
  //rect(fishX,fishY,10,10)
  pop();

  // Draw creature
  push();
  stroke(200);
  strokeWeight(2);
  line(creature.head.x, creature.head.y, creature.fin.x, creature.fin.y);
  pop();

  // Draw creaturefin
  push();
  fill(50, 200, 0);
  ellipse(creature.fin.x, creature.fin.y, creature.fin.diametre);
  pop();
}

function displayBubble() {
  //draw bubble
  push();
  fill(60, 250, 230);
  stroke(250);
  strokeWeight(2);
  ellipse(bubble.x, bubble.y, bubble.diametre);
  pop();

  //move bubble upward
  bubble.y += bubble.vy;

  //make the bubble loop
  if (bubble.y < 0 - bubble.diametre / 2) {
    restartBubble();
  }
}

function bubblePop() {
  //check the distance between the creature head and the bubble center
  let d = dist(creature.head.x, creature.head.y, bubble.x, bubble.y);

  if (d <= bubble.diametre / 2) {
    restartBubble();
  }
}

function restartBubble() {
  bubble.x = random(width);
  bubble.y = height + bubble.diametre / 2;
}
