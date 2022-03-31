class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
  }

  create() {
    //create the player's avatar
    this.avatar = this.physics.add.sprite(10, 720, 'avatar');
    this.avatar.setCollideWorldBounds(true);

    //Create floor
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create( 500, 810, 'groundFloor');

    //Create an object which is still impacted by gravity the player will have to move
    this.weight = this.physics.add.sprite( 800, 100, 'weight')
                          .setInteractive()
                          .setGravity(0, 1000)
                          .setCollideWorldBounds(true);

    this.input.setDraggable(this.weight);

    //Create a slow floating platform
    this.cloud = this.physics.add.sprite( 100, 700, 'cloud')
                          .setInteractive()
                          .setGravity(0, -400)
                          .setDamping(true)
                          .setDrag(0.005)
                          .setCollideWorldBounds(true);

                        console.log(this.cloud);

    this.input.setDraggable(this.cloud);


    //Create platforms
    let platformY = 100;
    for (let i = 0; i < 3; i++) {
      this.platformDrag = this.physics.add.image( 500, platformY, 'platformDrag')
                            .setInteractive()
                            .setCollideWorldBounds(true);


      this.platformDrag.body.allowGravity = false;
      this.platformDrag.body.immovable = true;
      this.input.setDraggable(this.platformDrag);
      platformY = platformY + 100;
      this.physics.add.collider(this.grounds, this.platformDrag);
      this.physics.add.collider(this.avatar, this.platformDrag);
      this.physics.add.collider(this.weight, this.platformDrag);
    };





    //Functions when the player drags the objects around
    this.input.on('drag', this.onDrag);
    this.input.on('dragend', this.onDragEnd);

    //Add collision between objects
    this.physics.add.collider(this.avatar, this.grounds);
    this.physics.add.collider(this.avatar, this.weight);
    this.physics.add.collider(this.avatar, this.cloud);
    this.physics.add.collider(this.weight, this.cloud);
    this.physics.add.collider(this.cloud, this.grounds);
    this.physics.add.collider(this.weight, this.grounds);


    //create inputs to move the avatar around
     this.cursors = this.input.keyboard.createCursorKeys();

  }

  //Funtions needed during gameplay
  update() {
    this.handleInput();
    //this.handlePhysics();
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
        this.avatar.setVelocityY(-175);
        console.log(this.platformDrag);
    }
  }

  // handlePhysics(){
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
    object.body.allowGravity = false;
    object.body.immovable = true;
  }

  onDragEnd(pointer, object){

    this.orbGroupLine.setActive(false).setVisible(false);
    switch (object.texture.key) {
      case 'weight':
      case 'cloud':
        object.body.allowGravity = true;
        object.body.immovable = false;
      break;

      case 'platformDrag' :
      break;
    }


  }

}
