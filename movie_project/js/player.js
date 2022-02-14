
class Player extends Fighter {
  constructor ( width, height, img, punchImg){
    super( width, height, img, punchImg);
    this.x = (width / 3);
    this.y = ((height*7) / 12);
    this.lifeBarX = (width / 9);
    this.lifeBarY = (height / 10);

    this.atkSpeed = 60;
    this.atkTimer = 0;

    this.atkBarX = ((width*1) / 4);
    this.atkBarY = ((height*3) / 4);
    this.atkBarLenght = 100;
    this.atkBarLenghtMax = 100;
  }


  combatMoves(){
    if (keyIsDown(32) && this.atkTimer <= 0){
      this.playerPunch();
      this.atkTimer = this.atkSpeed;
    }
    if (this.atkTimer > 0){
      this.atkTimer -= 1;
    }

    this.playerAnimation();
  }

  playerPunch(){
    if (enemyFighter.canTakeDmg){
      enemyFighter.life -= this.dmg;
      enemyFighter.gotHit = true;
      //console.log('player punched');
      //console.log(enemyFighter.life);
    }
  }

  playerAnimation(){
    if (this.atkTimer > 40){
      this.img = this.punchImg;
    } else {
      this.img = this.idleImg;
    }

    push();
    strokeWeight(4);
    stroke(200, 230, 15);
    noFill();
    rect(this.atkBarX, this.atkBarY, 100, 20);
    pop();

    push();
    noStroke();
    if (this.atkTimer <= 0){
      fill(20,220,10);
    } else {
      fill(220, 0, 0);
    }
    this.atkBarLenght = map(this.atkTimer, 0, this.atkSpeed, this.atkBarLenghtMax, 0);
    rect(this.atkBarX, this.atkBarY, this.atkBarLenght, 20);
    pop();


    }


}
