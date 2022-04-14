
class Boot extends Phaser.Scene {

  constructor() {
    super({
      key: 'boot'
    });
  }

  preload(){

    this.load.image('avatar', 'assets/images/avatar.png');
    this.load.image('rupee', 'assets/images/rupee.png');
    this.load.image('bush', 'assets/images/bush.png');
    this.load.image('flowey', 'assets/images/flowey.png');

    this.load.audio('laugh', 'assets/sounds/flowey-laugh.mp3');
    this.load.audio('getRupee', 'assets/sounds/pickup.mp3');

    this.load.on('complete', () => { this.scene.start('play'); });
  }

  create(){

  }

  update(){

  }
}
