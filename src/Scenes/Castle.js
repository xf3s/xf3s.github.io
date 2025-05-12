class Castle extends Phaser.Scene {
    constructor() {
        super("castle");
        this.enemies = {sprite: {}};
        this.bullets = {player: {count: 0}, enemy: {count: 0},
            addBullet: (initX, initY, type) => {
                initX += 20; // offset the arrow to the right side of the player
                for (let thing in this.bullets[type]) {
                    if (this.bullets[type][thing].visible == false) {
                        this.bullets[type][thing].x = initX;
                        this.bullets[type][thing].y = initY;
                        this.bullets[type][thing].visible = true;
                        return;
                    }
                }
                this.bullets[type].count++;
                this.bullets[type]["bullet" + this.bullets[type].count] = this.add.sprite(initX, initY, "platformerAssets", "item_arrow.png");
                if (type == "player") {
                    this.bullets[type]["bullet" + this.bullets[type].count].angle -= 90;
                }
                if (type == "enemy") {
                    this.bullets[type]["bullet" + this.bullets[type].count].angle += 90;
                }
            }};
        this.player = {sprite: {}, health: 3};
    }

    preload() {
        this.load.setPath("./assets/")
        this.load.image("tiny_town_tiles", "kenny-tiny-town-tilemap-packed.png");
        this.load.tilemapTiledJSON("map", "castletiles.json");
        document.getElementById('description').innerHTML = '<h2>Castle/Game</h2>'


        // scribble platformer assets- pending proper sprites for player, enemies, & player
        this.load.atlasXML("platformerAssets", "spritesheet_default.png", "spritesheet_default.xml");
    }

    create() {
        this.map = this.add.tilemap("map", 16, 16, 25, 20);
        this.tileset = this.map.addTilesetImage("tiny-town-packed", "tiny_town_tiles");

        this.castleGrassLayer = this.map.createLayer("Grass-Castle", this.tileset, 0, 0);
        this.treesLayer = this.map.createLayer("Trees", this.tileset, 0, 0);
        this.lilDetailsLayer = this.map.createLayer("Lil-Details", this.tileset, 0, 0);

        this.castleGrassLayer.setScale(2.0);
        this.treesLayer.setScale(2.0);
        this.lilDetailsLayer.setScale(2.0);

        this.player.sprite.body = this.add.sprite(150, 500, "platformerAssets", "character_squareGreen.png");
        this.player.sprite.bow = this.add.sprite(170, 500, "platformerAssets", "item_bow.png")

        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        this.keySpace.on('down', (key, event) => {
            this.bullets.addBullet(this.player.sprite.body.x, this.player.sprite.body.y, "player");
        })

        // teehee


        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyEsc)) {
            this.scene.start('title');
        }

        if ((this.keyD.isDown || this.keyRight.isDown) && this.player.sprite.body.x < 650) {
            for (let thing in this.player.sprite) {
                this.player.sprite[thing].x += 8;
            }
        }

        if ((this.keyA.isDown || this.keyLeft.isDown) && this.player.sprite.body.x > 150) {
            for (let thing in this.player.sprite) {
                this.player.sprite[thing].x -= 8;
            }
        }

        for (let thing in this.bullets.player) {
            if (this.bullets.player[thing].visible == true) {
                this.bullets.player[thing].y -= 12;
            }
            if (this.bullets.player[thing].y < -50) {
                this.bullets.player[thing].visible = false;
            }
        }

        for (let thing in this.bullets.enemy) {
            if (this.bullets.enemy[thing].visible == true) {
                this.bullets.enemy[thing].y += 8;
            }
            if (this.bullets.enemy[thing].y > 690) {
                this.bullets.enemy[thing].visible = false;
            }
        }
    }
}