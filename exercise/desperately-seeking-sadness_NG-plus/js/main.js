/**
Drawn to Sadness
Student: Alex Lorrain
Teacher: Pippin Barr

Exercise to learn Phaser 3.
The goal is to find a thumbs down in a sea
of thumbs up as an emoji with spaceship controls
*/

"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: { default: 'arcade' },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);
