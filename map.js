tileSize = 30;
tileSpacing = 3;
stepDuration = 150;

function Map(width, height){
	this.width = width;
	this.height = height;
	this.tiles = []
	for (var x = 0; x < this.width; x++){
		this.tiles.push([])
		for (var y = 0; y < this.height; y++){
			tile = null;

			var gfx = new createjs.Shape();
			gfx.graphics.beginFill("lightgray");
			gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
			gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
			gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
			levelGfxContainer.addChild(gfx);
			tile = new Tile(gfx);

			this.tiles[x].push(tile);
		}
	}
}

function Tile(gfx){
	this.gfx = gfx;
	this.player = null;
}
