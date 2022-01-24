// Asteroid
// An extension of the spaceobject class
// Slow moving objects meant to hide the player's objectives

class Asteroid extends SpaceObject {
  // constructor(x,y,image)
  // Calls the super constructor
  // Adds properties for being found and for a rotation speed
  constructor(x, y, image, imgSize, direction, rotation) {
    super(x, y, image, imgSize);

    this.found = false;
    this.angle = rotation;
    this.dmg = 1;
    this.direction = direction;
    this.speed = 0.5;

    // Switch
    // Change the direction of the asteroids at random
    switch (this.direction) {
      case 0:
        this.vx = this.speed;
        this.vy = this.speed;
        break;

      case 1:
        this.vx = -this.speed;
        this.vy = this.speed;
        break;

      case 2:
        this.vx = this.speed;
        this.vy = -this.speed;
        break;

      case 3:
        this.vx = -this.speed;
        this.vy = -this.speed;
        break;
    }
  }

  // update()
  // Calls the super update() and changes angle if found (to rotate!)
  update() {
    this.bounceAround();
    super.update();
    // console.log('Asteroid update()');
  }

  // Make the asteroids move around each frames
  bounceAround() {
    this.x += this.vx;
    this.y += this.vy;

    this.handleWrapping();
  }

  // Make the asteroids wrap around the screen
  handleWrapping() {
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }

    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  //Function when the player clicks on the asteroids
  onOverlapClick() {
    // remove hp
    playerLife -= this.dmg;
    //console.log(playerLife);
    if (playerLife <= 0) {
      gameState = "GAMEOVER";
    }
  }
}
