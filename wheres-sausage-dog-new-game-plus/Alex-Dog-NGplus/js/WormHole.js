// WormHole
// An extension of the SpaceObject class
// the player has to find the wormhole to win the game
// it hides behind the asteroids

class WormHole extends SpaceObject {
  // constructor(x,y,image)
  // Calls the super constructor
  // Adds properties for being found
  constructor(x, y, image, imgSize) {
    super(x, y, image, imgSize);

    this.found = false;
    this.expandSize = 25;
    this.rotationAngle = 0.01;
  }

  // update()
  // Calls the super update() and rotates when found
  update() {
    if (this.found) {
      this.imgSize += this.expandSize;
      this.angle += this.rotationAngle;
    }
    super.update();
  }

  // Changes the properties when the player finds the wormhole
  onOverlapClick() {
    this.found = true;

    gameState = 'GAMEWIN';
  }


}
