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

    //Create a group of obstacles hidding the goal from the player
    this.obstacles = this.physics.add.group({
      key: 'bush',
      quantity: 120,
      collideWorldBounds: true,
      bounceX: 0.8,
      bounceY: 0.8,
      dragX: 20,
      dragY: 20
    });
    //Position the obstacles at random positions throughout the canvas
    Phaser.Actions.RandomRectangle(this.obstacles.getChildren(), this.physics.world.bounds);

    //Add interactivity when both the avatar and the goal overlap
    this.physics.add.overlap(this.avatar, this.goal, this.getGoal, null, this);

    //Add collisions between the avatar and the bushes
    this.physics.add.collider(this.avatar, this.obstacles);
    this.physics.add.collider(this.obstacles, this.obstacles);

    //create inputs to move the avatar around
     this.cursors = this.input.keyboard.createCursorKeys();
  }

  //Called when the avatar and the goal overlap
  getGoal(avatar, goal){
    //Reset the goal at a random position within the game's borders
    Phaser.Actions.RandomRectangle([goal], this.physics.world.bounds);
  }

  //Funtions needed durint gameplay
  update() {
    this.handleInput();
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
  }
}
