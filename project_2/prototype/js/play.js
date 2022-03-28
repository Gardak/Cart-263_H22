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
    let platformY = 100;
    for (let i = 1; i < 3; i++) {
      this.platformDrag = this.physics.add.image( 500, platformY, 'platformDrag')
                            .setInteractive()
                            .setCollideWorldBounds(true);


      this.platformDrag.body.allowGravity = false;
      this.platformDrag.body.immovable = true;
      this.input.setDraggable(this.platformDrag);
      platformY = platformY + 100;
      this.physics.add.collider(this.grounds, this.platformDrag);
      this.physics.add.collider(this.avatar, this.platformDrag);
    };

    this.input.on('drag', this.onDrag);
    this.input.on('dragend', this.onDragEnd);

    //Add collision for the avatar and the platforms
    this.physics.add.collider(this.avatar, this.grounds);


    //create inputs to move the avatar around
     this.cursors = this.input.keyboard.createCursorKeys();

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
        this.avatar.setVelocityY(-300);
    }
    //Create a function to trigger with the mouse click
    //this.input.on('pointer', this.spellOnClick, this);
    //console.log(this);

  }

  //Funtion called when mouse is clicked
  //Will serve as the spell/action used with the webcam
  // spellOnClick(pointer) {
  //   var target = this.add.image(pointer.x,pointer.y,'target');
  //
  //   this.input.mouse.disableContextMenu();
  //
  // }

  onDrag(pointer, object, dragX, dragY, avatar) {
    object.x = dragX;
    object.y = dragY;

    if(this.orbGroupLine){
      this.orbGroupLine.setActive(false).setVisible(false);
    }
    this.grabLine = new Phaser.Geom.Line(
      this.scene.avatar.x,
       this.scene.avatar.y,
       object.x,
       object.y);
    this.orbGroupLine = this.scene.add.group({
      key:'orb',
      frameQuantity: 10
    });
    Phaser.Actions.PlaceOnLine(this.orbGroupLine.getChildren(), this.grabLine);

  }

  onDragEnd(pointer, object){
    this.orbGroupLine.setActive(false).setVisible(false);
  }

}
