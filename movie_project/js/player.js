class Player extends Fighter {
  constructor(width, height, img, punchImg, blockImg) {
    super(width, height, img, punchImg, blockImg);
    this.x = width / 3;
    this.y = (height * 7) / 12;
    this.lifeBarX = width / 9;
    this.lifeBarY = height / 10;

    this.atkSpeed = 60;
    this.atkTimer = 0;

    this.chargeAtk = false;

    this.atkBarX = (width * 1) / 4;
    this.atkBarY = (height * 3) / 4;
    this.atkBarLenght = 100;
    this.atkBarLenghtMax = 100;

    if (annyang) {
      // const punch = {
      //   'punch': function(){ console.log('In addCommands Punch')}
      // }
      // annyang.addCommands(punch);

      // annyang.addCallback('resultMatch', function(x,y,z){
      //   console.log('In result match')
      //   this.playerPunch();
      //
      //  }, this);

      // const block = {
      //   'block': function(){ console.log('In addCommands Block')}
      // }
      // annyang.addCommands(block);

      annyang.addCommands({
        "(*x)punch(*y)": function () {
          console.log("In addCommands Punch2");
        },
        "(*x)block(*y)": function () {
          console.log("In addCommands Block");
        },
      });

      annyang.addCallback("result", function (phrases) {
        console.log("phrases", phrases);
      });

      annyang.addCallback(
        "resultMatch",
        function (userSaid, commandMatched) {
          console.log("in resultMatch", commandMatched);
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

      // const block = {
      //   'block': this.playerBlock
      // };
      // annyang.addCommands(block);

      //annyang.addCallback('resultMatch', function{ this.playerBlock() }, this);

      console.log("annyang started");
    }
  }

  combatMoves() {
    if (keyIsDown(32) && this.atkTimer <= 0) {
      this.playerPunch();
    } else if (keyIsDown(82) && this.atkTimer <= 0) {
      this.playerBlock();
    } else {
      //in case
    }

    if (this.gotHit) {
      this.atkTimer = 0;
      this.gotHit = false;
    }

    if (this.atkTimer > 0) {
      this.atkTimer -= 1;
      if (annyang) {
        annyang.pause();
      }
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

  playerPunch() {
    console.log(this.me);
    this.isPunching = true;
    if (enemyFighter.canTakeDmg) {
      enemyFighter.life -= this.dmg;
      enemyFighter.gotHit = true;
      //console.log('player punched');
      //console.log(enemyFighter.life);
    }
    this.atkTimer = this.atkSpeed;
    console.log("player punched");
  }

  playerBlock() {
    this.canTakeDmg = false;
    console.log("player block");
    this.atkTimer = this.atkSpeed;
    this.isBlocking = true;
  }

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
