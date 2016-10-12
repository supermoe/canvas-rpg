function Player(x, y){
	this.x = x;
	this.y = y;
	this.gfx = new createjs.Shape();
	this.gfx.graphics.beginFill("red");
	this.gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
	this.gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
	this.gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
	levelGfxContainer.addChild(this.gfx);
	this.moveTo = function(x, y){
		//check if moving within map boundaries and on a tile
		//if ((x >= 0 && x < map.width) && (y >= 0 && y < map.height) && map.tiles[x][y] != null){
			player.x = x;
			player.y = y;
			createjs.Tween.get(this.gfx).to({
				x: tileSize/2 + x * (tileSize + tileSpacing),
				y: tileSize/2 + y * (tileSize + tileSpacing)
			}, stepDuration, createjs.Ease.sineOut);
		/*}
		else {
			console.log("can't move there")
		}*/
	}
}
