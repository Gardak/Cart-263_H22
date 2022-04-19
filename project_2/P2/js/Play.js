class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
    //this.FireballGroup;
  }

  create() {

    let groundFloorY = config.height - 25;

    this.lights.enable().setAmbientColor(0x333333);
    this.lightLantern = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);


    //Insert the brick wall background
    this.background = this.add.image(this.scale.width/2,this.scale.height/2, "brickWall");

    //Place the pillars and the exit door
    this.firePillar = this.add.sprite(this.scale.width/2 - 200,this.scale.height - 90, "firePillar");
    this.icePillar = this.add.sprite(this.scale.width/2 + 200,this.scale.height - 90, "icePillar");
    this.stoneGate = this.add.sprite(this.scale.width/2,this.scale.height - 250, "stoneGate");

    //Place the game's platforms
    this.platform1 = this.physics.add.sprite( 150, this.scale.height-190, 'platform1')
    this.platform1.body.allowGravity = false;
    this.platform1.body.immovable = true;

    this.platform2 = this.physics.add.sprite( 600, this.scale.height-190, 'platform2')
    this.platform2.body.allowGravity = false;
    this.platform2.body.immovable = true;

    this.platform3 = this.physics.add.sprite( 390, this.scale.height-70, 'platform3')
    this.platform3.body.allowGravity = false;
    this.platform3.body.immovable = true;



    //create the player's avatar
    this.avatarStartX = 150;
    this.avatarStartY = groundFloorY - 50;
    this.avatar = this.physics.add.sprite(this.avatarStartX, this.avatarStartY, "avatar");
    this.avatar.scepterX = 20;
    this.avatar.setCollideWorldBounds(true);

    //Create the fireball spell
    this.FireballGroup = new FireballGroup(this);
    this.fireballOut = -200;
    this.lightFireball = this.lights.addLight( this.fireballOut, this.fireballOut, 80).setColor(0xF62100).setIntensity(2);

    //Create a wooden platform
    //this.woodPlatform =

    //Create floor
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(this.scale.width/2, groundFloorY, "groundFloor");

    //Create an object which is still affected by gravity the player will have to move
    this.lantern = this.physics.add.sprite(this.avatarStartX + 50, this.avatarStartY, "lantern")
      .setInteractive()
      .setGravity(0, 1000)
      .setDamping(true)
      .setDrag(0.01, 1)
      .setCollideWorldBounds(true);

    this.input.setDraggable(this.lantern);

    this.crateGreen = this.physics.add.sprite( 50, this.avatarStartY - 20, "crateGreen")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.0001, 1)
      .setCollideWorldBounds(true);

    this.input.setDraggable(this.crateGreen);

    //Create a slow floating platform
    this.cloud = this.physics.add.sprite(100, 700, "cloud")
      .setInteractive()
      .setGravity(0, -350)
      .setDamping(true)
      .setCollideWorldBounds(true);

    this.input.setDraggable(this.cloud);

    //Create platforms
    let platformY = 100;
    for (let i = 0; i < 3; i++) {
      this.platformDrag = this.physics.add
        .image(500, platformY, "platformDrag")
        .setInteractive()
        .setCollideWorldBounds(true)
        .setPipeline('Light2D');

      this.platformDrag.body.allowGravity = false;
      this.platformDrag.body.immovable = true;
      this.input.setDraggable(this.platformDrag);
      platformY = platformY + 100;
      this.physics.add.collider(this.grounds, this.platformDrag);
      this.physics.add.collider(this.avatar, this.platformDrag);
      this.physics.add.collider(this.lantern, this.platformDrag);
      this.physics.add.collider(this.cloud, this.platformDrag);
      this.physics.add.collider(this.FireballGroup, this.platformDrag);
    }

    //Create the spell slots for the player
    let spellBarX = 25;
    this.telekinesisImg = this.add.image(
      spellBarX,
      config.height - 25,
      "telekinesisIcon"
    );
    this.fireballImg = this.add.image(
      spellBarX * 3,
      config.height - 25,
      "fireballIcon"
    );
    this.fireballImg.setTint(255, 255, 255);
    this.spellSelected = "telekinesis";

    //Functions when the player drags the objects around
    this.input.on("drag", this.onDrag.bind(this));
    this.input.on("dragend", this.onDragEnd.bind(this));
    this.telekinesisLenghtMax = 200;
    this.telekinesisLenght = 0;
    this.telekinesisCircle = this.add.image( this.avatar.x, this.avatar.y, "circle");
    this.telekinesisCircle.setVisible(false);

    //Add collision between objects
    this.physics.add.collider(this.avatar, this.grounds);
    this.physics.add.collider(this.avatar, this.lantern);
    this.physics.add.collider(this.avatar, this.cloud);

    this.physics.add.collider(this.lantern, this.cloud);
    this.physics.add.collider(this.lantern, this.FireballGroup);
    this.physics.add.collider(this.lantern, this.grounds);
    this.physics.add.collider(this.lantern, this.firePillar);

    this.physics.add.collider(this.cloud, this.grounds);
    this.physics.add.collider(this.cloud, this.FireballGroup);

    this.physics.add.collider(this.grounds, this.FireballGroup);

    this.physics.add.collider(this.crateGreen, this.FireballGroup);
    this.physics.add.collider(this.crateGreen, this.avatar);
    this.physics.add.collider(this.crateGreen, this.lantern);
    this.physics.add.collider(this.crateGreen, this.cloud);
    this.physics.add.collider(this.crateGreen, this.grounds);

    this.physics.add.collider(this.platform1, this.FireballGroup);
    this.physics.add.collider(this.platform1, this.avatar);
    this.physics.add.collider(this.platform1, this.lantern);
    this.physics.add.collider(this.platform1, this.cloud);
    this.physics.add.collider(this.platform1, this.crateGreen);

    this.physics.add.collider(this.platform2, this.FireballGroup);
    this.physics.add.collider(this.platform2, this.avatar);
    this.physics.add.collider(this.platform2, this.lantern);
    this.physics.add.collider(this.platform2, this.cloud);
    this.physics.add.collider(this.platform2, this.crateGreen);

    this.physics.add.collider(this.platform3, this.FireballGroup);
    this.physics.add.collider(this.platform3, this.avatar);
    this.physics.add.collider(this.platform3, this.lantern);
    this.physics.add.collider(this.platform3, this.cloud);
    this.physics.add.collider(this.platform3, this.crateGreen);

    //create inputs to move the avatar around
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    //Apply the lighting effect on every objects
    this.background.setPipeline('Light2D');
    this.avatar.setPipeline('Light2D');
    this.lantern.setPipeline('Light2D');
    this.crateGreen.setPipeline('Light2D');

    this.firePillar.setPipeline('Light2D');
    this.icePillar.setPipeline('Light2D');
    this.stoneGate.setPipeline('Light2D');

    this.cloud.setPipeline('Light2D');

    this.platform1.setPipeline('Light2D');
    this.platform2.setPipeline('Light2D');
    this.platform3.setPipeline('Light2D');

    //Create inputs to toggle spells
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  }

  //Funtions needed during gameplay
  update() {
    this.handleInput();
    this.handleSpells();
    this.handlePhysics();
  }

  //Setup the inputs to control the avatar
  handleInput() {
    //Avatar's movement
    if (this.keyLeft.isDown) {
      this.avatar.setVelocityX(-200);
      this.avatar.flipX = true;
      this.avatar.scepterX = -20;
    } else if (this.keyRight.isDown) {
      this.avatar.setVelocityX(200);
      this.avatar.flipX = false;
      this.avatar.scepterX = 20;

    } else {
      this.avatar.setVelocityX(0);
    }

    //Avatar's jump
    if (this.cursors.space.isDown && this.avatar.body.touching.down) {
      this.avatar.setVelocityY(-175);
    }

    //Avatar's spells
    if (this.key1.isDown) {
      this.spellSelected = "telekinesis";
      this.telekinesisImg.clearTint();
      this.fireballImg.setTint(255, 255, 255);
    } else if (this.key2.isDown) {
      this.spellSelected = "fireball";
      this.telekinesisImg.setTint(255, 255, 255);
      this.fireballImg.clearTint();
    }
  }

  handleSpells(){
      this.launchFireball();
      if (this.FireballGroup.children.entries[0].isFlying) {
        this.lightFireball.setVisible(true);
      } else {
        this.lightFireball.setVisible(false);
      }
      this.telekinesisCircle.rotation += 0.001;

  }

  handlePhysics(){
    this.lightLantern.x = this.lantern.x;
    this.lightLantern.y = this.lantern.y;
  }

  onDrag(pointer, object, dragX, dragY, avatar) {

    this.telekinesisLenght = Phaser.Math.Distance.Between( this.avatar.x, this.avatar.y, object.x, object.y);
    //console.log(this.telekinesisLenght);

    if (this.spellSelected !== "telekinesis" || this.telekinesisLenght > this.telekinesisLenghtMax) {
      this.onDragEnd( pointer, object);
      return;
    }


    object.x = dragX;
    object.y = dragY;

    if (this.orbGroupLine) {
      this.orbGroupLine.setActive(false).setVisible(false);
    }
    this.grabLine = new Phaser.Geom.Line(
      this.avatar.x + this.avatar.scepterX,
      this.avatar.y - 20,
      object.x,
      object.y
    );
    this.orbGroupLine = this.add.group({
      key: "telekinesis",
      frameQuantity: 20,
    });

    this.telekinesisCircle.x = this.avatar.x;
    this.telekinesisCircle.y = this.avatar.y;
    this.telekinesisCircle.setVisible(true);


    Phaser.Actions.PlaceOnLine(this.orbGroupLine.getChildren(), this.grabLine);
    object.body.allowGravity = false;
    object.body.immovable = true;
  }

  onDragEnd(pointer, object) {

    if (this.spellSelected !== "telekinesis") {
      return;
    }

    this.orbGroupLine.setActive(false).setVisible(false);
    this.telekinesisCircle.setVisible(false);

    switch (object.texture.key) {

      case "cloud":
      case "crateGreen":
      case "lantern":
      object.body.allowGravity = true;
      object.body.immovable = false;
      break;

      case "platformDrag":
        break;

    }
  }

