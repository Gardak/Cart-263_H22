class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  create() {
    //create the player's avatar
    this.avatar = this.physics.add.sprite(10, 720, 'avatar');
    this.avatar.setBounce(0.1);
    this.avatar.setCollideWorldBounds(true);

    //Create floor
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create( 500, 810, 'groundFloor');

    //Create platforms
    this.platformDrag = this.physics.add.sprite( 500, 400, 'platformDrag');
    this.platformDrag.inputEnable = true;
    this.platformDrag.input.enableDrag();
    this.input.on('drag', this.onDrag);

    //Add collision for the avatar and the platforms
    this.physics.add.collider(this.avatar, this.grounds);
    this.physics.add.collider(this.avatar, this.platformDrag);

    //create inputs to move the avatar around
     this.cursors = this.input.keyboard.createCursorKeys();

     //Create a function to trigger with the mouse click
     this.input.on('pointer', this.spellOnClick, this);

  }

  //Funtions needed during gameplay
  update() {
    this.handleInput();
  }

  //Setup the inputs to control the avatar
  handleInput() {
    if (this.cursors.left.isDown) {
      this.avatar.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.avatar.setVelocityX(200);
    }
    else {
      this.avatar.setVelocityX(0);
    }

    if (this.cursors.space.isDown && this.avatar.body.touching.down)
    {
        this.avatar.setVelocityY(-200);
    }
  }

  handlePlatform() {
    this.platformPhys.x = this.platformDrag.x;
    this.platformPhys.y = this.platformDrag.y;
  }

  //Funtion called when mouse is clicked
  //Will serve as the spell/action used with the webcam
  spellOnClick(pointer) {
    var target = this.add.image(pointer.x,pointer.y,'target');

    this.input.mouse.disableContextMenu();
    if (pointer.leftButtonReleased()) {
              target.destroy;
              console.log('left click released!');
            }
  }

  onDrag(pointer, object, dragX, dragY) {
    object.x = dragX;
    object.y = dragY;
  }

}
