class Title extends Phaser.Scene {
    constructor() {
        super("title");
    }

    preload() {
        
        document.getElementById('description').innerHTML = '<h2>Title Screen</h2>'
    }

    create(){
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(this.keySpace)) {
            this.scene.start('castle')
        }
    }
}