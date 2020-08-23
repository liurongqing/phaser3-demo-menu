import { Keys } from '~/consts/index'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private buttons: Phaser.GameObjects.Image[] = []
  private selectedButtonIndex = 0
  private buttonSelector!: Phaser.GameObjects.Image

  constructor() {
    super(Keys.GameScene)
  }
  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  preload() { }
  create() {
    const { width, height } = this.scale



    const playButton = this.add.image(width * 0.5, height * 0.4, 'glass-panel')
      .setDisplaySize(150, 50)

    this.add.text(playButton.x, playButton.y, 'Play')
      .setOrigin(0.5)


    const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
      .setDisplaySize(150, 50)

    this.add.text(settingsButton.x, settingsButton.y, 'Settings')
      .setOrigin(0.5)

    const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel')
      .setDisplaySize(150, 50)

    this.add.text(creditsButton.x, creditsButton.y, 'Credits')
      .setOrigin(0.5)

    this.buttons.push(playButton)
    this.buttons.push(settingsButton)
    this.buttons.push(creditsButton)

    playButton.on('selected', () => {
      console.log('play')
    })

    settingsButton.on('selected', () => {
      console.log('settings')
    })

    creditsButton.on('selected', () => {
      console.log('credits')
    })

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off('selected')
      settingsButton.off('selected')
      creditsButton.off('selected')
      console.log('shutdown')
    })

    this.buttonSelector = this.add.image(0, 0, 'cursor-hand')
    this.selectButton(0)
  }

  selectButton(index: number) {

    const currentButton = this.buttons[this.selectedButtonIndex]
    currentButton.setTint(0xffffff)

    const button = this.buttons[index]
    button.setTint(0x66ff7f)

    this.buttonSelector.x = button.x + button.displayWidth * 0.5
    this.buttonSelector.y = button.y + 10

    this.selectedButtonIndex = index
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change
    if (index >= this.buttons.length) {
      index = 0
    } else if (index < 0) {
      index = this.buttons.length - 1
    }

    this.selectButton(index)
  }
  confirmSelection() {
    const button = this.buttons[this.selectedButtonIndex]
    button.emit('selected')
  }
  update() {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
    const spaceJustPress = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (upJustPressed) {
      this.selectNextButton(-1)
    } else if (downJustPressed) {
      this.selectNextButton(1)
    } else if (spaceJustPress) {
      this.confirmSelection()
    }
  }
}
