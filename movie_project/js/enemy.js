class Enemy extends Fighter {
  constructor( width, height, img, punchImg, blockImg, hurtImg) {
    super( width, height, img, punchImg, blockImg, hurtImg);
    this.x = (width * 2) / 3;
    this.y = (height * 7) / 12;
    this.lifeBarX = (width * 5) / 9;
    this.lifeBarY = height / 10;

    this.atkSpeed = 120;
    this.atkTimer = 120;
    this.atkType = 0;

    this.chargeAtk = false;
  }

  combatMoves() {
    //console.log(this.atkTimer);

    //Idle
    if (this.atkTimer > 0) {
      switch (this.atkType) {
        case 0:
          if (this.atkTimer === 90) {
            console.log("Enemy is idle");
          }
          if (this.gotHit || this.atkTimer === this.atkSpeed/2){
            this.atkTimer = 0;
          }
          break;

          //Block
        case 1:
          this.canTakeDmg = false;
          this.img = this.blockImg;
          if (this.atkTimer === 90) {
            console.log("Enemy is blocking");
          }
          break;

          //Punch
        case 2:
          if (this.atkTimer === 90) {
            console.log("Enemy about to punch");
          }
          if (this.atkTimer > 30) {
            this.chargeAtk = true;
          } else if (this.atkTimer == 30) {
            console.log("falcon punch");
            playerFighter.gotHit = true;
            if (playerFighter.canTakeDmg) {
              playerFighter.life -= this.dmg;
            }
            this.chargeAtk = false;
          }
          if (this.atkTimer <= 30 && this.atkTimer >= 1) {
            this.img = this.punchImg;
          }

          //animation and triggers when the enemy gets hit
          if (this.gotHit) {
            console.log("ouch");
            this.gotHit = false;
            this.chargeAtk = false;
          }

          break;
      }
    }

    this.atkTimer -= 1;
    if (this.atkTimer <= 0) {
      this.img = this.idleImg;
      this.atkTimer = this.atkSpeed;
      this.atkType = Math.floor(random(3));
      this.canTakeDmg = true;
    }
  }
}
