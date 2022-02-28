class Fighter {
  constructor(width, height, img, punchImg, blockImg, hurtImg, deadImg) {

    //Variables to manage the canva's dimension
    this.witdh = width;
    this.height = height;

    //images and properties used for the fighter
    this.img = img;
    this.punchImg = punchImg;
    this.blockImg = blockImg;
    this.hurtImg = hurtImg;
    this.deadImg = deadImg;
    this.idleImg = img;
    this.imgSizeX = 200;
    this.imgSizeY = 200;

    //Positionning and movement
    this.xp = 0;
    this.yp = 0;
    this.vx = 2;
    this.vy = 1;
    this.idleAnimTimerMax = 30;
    this.idleAnimTimer = 0;

    //life and lifeBar properties
    this.maxLife = 100;
    this.life = 100;
    this.lifeLenghtMax = width / 3;
    this.lifeLenght = width / 3;
    this.deadTimer = 30;

    //damages utilities
    this.dmg = 20;

    //fighter states
    this.canTakeDmg = true;
    this.isIdle = true;
    this.isBlocking = false;
    this.isPunching = false;
    this.gotHit = false;
    this.gotHitTimer = 0;
  }

  //regroup functions to the script
  update() {
    this.display();
    this.lifeBar();
    if (gameState === 'GAME'){
      this.combatMoves();
    }
  }

  //display properties of the fighter
  display() {
    push();

    imageMode(CENTER);
    translate(this.x, this.y);

    //flicking attack animation for the AI
    if (this.chargeAtk) {
      if (this.atkTimer % 4 > 2) {
        tint(0, 153, 204);
      } else {
        noTint();
      }
    }

    //hurt animation
    if (this.gotHitTimer > 0) {
      this.img = this.hurtImg;
      //console.log('hurt animation');
    }
    this.gotHitTimer--


    //dead animation
    if (this.life <= 0){
      this.deadTimer--
      this.img = this.hurtImg;
      if (this.deadTimer <=0){
        this.img = this.deadImg;
      }
    }

    //diplay fonction
    image(this.img, this.xp, this.yp, this.imgSizeX, this.imgSizeY);

    pop();
  }

  //manage the life bar at the top of the screen
  lifeBar() {
    push();
    strokeWeight(8);
    stroke(70,70,70);
    fill(0);
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

}
