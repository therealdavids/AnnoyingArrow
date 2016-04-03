var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('arrow', 'assets/arrow.png');
	game.load.image('dude2', 'assets/dude2.png');
	game.load.image('dude3', 'assets/dude3.png');
	game.load.image('octodude', 'assets/octodude.png');
	game.load.image('p1-sel', 'assets/p1-sel.png');
	game.load.image('p2-sel', 'assets/p2-sel.png');
	game.load.image('checkers', 'assets/checkers.png');
  game.load.image('checkers2', 'assets/checkers2.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;
var ground;
var player;
var cursors;
var arrow;
var tail;
var octodude;

var menuState = {
  curPos: [0, 4]
}

var checkers;
var game;
var bgLayer;
var p1DudeLayer;
var p2DudeLayer;
var dudesLayer;
var p1SelectLayer;
var p2SelectLayer;

var dudes = ['dude3', 'dude2', 'octodude', 'star', 'arrow'];

function create() {
	game = this.game;
	bgLayer = game.add.group();
	p1DudeLayer = game.add.group();
	p2DudeLayer = game.add.group();
	dudesLayer = game.add.group();
	p1SelectLayer = game.add.group();
	p2SelectLayer = game.add.group();

	initImageLayers(this.game);

  menuState.curPos[0] = 0;
	menuState.curPos[1] = 4;

}

function update() {
  if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
		game.tweens.remove(p1TweenLoop);
		game.add.tween(p1DudeLayer)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)

	} else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		game.tweens.remove(p2TweenLoop);
		game.add.tween(p2DudeLayer)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: .5}, 100, Phaser.Easing.Linear.None, true)
      .to({alpha: 1}, 100, Phaser.Easing.Linear.None, true)
  }
}

var DudesList = ['Ape', 'Ninja', 'Cat'];

var p1Dudes;
var p2Dudes;
var p1TweenLoop;
var p2TweenLoop;

function initImageLayers(game) {

	// bgLayer
	checkers = bgLayer.create(-200,0,'checkers2');
	checkers.scale.setTo(0.65,0.65);
	game.add.tween(checkers.scale)
		.to({x: .66, x: .66}, 1000, Phaser.Easing.Linear.None, true)
		.to({x: .65, y: .65}, 1000, Phaser.Easing.Linear.None, true)
		.loop();

	// p1DudeLayer
	p1Dudes = [];

	dudes.map((dudeStr, i) => {
		p1Dudes[i] = p1DudeLayer.create(game.world.centerX,0,dudeStr);
		p1Dudes[i].scale.setTo(-5,5);
		p1Dudes[i].alpha = 0;
	});

	p1TweenLoop = game.add.tween(p1DudeLayer)
		.to({alpha: .5}, 250, Phaser.Easing.Linear.None, true)
		.to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)
		.loop();

	// p2DudeLayer
	p2Dudes = [];

	dudes.map((dudeStr, i) => {
		p2Dudes[i] = p2DudeLayer.create(game.world.centerX,0,dudeStr);
		p2Dudes[i].scale.setTo(5,5);
		p2Dudes[i].alpha = 0;
	});

	p2TweenLoop = game.add.tween(p2DudeLayer)
		.to({alpha: .5}, 250, Phaser.Easing.Linear.None, true)
		.to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)
		.loop();

	// dudesLayer
	dudes.map((dudeStr, i) => {
    var coord = [0,0];
    var dude = dudesLayer.create(coord[0] + (i * 105), coord[1], dudeStr);
  });

	// p1SelectLayer
	var p1selector = p1SelectLayer.create(0, 0, 'p1-sel');

	var key1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	key1.onDown.add(() => {handleKeyRight(p1selector, 0);}, null);

	var key2 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	key2.onDown.add(() => {handleKeyLeft(p1selector, 0);}, null);

	// p2SelectLayer
	var p2selector = p2SelectLayer.create(0, 0, 'p2-sel');

	var key3 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	key3.onDown.add(() => {handleKeyRight(p2selector, 1);}, null);

	var key4 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	key4.onDown.add(() => {handleKeyLeft(p2selector, 1);}, null);
}


function handleKeyRight(selector, i) {
  menuState.curPos[i]++;
  menuState.curPos[i]%=5;
  selector.x = menuState.curPos[i] * 105;

	changeBigDudes(i, menuState.curPos[i]);
}

function handleKeyLeft(selector, i) {
  menuState.curPos[i]+=4;
  menuState.curPos[i]%=5;
  selector.x = menuState.curPos[i] * 105;

	changeBigDudes(i, menuState.curPos[i]);
}

function changeBigDudes(playerNum, pos) {
	if (playerNum == 0) {
		dudeLayer = p1DudeLayer;
		playerDudes = p1Dudes;
	} else {
		dudeLayer = p2DudeLayer;
		playerDudes = p2Dudes;
	}

	playerDudes.map((dude, i) => {
		if (pos == i) {
			game.add.tween(dude)
				.to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)
		} else {
			game.add.tween(dude)
				.to({alpha: 0}, 100, Phaser.Easing.Linear.None, true)
		}
	})

}
