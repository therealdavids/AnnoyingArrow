var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.image('arrow', 'assets/arrow.png');
	game.load.image('dude2', 'assets/dude2.png');
	game.load.image('dude3', 'assets/dude3.png');
	game.load.image('octodude', 'assets/octodude.png');
	game.load.image('dude-selector', 'assets/dude-selector.png');
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
  curPos: 0
}

var checkers;
function create() {

  checkers = this.game.add.image(-200,0,'checkers2');
  checkers.scale.setTo(0.65,0.65);
  checkers.alpha = 0;

  var dudes = ['dude3', 'dude2', 'dude3', 'dude2', 'dude3'];

  menuState.curPos = 0;

  dudes.map((dudeStr, i) => {
    var coord = [0,0];
    var dude = this.game.add.image(coord[0] + (i * 105), coord[1], dudeStr);
  });

  var selector = this.game.add.image(0, 0, 'dude-selector');

  var key1 = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  key1.onDown.add(() => {handleKeyRight(selector);}, null);

  var key2 = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  key2.onDown.add(() => {handleKeyLeft(selector);}, null);

  octodude = this.game.add.image(0,0,'octodude');
  octodude.scale.setTo(5,5);
  octodude.alpha = 0;
}

function update() {
  if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
    // octodude.alpha = 1;

    game.add.tween(octodude)
      .to({alpha: 1}, 200, Phaser.Easing.Linear.None, true)
      .to({alpha: 0}, 200, Phaser.Easing.Linear.None, true)
      .loop();

    checkers.alpha = 1;
    game.add.tween(checkers.scale)
      .to({x: .66, x: .66}, 1000, Phaser.Easing.Linear.None, true)
      .to({x: .65, y: .65}, 1000, Phaser.Easing.Linear.None, true)
      .loop();
  }
}


function handleKeyRight(selector) {
  menuState.curPos++;
  menuState.curPos%=5;
  selector.x = menuState.curPos * 105;
}

function handleKeyLeft(selector) {
  menuState.curPos+=4;
  menuState.curPos%=5;
  selector.x = menuState.curPos * 105;
}
