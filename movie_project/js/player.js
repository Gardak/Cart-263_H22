class Player extends Fighter {
  constructor(width, height, img, punchImg, blockImg, hurtImg, deadImg) {
    super(width, height, img, punchImg, blockImg, hurtImg, deadImg);

    //Positionning of the player
    this.x = width / 3;
    this.y = (height * 7) / 12;

    //positionning of the lifeBar
    this.lifeBarX = width / 9;
    this.lifeBarY = height / 10;

    //Speed and properties of the actions
    this.atkSpeed = 45;
    this.atkTimer = 0;
    this.chargeAtk = false;

    //display properties of the atk speed
    this.atkBarX = width / 4;
    this.atkBarY = (height * 3) / 4;
    this.atkBarLenght = 100;
    this.atkBarLenghtMax = 100;

    //manage the voice control for the player
    if (annyang) {
      annyang.addCommands({
        "(*x)punch(*y)": function () {
          //console.log("In addCommands Punch2");
        },
        "(*x)block(*y)": function () {
          //console.log("In addCommands Block");
        },
      });

      annyang.addCallback("result", function (phrases) {
        //console.log("phrases", phrases);
      });

      //Need to use callback since it doesn't work properly with objects
      annyang.addCallback(
        "resultMatch",
        function (userSaid, commandMatched) {
          //console.log("in resultMatch", commandMatched);
          switch (commandMatched) {
            case "(*x)punch(*y)":
              this.playerPunch();
              break;
            case "(*x)block(*y)":
              this.playerBlock();
              break;
          }
        },
        this
      );
      //console.log("annyang started");
    }
  }

  //manage the combat moves utilities for the player
  combatMoves() {
    if (this.gotHit) {
      this.atkTimer = 0;
      this.gotHit = false;
    }

    //pause annyang while the atk recharge
    if (this.atkTimer > 0) {
      this.atkTimer -= 1;
      if (annyang) {
        annyang.pause();
      }

      //reset the state of the player to idle
    } else if (this.atkTimer <= 0) {
      this.isBlocking = false;
      this.isPunching = false;
      this.isIdle = true;
      if (annyang) {
        annyang.resume();
      }
    }
    this.playerAnimation();
  }

  //Punch utilities
  playerPunch() {
    //console.log(this.me);
    this.isPunching = true;
    if (enemyFighter.canTakeDmg) {
      enemyFighter.life -= this.dmg;
      enemyFighter.gotHit = true;
      //console.log('player punched');
      //console.log(enemyFighter.life);
    }
    this.atkTimer = this.atkSpeed;
    //console.log("player punched");
  }

  //Block utilities
  playerBlock() {
    this.canTakeDmg = false;
    //console.log("player block");
    this.atkTimer = this.atkSpeed;
    this.isBlocking = true;
  }

  //Manage the animations and atk bar
  playerAnimation() {
    if (this.isPunching && this.atkTimer > this.atkSpeed / 2) {
      this.img = this.punchImg;
    } else if (this.isBlocking) {
      this.img = this.blockImg;
    } else {
      this.img = this.idleImg;
      this.canTakeDmg = true;
    }

    push();
    strokeWeight(4);
    stroke(200, 230, 15);
    noFill();
    rect(this.atkBarX, this.atkBarY, 100, 20);
    pop();

    push();
    noStroke();
    if (this.atkTimer <= 0) {
      fill(20, 220, 10);
    } else {
      fill(220, 0, 0);
    }
    this.atkBarLenght = map(
      this.atkTimer,
      0,
      this.atkSpeed,
      this.atkBarLenghtMax,
      0
    );
    rect(this.atkBarX, this.atkBarY, this.atkBarLenght, 20);
    pop();
  }
}
