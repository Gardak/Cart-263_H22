
class Boot extends Phaser.Scene {

  constructor() {
    super({
      key: 'boot'
    });
  }

  preload(){

    //Load in the images/sprites needed for the game's visual
    this.load.image('avatar', 'assets/images/mage.png');
    this.load.image('target', 'assets/images/target.png');
    this.load.image('platformDrag', 'assets/images/platform_earth.png');
    this.load.image('groundFloor', 'assets/images/groundFloor.png');
    this.load.image('earthCrystal', 'assets/images/earth_crystal.png');
    this.load.image('orb', 'assets/images/orb.png');
    this.load.image('weight', 'assets/images/10t.png');
    this.load.image('cloud', 'assets/images/cloud.png');

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
       let loadText = `Cooking the game...`;
       this.loadingText = this.add.text(500, 400, loadText, loadingTextStyle);
  }

  update(){

  }
}
