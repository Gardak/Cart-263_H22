class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
    //this.FireballGroup;
  }

  create() {
    let groundFloorY = config.height - 25;

    //create the player's avatar
    this.avatar = this.physics.add.sprite(10, groundFloorY - 50, "avatar");
    this.avatar.setCollideWorldBounds(true);

    //Create the fireball spell
    //this.FireballGroup = new FireballGroup(this);

    //Create floor
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(500, groundFloorY, "groundFloor");

    //Create an object which is still impacted by gravity the player will have to move
    this.weight = this.physics.add
      .sprite(800, 100, "weight")
      .setInteractive()
      .setGravity(0, 1000)
      .setDamping(true)
      .setDragX(0.00001)
      .setCollideWorldBounds(true);

    this.input.setDraggable(this.weight);

    //Create a slow floating platform
    this.cloud = this.physics.add
      .sprite(100, 700, "cloud")
      .setInteractive()
      .setGravity(0, -350)
      .setDamping(true)
      .setDrag(0.005)
      .setCollideWorldBounds(true);

    this.input.setDraggable(this.cloud);

    //Create platforms
    let platformY = 100;
    for (let i = 0; i < 3; i++) {
      this.platformDrag = this.physics.add
        .image(500, platformY, "platformDrag")
        .setInteractive()
        .setCollideWorldBounds(true);

      this.platformDrag.body.allowGravity = false;
      this.platformDrag.body.immovable = true;
      this.input.setDraggable(this.platformDrag);
      platformY = platformY + 100;
      this.physics.add.collider(this.grounds, this.platformDrag);
      this.physics.add.collider(this.avatar, this.platformDrag);
      this.physics.add.collider(this.weight, this.platformDrag);
      this.physics.add.collider(this.cloud, this.platformDrag);
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

    //Add collision between objects
    this.physics.add.collider(this.avatar, this.grounds);
    this.physics.add.collider(this.avatar, this.weight);
    this.physics.add.collider(this.avatar, this.cloud);
    this.physics.add.collider(this.weight, this.cloud);
    this.physics.add.collider(this.cloud, this.grounds);
    this.physics.add.collider(this.weight, this.grounds);

    //create inputs to move the avatar around
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyRight = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D
    );

    //Create inputs to toggle spells
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  }

  //Funtions needed during gameplay
  update() {
    this.handleInput();
    this.handleSpells();
  }

  //Setup the inputs to control the avatar
  handleInput() {
    //Avatar's movement
    if (this.keyLeft.isDown) {
      this.avatar.setVelocityX(-200);
      this.avatar.flipX = true;
    } else if (this.keyRight.isDown) {
      this.avatar.setVelocityX(200);
      this.avatar.flipX = false;
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
  }

  // handlePhysics(){
  //
  // }

  launchFireball() {
    if (this.spellSelected !== "fireball") {
      return;
    }
    this.input.on("pointerdown", (pointer) => {
      this.FireballGroup.sendFireball(this.avatar.x + 20, this.avatar.y - 20);
    });
  }

  onDrag(pointer, object, dragX, dragY, avatar) {
    console.log(this.spellSelected);
    if (this.spellSelected !== "telekinesis") {
      return;
    }
    object.x = dragX;
    object.y = dragY;

    if (this.orbGroupLine) {
      this.orbGroupLine.setActive(false).setVisible(false);
    }
    this.grabLine = new Phaser.Geom.Line(
      this.avatar.x + 20,
      this.avatar.y - 20,
      object.x,
      object.y
    );
    this.orbGroupLine = this.add.group({
      key: "telekinesis",
      frameQuantity: 10,
    });
    Phaser.Actions.PlaceOnLine(this.orbGroupLine.getChildren(), this.grabLine);
    object.body.allowGravity = false;
    object.body.immovable = true;
  }

  onDragEnd(pointer, object) {
    if (this.spellSelected !== "telekinesis") {
      return;
    }
    this.orbGroupLine.setActive(false).setVisible(false);
    switch (object.texture.key) {
      case "weight":
      case "cloud":
        object.body.allowGravity = true;
        object.body.immovable = false;
        break;

      case "platformDrag":
        break;
    }
  }
}

class FireballGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      classType: Fireball,
      frameQuantity: 20,
      active: false,
      visible: false,
      key: "fireball",
    });
  }

  sendFireball( x, y) {
    const fire = this.getFirstDead(false);
    if (fire) {
      fire.ball( x, y);
    }
  }

}

class Fireball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "fireball");
  }

  ball( x, y) {
    this.body.reset(x,y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-900);
  }
}
