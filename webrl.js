map = null;
levelGfxContainer = null;
listener = null;
stage = null;
player = null;

function main(){
	stage = new createjs.Stage("canvas");
	levelGfxContainer = new createjs.Container();
	map = new Map(30, 40);
	listener = new window.keypress.Listener();
	player = new Player(0, 0);

	stage.addChild(levelGfxContainer);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.addEventListener("tick", cameraMovement);
	listener.simple_combo("down", function(){
		player.moveTo(player.x, player.y+1);
		logp();
	});
	listener.simple_combo("up", function(){
		player.moveTo(player.x, player.y-1);
		logp();
	});
	listener.simple_combo("left", function(){
		player.moveTo(player.x-1, player.y);
		logp();
	});
	listener.simple_combo("right", function(){
		player.moveTo(player.x+1, player.y);
		logp();
	});
}

function cameraMovement(){
	levelGfxContainer.x += ((stage.canvas.width/2 - player.gfx.x) - levelGfxContainer.x)/10;
	levelGfxContainer.y += ((stage.canvas.height/2 - player.gfx.y) - levelGfxContainer.y)/10;
}

function logp(){
	console.log(stage.canvas.width/2, stage.canvas.height/2, player.gfx.x, player.gfx.y);
}
