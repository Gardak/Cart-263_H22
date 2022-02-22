class Fighter {
  constructor(width, height, img, punchImg, blockImg) {
    this.witdh = width;
    this.height = height;
    this.img = img;
    this.punchImg = punchImg;
    this.blockImg = blockImg;
    this.idleImg = img;
    this.imgSizeX = 100;
    this.imgSizeY = 200;

    this.xp = 0;
    this.yp = 0;
    this.vx = 2;
    this.vy = 1;
    this.idleAnimTimerMax = 30;
    this.idleAnimTimer = 0;

    this.maxLife = 100;
    this.life = 100;
    this.lifeLenghtMax = width / 3;
    this.lifeLenght = width / 3;

    this.dmg = 10;
    this.canTakeDmg = true;

    this.isIdle = true;
    this.isBlocking = false;
    this.isPunching = false;
    this.gotHit = false;

    //this.isDodging = false;
  }

  update() {
    this.display();
    this.lifeBar();
    this.combatMoves();
  }

  display() {
    push();

    imageMode(CENTER);
    translate(this.x, this.y);

    if (this.chargeAtk) {
      if (this.atkTimer % 4 > 2) {
        tint(0, 153, 204);
      } else {
        noTint();
      }
    }

    image(this.img, this.xp, this.yp, this.imgSizeX, this.imgSizeY);

    pop();
  }

  lifeBar() {
    push();
    strokeWeight(8);
    stroke(70,70,70);
    noFill();
    rect(this.lifeBarX, this.lifeBarY, width / 3, height / 20);
    pop();

    push();
    noStroke();

    if (this.life > 60) {
    fill(20, 220, 10);
  } else if (this.life <= 60 && this.life > 20){
    fill(220, 195, 20);
  } else {
    fill(200, 0, 0);
  }
    this.lifeLenght = map(this.life, 0, this.maxLife, 0, this.lifeLenghtMax);
    rect(this.lifeBarX, this.lifeBarY, this.lifeLenght, height / 20);
    //console.log(this.lifeLenght);
    pop();
  }

  // idleAnim(){
  //   if (this.idleAnimTimer > 1){
  //     this.xp += this.vx;
  //     this.idleAnimTimer--;
  //   } else {
  //     this.idleAnimTimer = this.idleAnimTimerMax;
  //     this.vx = this.vx * -1;
  //   }
  //
  //   if (this.idleAnimTimer > this.idleAnimTimerMax/2){
  //     this.yp += this.vy;
  //     this.idleAnimTimer--;
  //   } else {
  //     this.idleAnimTimer = this.idleAnimTimerMax;
  //     this.vy = -this.vy;
  //   }
  // }
}
