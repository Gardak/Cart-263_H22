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
  width: 1900,
  height: 900,
  backgroundColor: (16, 28, 33),
  physics: { default: 'arcade',
            arcade: {
              gravity: {y:1000},
              debug: false
            }
          },
  scene: [Boot, Play]
};

let game = new Phaser.Game(config);
