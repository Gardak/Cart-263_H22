
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
    this.load.image('fireballIcon', 'assets/images/spells/fireball_icon.png');
    this.load.image('fireball', 'assets/images/spells/fireball.png');

    //Load in the level structure
    this.load.image('groundFloor', 'assets/images/groundFloor.png');

    //Load in the dragable objects
    this.load.image('platformDrag', 'assets/images/platform_earth.png');
    this.load.image('weight', 'assets/images/10t.png');
    this.load.image('cloud', 'assets/images/cloud.png');

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
