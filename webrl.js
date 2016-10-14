Color = net.brehaut.Color;
map = null;
levelGfxEntities = null;
levelGfxOverlay = null;
levelGfxTiles = null;
levelGfxContainer = null;
listener = null;
stage = null;
player = null;
enemies = [];

function main(){
	stage = new createjs.Stage("canvas");
	levelGfxTiles = new createjs.Container();
	levelGfxOverlay = new createjs.Container();
	levelGfxEntities = new createjs.Container();
	levelGfxContainer = new createjs.Container();
	levelGfxContainer.addChild(levelGfxTiles);
	levelGfxContainer.addChild(levelGfxEntities);
	levelGfxContainer.addChild(levelGfxOverlay);
	map = new Map(15, 15);
	listener = new window.keypress.Listener();
	player = new Player(0, 0);
	enemies.push(new Enemy(0, 1));

	stage.addChild(levelGfxContainer);
	console.log(stage.children);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", cameraMovement);
	listener.simple_combo("down", function(){
		player.moveTo(player.x, player.y+1);
	});
	listener.simple_combo("up", function(){
		player.moveTo(player.x, player.y-1);
	});
	listener.simple_combo("left", function(){
		player.moveTo(player.x-1, player.y);
	});
	listener.simple_combo("right", function(){
		player.moveTo(player.x+1, player.y);
	});
}

function cameraMovement(){
	levelGfxContainer.x += ((stage.canvas.width/2 - player.gfx.x) - levelGfxContainer.x)/10;
	levelGfxContainer.y += ((stage.canvas.height/2 - player.gfx.y) - levelGfxContainer.y)/10;
}
