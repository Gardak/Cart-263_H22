
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
    this.load.image('platformDrag', 'assets/images/platform.png');
    this.load.image('groundFloor', 'assets/images/groundFloor.png');

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
