
class Boot extends Phaser.Scene {

  constructor() {
    super({
      key: 'boot'
    });
  }

  preload(){

    //Load in the images/sprites needed for the player
    this.load.image('avatar', 'assets/images/mage.png');
    this.load.image('telekinesisIcon', 'assets/images/spells/telekinesis_icon.png');
    this.load.image('telekinesis', 'assets/images/spells/telekinesis.png');
    this.load.image('circle', 'assets/images/spells/circle.png');
    this.load.image('fireballIcon', 'assets/images/spells/fireball_icon.png');
    this.load.image('fireball', 'assets/images/spells/fireball.png');

    //Load in the level structure
    this.load.image('groundFloor', 'assets/images/groundFloor.png');
    this.load.image('brickWall', 'assets/images/brick_wall.png');
    this.load.image('firePillar', 'assets/images/decor/fire_pillar.png');
    this.load.image('icePillar', 'assets/images/decor/ice_pillar.png');
    this.load.image('stoneGate', 'assets/images/decor/stone_gate.png');
 

    //Load in the platforms
    this.load.image('platform1', 'assets/images/platforms/platform-1.png');
    this.load.image('platform2', 'assets/images/platforms/platform-2.png');
    this.load.image('platform3', 'assets/images/platforms/platform-3.png');

    //Load in the dragable objects
    this.load.image('platformDrag', 'assets/images/platform_earth.png');
    this.load.image('lantern', 'assets/images/objects/lantern.png');
    this.load.image('cloud', 'assets/images/cloud.png');
    this.load.image('crateGreen', 'assets/images/objects/crate_metal-green.png');


    //Load in the objectives
    this.load.image('earthCrystal', 'assets/images/earth_crystal.png');


    this.load.on('complete', () => { this.scene.start('play'); });
  }

  create(){
    //Loading screen
       let loadingTextStyle = {
         fontFamily: "sans-serif",
         fontSize: "40px",
         fill: "#ffffff",
         align: "center"
       };
       let loadText = `Enchanting the code...`;
       this.loadingText = this.add.text(500, 400, loadText, loadingTextStyle);
  }

  update(){

  }
}
