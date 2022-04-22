
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
    this.load.image('brickWall', 'assets/images/decor/castle_bg.png');
    this.load.image('firePillar', 'assets/images/decor/fire_pillar.png');
    this.load.image('icePillar', 'assets/images/decor/ice_pillar.png');
    this.load.image('stoneGate', 'assets/images/decor/stone_gate.png');
    this.load.image('stoneGateActivated', 'assets/images/decor/stone_gate-active.png');
    this.load.image('cauldron', 'assets/images/decor/cauldron.png');
    this.load.image('doorOffice', 'assets/images/decor/door_office.png');
    this.load.image('ladder', 'assets/images/decor/ladder.png');
    this.load.image('endGame', 'assets/images/decor/end_game.png');

    //Load in the platforms
    this.load.image('platform1', 'assets/images/platforms/platform-1.png');
    this.load.image('platform2', 'assets/images/platforms/platform-2.png');
    this.load.image('platform3', 'assets/images/platforms/platform-3.png');
    this.load.image('platform4', 'assets/images/platforms/platform-4.png');
    this.load.image('balconyWall', 'assets/images/platforms/balcony_wall.png');
    this.load.image('balconyWood', 'assets/images/platforms/ladder_platform.png');

    //Load in the dragable objects
    this.load.image('lantern', 'assets/images/objects/lantern.png');
    this.load.image('cloud', 'assets/images/cloud.png');
    this.load.image('potion', 'assets/images/objects/potion.png');
    this.load.image('crateGreen', 'assets/images/objects/crate_metal-green.png');
    this.load.image('crateOrange', 'assets/images/objects/crate_metal-orange.png');
    this.load.image('iceGem', 'assets/images/objects/ice_gem.png');
    this.load.image('fireGem', 'assets/images/objects/fire_gem.png');

    //Load in the sound effects
    this.load.audio('potionMixSfx', 'assets/sounds/cauldronMixSfx.mp3');
    this.load.audio('fireballSfx', 'assets/sounds/fireballSfx.mp3');
    this.load.audio('woodBurnSfx', 'assets/sounds/wood_burn_sfx.mp3');
    this.load.audio('pillarSfx', 'assets/sounds/pillar_sfx.mp3');
    this.load.audio('rainLoopSfx', 'assets/sounds/rain_loop_sfx.mp3');
    this.load.audio('gameSt', 'assets/sounds/game_st.mp3');

    //Load in atlas for animations
    this.load.atlas('rain_frames', 'assets/atlas/rain/rain.png', 'assets/atlas/rain/rain_atlas.json');
    this.load.atlas('portal_frames', 'assets/atlas/portal/portal.png', 'assets/atlas/portal/portal_atlas.json');

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
