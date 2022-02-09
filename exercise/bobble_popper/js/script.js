/**
Pop ze Bubble
Teacher: Pippin Barr
Student: Alex Lorrain
*/

"use strict";

/**
Description of preload
*/
function preload() {}

let video;

let handpose;

let predictions = [];

let pin = {
  head: {
    x: undefined,
    y: undefined,
    diametre: 20,
  },

  tip: {
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

  handpose.on('predict', function(results) {

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
    vy: -2}

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
    pinPostions(predictions[0]);
    //console.log('pin head X:', pin.tip.x);

    //display the pin if the index is tracked
    displayPin();
    bubblePop();
  }

  displayBubble();

}

//Update the position of the pin from ml5
function pinPostions(prediction) {
  pin.tip.x = prediction.annotations.indexFinger[3][0];
  pin.tip.y = prediction.annotations.indexFinger[3][1];
  pin.head.x = prediction.annotations.indexFinger[0][0];
  pin.head.y = prediction.annotations.indexFinger[0][1];
}

//Draw the pin from the index predictions
function displayPin() {
  // Draw pin
  push();
  stroke(200);
  strokeWeight(2);
  line(pin.tip.x, pin.tip.y, pin.head.x, pin.head.y);
  pop();

  // Draw pinhead
  push();
  fill(50, 200, 0);
  ellipse(pin.head.x, pin.head.y, pin.head.diametre);
  pop();
}

function displayBubble() {

  //draw bubble
  push();
  fill(60,250,230);
  stroke(250);
  strokeWeight(2);
  ellipse(bubble.x, bubble.y, bubble.diametre);
  pop();

  //move bubble upward
  bubble.y += bubble.vy;

  //make the bubble loop
  if (bubble.y < 0 - bubble.diametre/2){
    restartBubble();
  }
}

function bubblePop() {
  //check the distance between the pin tip and the bubble center
  let d = dist(pin.tip.x, pin.tip.y, bubble.x, bubble.y);

  if ( d <= bubble.diametre/2){
    restartBubble();
  }
}

function restartBubble() {
  bubble.x = random(width);
  bubble.y = height + bubble.diametre/2;
}
