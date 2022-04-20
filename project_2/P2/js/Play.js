class Play extends Phaser.Scene {
  constructor() {
    super({
      key: "play",
    });
    //this.FireballGroup;
  }

  create() {

    let groundFloorY = config.height - 25;

    //---------setColor to setAmbientColor 0x000000
    this.lights.enable().setAmbientColor(0x6e6e6e);

    //Insert the brick wall background
    this.background = this.add.image(this.scale.width/2,this.scale.height/2, "brickWall");

    //Place the pillars for the gems
    this.firePillar = this.physics.add.sprite( this.scale.width/2 - 200, this.scale.height - 90, "firePillar");
    this.firePillar.body.allowGravity = false;
    this.firePillar.body.immovable = true;
    this.firePillarLight = this.lights.addLight(this.firePillar.x, this.firePillar.y, 100).setColor(0xcf1a02).setIntensity(2);
    this.firePillarLight.setVisible(false);

    this.icePillar = this.physics.add.sprite( this.scale.width/2 + 200, this.scale.height - 90, "icePillar");
    this.icePillar.body.allowGravity = false;
    this.icePillar.body.immovable = true;
    this.icePillarLight = this.lights.addLight(this.icePillar.x, this.icePillar.y, 100).setColor(0x00bae8).setIntensity(2);
    this.icePillarLight.setVisible(false);

    //Create both gems for the portal
    this.iceGem = this.physics.add.sprite( this.scale.width - 50, this.scale.height/6, "iceGem")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.01, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.iceGem);
    this.iceGemLight = this.lights.addLight( this.iceGem.x, this.iceGem.y, 60).setColor(0x0352fc).setIntensity(2);

    this.fireGem = this.physics.add.sprite( this.scale.width - 50, this.scale.height/6, "fireGem")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.01, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.fireGem);
    this.fireGemLight = this.lights.addLight( this.fireGem.x, this.fireGem.y, 60).setColor(0xcf1a02).setIntensity(2);

    this.stoneGate = this.add.sprite(this.scale.width/2,this.scale.height - 250, "stoneGate");

    //Place the cauldron behind the avatar
    this.cauldronX = this.scale.width - 400;
    this.cauldronY = this.scale.height - 75;
    this.cauldron = this.physics.add.sprite( this.cauldronX, this.cauldronY, "cauldron");
    this.cauldron.body.allowGravity = false;
    this.cauldron.body.immovable = true;

    //create the player's avatar
    this.avatarStartX = 150;
    this.avatarStartY = groundFloorY - 50;
    this.avatar = this.physics.add.sprite(this.avatarStartX, this.avatarStartY, "avatar");
    this.avatar.scepterX = 20;
    this.avatar.setCollideWorldBounds(true);

    //Place the animations
    const rainAnimConfig = {
      key: 'raining',
      frames: 'rain_frames',
      frameRate: 30,
      repeat: -1
    };
    this.anims.create(rainAnimConfig);

    const rain = this.add.sprite( 155, 0, 'rain_frames', 'frame_000');

    //Place the game's platforms
    this.platform1 = this.physics.add.sprite( 150, this.scale.height-190, 'platform1');
    this.platform1.body.allowGravity = false;
    this.platform1.body.immovable = true;

    this.platform3 = this.physics.add.sprite( 390, this.scale.height-70, 'platform3');
    this.platform3.body.allowGravity = false;
    this.platform3.body.immovable = true;

    this.doorOffice = this.physics.add.sprite( this.scale.width-250, 170, 'doorOffice');
    this.doorOffice.body.allowGravity = false;
    this.doorOffice.body.immovable = true;
    this.doorOfficeLight = this.lights.addLight( this.doorOffice.x, this.doorOffice.y, 80).setColor(0xF62100).setIntensity(2);
    this.doorOfficeLight.setVisible(false);

    this.wallOffice = this.physics.add.sprite( this.scale.width-250, 0, 'platform4');
    this.wallOffice.body.allowGravity = false;
    this.wallOffice.body.immovable = true;

    this.platform4 = this.physics.add.sprite( this.scale.width-150, this.scale.height/4, 'platform1');
    this.platform4.body.allowGravity = false;
    this.platform4.body.immovable = true;

    this.balcony = this.physics.add.sprite( 150, 245, 'platform1');
    this.balcony.body.allowGravity = false;
    this.balcony.body.immovable = true;

    this.balconyWall = this.physics.add.sprite( 350, 127, 'balconyWall');
    this.balconyWall.body.allowGravity = false;
    this.balconyWall.body.immovable = true;

    //Place the elements for the cloud potion puzzle
    this.cauldronFire = this.lights.addLight(this.cauldronX, this.scale.height, 110).setColor(0xF62100).setIntensity(2);
    this.potion = this.physics.add.sprite( this.cauldronX + 100, this.scale.height - 435, "potion")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.01, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.potion);
    this.potionLight = this.lights.addLight( this.cauldronX + 100, this.scale.height - 435, 50).setColor(0x0352fc).setIntensity(2);
    this.potionMixSfx = this.sound.add('potionMixSfx');

    //Create a slow floating platform
    this.cloud = this.physics.add.sprite( this.cauldronX, this.cauldronY - 100, "cloud")
      .setGravity(0, -8000)
      .setDamping(true)
      .setDrag(1, 0.00000000001)
      .setCollideWorldBounds(true);
    this.cloud.setVisible(false);
    this.cloud.timer = 0;
    this.cloud.sfx = false;
    this.cloudLight = this.lights.addLight( this.cauldronX, this.cauldronY - 100, 75).setColor(0xffffff).setIntensity(0.2);
    this.cloudLight.setVisible(false);

    //Create the fireball spell
    this.FireballGroup = new FireballGroup(this);
    this.outOfBounds = -200;
    this.lightFireball = this.lights.addLight( this.outOfBounds, this.outOfBounds, 80).setColor(0xF62100).setIntensity(2);
    this.fireballSfx = this.sound.add( 'fireballSfx', {volume: 0.3});
    this.woodBurnSfx = this.sound.add( 'woodBurnSfx', {volume: 1});

    //Effects for the telekinesis spell
    this.telekinesisLight = this.lights.addLight( this.outOfBounds, this.outOfBounds, 150).setColor(0x690c94).setIntensity(1.3);
    this.telekinesisLight.setVisible(false);
    this.telekinesisLight.maxed = false;

    //Create a wooden platform
    //this.woodPlatform =

    //Create floor
    this.grounds = this.physics.add.staticGroup();
    this.grounds.create(this.scale.width/2, groundFloorY, "groundFloor");

    //Create an object which is still affected by gravity the player will have to move
    this.lantern = this.physics.add.sprite(this.avatarStartX + 50, this.avatarStartY, "lantern")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.01, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.lantern);
    this.lanternLight = this.lights.addLight(180, 80, 200).setColor(0xfffa94).setIntensity(2);

    this.crateGreen = this.physics.add.sprite( 50, this.avatarStartY - 20, "crateGreen")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.0001, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.crateGreen);

    this.crateOrange = this.physics.add.sprite( this.scale.width - 40, this.scale.height - 200, "crateOrange")
      .setInteractive()
      .setDamping(true)
      .setDrag(0.0001, 1)
      .setCollideWorldBounds(true);
    this.input.setDraggable(this.crateOrange);

    //Create the "stairs" on the right
    let platformStairX = this.scale.width-50;
    let platformStairY = this.scale.height-160;
    for (let i = 0; i < 3; i++) {
      this.platformStair = this.physics.add
        .sprite(platformStairX, platformStairY, "platform2")
        .setPipeline('Light2D');

      this.platformStair.body.allowGravity = false;
      this.platformStair.body.immovable = true;
      platformStairX += 20;
      platformStairY -= 100;
      this.physics.add.collider(this.platformStair, this.FireballGroup);
      this.physics.add.collider(this.platformStair, this.avatar);
      this.physics.add.collider(this.platformStair, this.lantern);
      this.physics.add.collider(this.platformStair, this.cloud);
      this.physics.add.collider(this.platformStair, this.crateGreen);
      this.physics.add.collider(this.platformStair, this.crateOrange);
      this.physics.add.collider(this.platformStair, this.potion);
    }

    platformStairX = this.scale.width-250;
    platformStairY = this.scale.height-210;
    for (let i = 0; i < 3; i++) {
      this.platformStair = this.physics.add
        .sprite(platformStairX, platformStairY, "platform2")
        .setPipeline('Light2D');

      this.platformStair.body.allowGravity = false;
      this.platformStair.body.immovable = true;
      platformStairX -= 10;
      platformStairY -= 100;
      this.physics.add.collider(this.platformStair, this.FireballGroup);
      this.physics.add.collider(this.platformStair, this.avatar);
      this.physics.add.collider(this.platformStair, this.lantern);
      this.physics.add.collider(this.platformStair, this.cloud);
      this.physics.add.collider(this.platformStair, this.crateGreen);
      this.physics.add.collider(this.platformStair, this.crateOrange);
      this.physics.add.collider(this.platformStair, this.potion);
    }

    this.wallStairs = this.physics.add.sprite( this.scale.width - 310, this.scale.height-290, 'platform4')
    this.wallStairs.body.allowGravity = false;
    this.wallStairs.body.immovable = true;

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
    this.physics.add.collider(this.avatar, this.cloud);
    this.physics.add.collider(this.avatar, this.potion);
    this.physics.add.collider(this.avatar, this.doorOffice);

    this.physics.add.collider(this.lantern, this.cloud);
    this.physics.add.collider(this.lantern, this.FireballGroup);
    this.physics.add.collider(this.lantern, this.grounds);
    this.physics.add.collider(this.lantern, this.firePillar);
    this.physics.add.collider(this.lantern, this.potion);

    this.physics.add.collider(this.potion, this.cauldron, this.potionMix);
    this.physics.add.collider(this.grounds, this.FireballGroup);
    this.physics.add.collider(this.grounds, this.potion);

    this.physics.add.collider(this.crateGreen, this.FireballGroup);
    this.physics.add.collider(this.crateGreen, this.avatar);
    this.physics.add.collider(this.crateGreen, this.lantern);
    this.physics.add.collider(this.crateGreen, this.cloud);
    this.physics.add.collider(this.crateGreen, this.grounds);
    this.physics.add.collider(this.crateGreen, this.potion);
    this.physics.add.collider(this.crateGreen, this.crateOrange);

    this.physics.add.collider(this.crateOrange, this.FireballGroup);
    this.physics.add.collider(this.crateOrange, this.avatar);
    this.physics.add.collider(this.crateOrange, this.lantern);
    this.physics.add.collider(this.crateOrange, this.cloud);
    this.physics.add.collider(this.crateOrange, this.grounds);
    this.physics.add.collider(this.crateOrange, this.potion);

    this.physics.add.collider(this.iceGem, this.FireballGroup);
    this.physics.add.collider(this.iceGem, this.avatar);
    this.physics.add.collider(this.iceGem, this.lantern);
    this.physics.add.collider(this.iceGem, this.cloud);
    this.physics.add.collider(this.iceGem, this.grounds);
    this.physics.add.collider(this.iceGem, this.icePillar, this.iceGemPlaced);

    this.physics.add.collider(this.platform1, this.FireballGroup);
    this.physics.add.collider(this.platform1, this.avatar);
    this.physics.add.collider(this.platform1, this.lantern);
    this.physics.add.collider(this.platform1, this.crateGreen);
    this.physics.add.collider(this.platform1, this.crateOrange);
    this.physics.add.collider(this.platform1, this.potion);
    this.physics.add.collider(this.platform1, this.iceGem);

    this.physics.add.collider(this.platform3, this.FireballGroup);
    this.physics.add.collider(this.platform3, this.avatar);
    this.physics.add.collider(this.platform3, this.lantern);
    this.physics.add.collider(this.platform3, this.crateGreen);
    this.physics.add.collider(this.platform3, this.crateOrange);
    this.physics.add.collider(this.platform3, this.potion);
    this.physics.add.collider(this.platform3, this.iceGem);

    this.physics.add.collider(this.platform4, this.FireballGroup);
    this.physics.add.collider(this.platform4, this.avatar);
    this.physics.add.collider(this.platform4, this.lantern);
    this.physics.add.collider(this.platform4, this.crateGreen);
    this.physics.add.collider(this.platform4, this.crateOrange);
    this.physics.add.collider(this.platform4, this.potion);
    this.physics.add.collider(this.platform4, this.iceGem);

    this.physics.add.collider(this.balcony, this.FireballGroup);
    this.physics.add.collider(this.balcony, this.avatar);
    this.physics.add.collider(this.balcony, this.lantern);
    this.physics.add.collider(this.balcony, this.crateGreen);
    this.physics.add.collider(this.balcony, this.crateOrange);
    this.physics.add.collider(this.balcony, this.fireGem);
    this.physics.add.collider(this.balcony, this.iceGem);

    this.physics.add.collider(this.wallStairs, this.FireballGroup);
    this.physics.add.collider(this.wallStairs, this.avatar);

    this.physics.add.collider(this.wallStairs, this.FireballGroup);
    this.physics.add.collider(this.wallStairs, this.avatar);

    this.physics.add.collider(this.doorOffice, this.FireballGroup, this.woodBurn);


    rain.play('raining');

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
    this.crateOrange.setPipeline('Light2D');
    this.potion.setPipeline('Light2D');
    this.iceGem.setPipeline('Light2D');
    this.fireGem.setPipeline('Light2D');

    this.firePillar.setPipeline('Light2D');
    this.icePillar.setPipeline('Light2D');
    this.stoneGate.setPipeline('Light2D');
    this.cauldron.setPipeline('Light2D');

    this.cloud.setPipeline('Light2D');

    this.platform1.setPipeline('Light2D');
    this.platform3.setPipeline('Light2D');
    this.platform4.setPipeline('Light2D');
    this.balcony.setPipeline('Light2D');
    this.wallStairs.setPipeline('Light2D');
    this.wallOffice.setPipeline('Light2D');
    this.doorOffice.setPipeline('Light2D');

    rain.setPipeline('Light2D');

    //Create inputs to toggle spells
    this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
  }

  //Funtions needed during gameplay
  update() {
    this.handleInput();
    this.handleSpells();
    this.handlePhysics();
    this.handleObjectives();
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
      this.avatar.setVelocityY(-400);
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

      if (this.telekinesisLight.maxed){
        this.telekinesisLight.radius -= 0.5;
      } else {
        this.telekinesisLight.radius += 0.5;
      }

      if (this.telekinesisLight.radius >= 150){
        this.telekinesisLight.maxed = true;
      } else if(this.telekinesisLight.radius <= 75) {
        this.telekinesisLight.maxed = false;
      }
  }

  handlePhysics(){
    this.lanternLight.x = this.lantern.x;
    this.lanternLight.y = this.lantern.y;

    this.potionLight.x = this.potion.x;
    this.potionLight.y = this.potion.y;

    this.iceGemLight.x = this.iceGem.x;
    this.iceGemLight.y = this.iceGem.y;

    this.fireGemLight.x = this.fireGem.x;
    this.fireGemLight.y = this.fireGem.y;

    this.cauldronFire.intensity += 0.1;
    if (this.cauldronFire.intensity >= 3){
      this.cauldronFire.intensity = 1.5;
    }

    if (!this.potion.active) {
        this.potionLight.setVisible(false);
        this.cloudLight.setVisible(true);
        this.cloudLight.x = this.cloud.x;
        this.cloudLight.y = this.cloud.y;
        this.cloudPotion();
    }

    if (this.doorOffice.isBurning && this.doorOffice.active){
      if (!this.woodBurnSfx.played) {
        this.woodBurnSfx.play();
        this.woodBurnSfx.played = true;
      }
      this.doorOfficeLight.setVisible(true);
      this.doorOffice.burnTimer -= 1;

      this.doorOfficeLight.intensity += 0.07;
      if (this.doorOfficeLight.intensity >= 3){
        this.doorOfficeLight.intensity = 1.5;
      }

      if (this.doorOffice.burnTimer <= 0){
        this.doorOffice.setActive(false);
        this.doorOffice.setVisible(false);
        this.doorOfficeLight.setVisible(false);
        this.doorOffice.destroy();
      }
    }
  }

  handleObjectives() {
    if (this.iceGem.isPlaced){
      this.icePillar.setTint(0x00bae8);
      this.icePillarLight.setVisible(true);
    }
  }

  potionMix(potion) {
    potion.setVisible(false);
    potion.setActive(false);
  }

  cloudPotion() {
    if (this.cloud.y <= 70){
      this.cloud.timer = 90;
      if (!this.cloud.sfx){
        this.potionMixSfx.play();
        this.cloud.sfx = true;
      }
    }

    this.cloud.timer -= 1;

    if (this.cloud.timer >= 0 || !this.cloud.visible){
      this.cloud.y = this.cauldron.y - 40;
    }

    this.cloud.x = this.cauldron.x;

    this.cloud.setVisible(true);
  }

  woodBurn(wood) {
    wood.setTint(0x5c0000);
    wood.burnTimer = 180;
    wood.isBurning = true;
  }

  iceGemPlaced(iceGem){
    iceGem.isPlaced = true;
  }

  onDrag(pointer, object, dragX, dragY, avatar) {

    this.telekinesisLenght = Phaser.Math.Distance.Between( this.avatar.x, this.avatar.y, object.x, object.y);
//|| this.telekinesisLenght > this.telekinesisLenghtMax      ---add in the if statement
    if (this.spellSelected !== "telekinesis" ) {
      this.onDragEnd( pointer, object);
      return;
    }


    object.x = dragX;
    object.y = dragY;

    this.telekinesisLight.x = object.x;
    this.telekinesisLight.y = object.y;

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

    this.telekinesisLight.setVisible(true);

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
    this.telekinesisLight.setVisible(false);

    object.body.allowGravity = true;
    object.body.immovable = false;
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

    if(!this.FireballGroup.children.entries[0].active){
      this.fireballSfx.play();
    }

    this.FireballGroup.sendFireball(this.avatar.x + this.avatar.scepterX, this.avatar.y - 20, angle, pX, pY);

  });
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

    this.fireballSpeed = 1500;

    this.setPipeline('Light2D');
    this.body.reset(x,y);
    this.rotation = angle;
    this.setActive(true);
    this.setVisible(true);

    this.vx = Math.cos(angle) * this.fireballSpeed;
    this.vy = Math.sin(angle) * this.fireballSpeed;

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

    this.x = this.outOfBounds;
    this.y = this.outOfBounds;
    this.isFlying = false;
  }

}
