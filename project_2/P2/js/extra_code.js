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


switch (object.texture.key) {

  case "cloud":
  case "crateGreen":
  case "crateOrange":
  case "lantern":
  object.body.allowGravity = true;
  object.body.immovable = false;
  break;

  case "platformDrag":
    break;

}