//Function called when the player mouse clicks with the fireball spell selected
launchFireball() {
  this.input.on("pointerdown", (pointer) => {
    if (this.spellSelected !== "fireball") {
      return;
    }
    let angle = Phaser.Math.Angle.Between(
      this.avatar.x,
      this.avatar.y,
      pointer.x,
      pointer.y
    );
    let pX = pointer.x;
    let pY = pointer.y;
    this.FireballGroup.sendFireball(this.avatar.x + this.avatar.scepterX, this.avatar.y - 20, angle, pX, pY);

  });
  console.log(this.FireballGroup);
  this.lightFireball.x = this.FireballGroup.children.entries[0].x;
  this.lightFireball.y = this.FireballGroup.children.entries[0].y;

}
}

//Create a group of fireball to cycle through
class FireballGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Fireball,
      frameQuantity: 1,
      active: false,
      visible: false,
      key: "fireball",
    });
  }

  //The fireball movement
  sendFireball( x, y, angle, px, py) {
    const fire = this.getFirstDead(false);
    if (fire) {
      fire.ball( x, y, angle, px, py);
    }

  }
}




class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fireball");
  }

  //The fireball visual properties
  ball( x, y, angle, px, py) {

    this.setPipeline('Light2D');
    this.body.reset(x,y);
    this.rotation = angle;
    this.setActive(true);
    this.setVisible(true);

    this.vx = Math.cos(angle) * 900;
    this.vy = Math.sin(angle) * 900;

    this.setVelocity( this.vx, this.vy);
    this.isFlying = true;

  }

  //Update the location of the fireball
  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if(this.y <= 0 || this.y >= 900 || this.x <= 0 || this.x >= 1900 || !this.body.touching.none) {
      this.hitSomething();
    }
  }

  //Function when the fireball leaves the screen or interacts with hits something
  hitSomething() {
    this.setActive(false);
    this.setVisible(false);
    this.isFlying = false;

    this.x = this.fireballOut;
    this.y = this.fireballOut;
    this.isFlying = false;
  }

}
