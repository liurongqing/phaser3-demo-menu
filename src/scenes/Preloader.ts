import { Keys } from "~/consts/index";

export default class Preloader extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  constructor() {
    super(Keys.PreloadScene)
  }
  preload() {
    this.load.image('glass-panel', 'assets/PNG/glassPanel.png')
    this.load.image('cursor-hand', 'assets/PNG/cursor_hand.png')
  }
  create() {
    this.scene.start(Keys.GameScene)
  }
  update() { }
}
