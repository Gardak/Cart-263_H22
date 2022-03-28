class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  create() {
    //create the avater and lock it in the canvas
    this.avatar = this.physics.add.sprite(400, 300, 'avatar');
    this.avatar.setCollideWorldBounds(true);

    //create the object the player must find
    this.goal = this.physics.add.sprite(0, 0, 'rupee');
    //Position the goal object at a random position in the canvas
    Phaser.Actions.RandomRectangle([this.goal], this.physics.world.bounds);

    //Create an enemy slowly chasing after the player
    this.enemy = this.physics.add.sprite(0, 300, 'flowey');

    this.laugh = this.sound.add('laugh');

    //Create a group of obstacles hidding the goal from the player
    this.obstacles = this.physics.add.group({
      key: 'bush',
      quantity: 100,
      //collideWorldBounds: true,
      bounceX: 0.2,
      bounceY: 0.2,
      dragX: 10,
      dragY: 10
    });
    //Position the obstacles at random positions throughout the canvas
    Phaser.Actions.RandomRectangle(this.obstacles.getChildren(), this.physics.world.bounds);

    //Add interactivity when both the avatar and the goal overlap
    this.physics.add.overlap(this.avatar, this.goal, this.getGoal, null, this);
    //Add an effect when the enemy reaches the avatar
    this.physics.add.overlap(this.avatar, this.enemy, this.getWreck, null, this);


    //Add collisions between the avatar and the bushes
    this.physics.add.collider(this.avatar, this.obstacles);
    this.physics.add.collider(this.obstacles, this.obstacles);

    //create inputs to move the avatar around
     this.cursors = this.input.keyboard.createCursorKeys();

     this.score = 0;
     this.scoreText = this.add.text(20, 20, 'Gems: 0', { fontSize: '32px', fill: '#0bde00' });
  }

  //Called when the avatar and the goal overlap
  getGoal(avatar, goal){
    //Reset the goal at a random position within the game's borders
    Phaser.Actions.RandomRectangle([goal], this.physics.world.bounds);

    this.score += 1;
  }



  getWreck(avatar, enemy){
    this.laugh.play();
    Phaser.Actions.RandomRectangle([enemy],this.physics.world.bounds);
    this.score = 0;
  }



  //Funtions needed durint gameplay
  update() {
    this.handleInput();

    //make the obstacles wrap around the screen
    this.physics.world.wrap(this.obstacles,32);
        this.physics.world.wrap(this.enemy,32);
    //Have the enemy chase the avatar
    this.physics.moveToObject(this.enemy, this.avatar, 80);

    this.scoreText.setText('Gems ' + this.score);
  }

  //Setup the inputs to control the avatar
  handleInput() {
    if (this.cursors.left.isDown) {
      this.avatar.setAngularVelocity(-200);
    } else if (this.cursors.right.isDown) {
      this.avatar.setAngularVelocity(200);
    }
    else {
      this.avatar.setAngularVelocity(0);
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.avatar.rotation,
        150,
        this.avatar.body.acceleration
      );
    }
    else {
      this.avatar.setAcceleration(0);
    }

    //this.physics.world.wrap(this.avatar,32);
  }
}
