class Fighter {

constructor (width, height, img, punchImg) {
    this.witdh = width;
    this.height = height;
    this.img = img;
    this.punchImg = punchImg;
    this.idleImg = img;
    this.imgSizeX = 100;
    this.imgSizeY = 200;


    this.maxLife = 100;
    this.life = 100;
    this.lifeLenghtMax = width/3;
    this.lifeLenght = width/3;

    this.dmg = 10;
    this.canTakeDmg = true;
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
  image(this.img, 0, 0, this.imgSizeX, this.imgSizeY);

  pop();
}

lifeBar(){

  push();
  strokeWeight(10);
  stroke(200, 230, 15);
  noFill();
  rect(this.lifeBarX, this.lifeBarY, (width/3), (height/20));
  pop();

  push();
  noStroke();
  fill(20,220,10);
  this.lifeLenght = map(this.life, 0, this.maxLife, 0, this.lifeLenghtMax);
  rect(this.lifeBarX, this.lifeBarY, this.lifeLenght, (height/20));
  //console.log(this.lifeLenght);
  pop();
}

}
