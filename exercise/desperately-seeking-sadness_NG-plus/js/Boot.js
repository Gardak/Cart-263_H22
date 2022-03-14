
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

    this.load.on('complete', () => { this.scene.start('play'); });
  }

  create(){

  }

  update(){

  }
}
