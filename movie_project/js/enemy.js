
class Enemy extends Fighter {
  constructor ( width, height, img, life){
    super( width, height, img, life);
    this.x = ((width*2) / 3);
    this.y = ((height*7) / 12);
    this.lifeBarX = ((width*5) / 9);
    this.lifeBarY = (height / 10);

    this.atkSpeed = 90;
    this.atkTimer = 0;
    this.atkType = 0;

    this.chargeAtk = false;
    this.gotHit = false;
  }

  combatMoves(){
    //console.log(this.atkTimer);

    if (this.atkTimer > 0) {
      switch (this.atkType) {

     case 0:
        this.canTakeDmg = false;
        if (this.atkTimer === 90){
        console.log('Enemy is blocking');
      }
    break;

      case 1:
      this.canTakeDmg = true;
        if (this.atkTimer === 90){
        console.log('Enemy about to punch');
      }
        if (this.atkTimer > 30){
          this.chargeAtk = true;
        } else if (this.atkTimer == 30) {
          console.log('falcon punch')
          if (playerFighter.canTakeDmg){
          playerFighter.life -= this.dmg;
        }
          this.chargeAtk = false;
        }
        if (this.atkTimer <= 30 && this.atkTimer >= 1) {
          this.img = this.punchImg;
        }

        if (this.gotHit){
          this.atkTimer = 0;
          console.log('ouch');
          this.gotHit = false;
          this.chargeAtk = false;

        }

      break;

   }
    }

    this.atkTimer -= 1;
    if (this.atkTimer <= 0){
      this.img = this.idleImg;
      this.atkTimer = this.atkSpeed;
      this.atkType = Math.floor(random(2));

    }

  }

}
