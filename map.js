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

function generateBsp(width, height){
	//less than 2 doesn't really make sense
	var minRoomSize = 2;
	var VERTICAL = true;
	var HORIZONTAL = !VERTICAL;
	var maxIterations = 5;

	function Node(x, y, width, height, n, splitType, parent){
		this.parent = parent;
		this.a = null;
		this.b = null;
		this.width = width;
		this.height = height;
		this.splitType = splitType;
		this.split = null;
		this.x = x;
		this.y = y;
		if (this.n<=0){
			//do nothing, reached end of branch
		}
		else{
			//check if there's enough space to split
			var margin = 1;
			if (this.width >= minRoomSize*2+margin && this.height >= minRoomSize*2+margin){
				//decide on split axis (vertical/horizontal)
				if (this.splitType == VERTICAL){
					//split the width
					this.split = Math.floor(Math.random() * (this.width - minRoomSize*2+margin)) + minRoomSize+margin;
					this.a = new Node(x, y, this.split-1, height, this.n-1, !this.splitType, this);
					this.b = new Node(this.split, y, width-this.split, height, this.n-1, !this.splitType, this);
				}
				else{
					//split the height
					this.split = Math.floor(Math.random() * (this.height - minRoomSize*2+margin)) + minRoomSize+margin;
					this.a = new Node(x, y, width, this.split-1, this.n-1, !this.splitType, this);
					this.b = new Node(x, this.split, width, height-this.split, this.n-1, !this.splitType, this);
				}

			}
			else{
				//end the branch because we ran out of space
				this.n = 0;
			}
		}
	}
	return new Node(0, 0, width, height, maxIterations, VERTICAL, null);
}

console.log(generateBsp(30, 30));

function Tile(gfx){
	this.gfx = gfx;
	this.player = null;
}
