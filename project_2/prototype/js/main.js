/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
 
"use strict";

let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
  physics: { default: 'arcade',
            arcade: {
              gravity: {y:200},
              debug: false
            }
          },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);
