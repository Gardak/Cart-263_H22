// A class with the display characteristic of the space objects

class SpaceObject {
// Create the position, angle and image properties
  constructor(x, y, image, imgSize) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.imgSize = imgSize;

    this.angle = 5;
  }

  // update()
  // Use the display method in the script
  update() {
    this.display();
    // console.log('SpaceObject update()');
  }

  // display()
  // Show and move the objects on the canvas
  display() {
    push();

    imageMode(CENTER);
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image, 0, 0, this.imgSize, this.imgSize);

    pop();
  }

  // mousePressed()
  // Checks if the player has clicked on an object
  mousePressed() {
    let overlapped = false;
    let d = dist(this.x, this.y, mouseX, mouseY);

    if (d < this.imgSize / 2) {
      this.onOverlapClick();
      overlapped = true;
    }

    return overlapped
  }

}
