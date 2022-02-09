//Class for every objects floating in the game

class FloatingObjects{
  constructor( x, y, img, imgSize, vx, vy){
    this.x = x;
    this.y = y;

    this.img = img;
    this.imgSize = imgSize;

    this.vx = vx;
    this.vy = vy;
  }
}

//Used as the update method in the script
update() {
  this.display();
  this.interactPlayer();
}

display() {

  push();
  imageMode(CENTER);
  image(this.x, this.y, this.imgSize, this.imgSize);
  pop();
}

interactPlayer() {
}
