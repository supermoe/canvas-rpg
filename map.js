tileSize = 30;
tileSpacing = 3;
stepDuration = 150;

function Map(width, height){
	this.width = width;
	this.height = height;
	this.tiles = []
	var rooms = generateBsp(this.width, this.height);
	console.log(rooms);
	for (var x = 0; x < this.width; x++){
		this.tiles.push([])
		for (var y = 0; y < this.height; y++){
			this.tiles[x].push(null)
		}
	}
	for (var room of rooms){
		for (var x = room.x; x < room.x+room.width; x++){
			this.tiles.push([])
			for (var y = room.y; y < room.y+room.height; y++){
				var gfx = new createjs.Shape();
				gfx.graphics.beginFill("lightgray");
				gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
				gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
				gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
				levelGfxContainer.addChild(gfx);
				this.tiles[x][y] = new Tile(gfx);
			}
		}
	}
}

function generateBsp(width, height){
	//less than 2 doesn't really make sense
	var minRoomSize = 3;
	var maxSkippedIterations = 2;
	var VERTICAL = true;
	var HORIZONTAL = !VERTICAL;
	var maxIterations = 5;
	var rooms = [];

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
			rooms.push(this);
		}
		else{
			//check if there's enough space to split
			var margin = 1;
			if (this.width >= minRoomSize && this.height >= minRoomSize){
				var skip = Math.max(Math.floor(Math.random() * (this.n-1) + 1), maxSkippedIterations);
				//decide on split axis (vertical/horizontal)
				if (this.splitType == VERTICAL){
					//split the width
					if (this.width >= minRoomSize*2+margin) {
						this.split = Math.floor(Math.random() * (this.width - minRoomSize*2)) + minRoomSize+margin;
						console.log(this.split, this.width);
						this.a = new Node(x, y, this.split-margin, this.height, this.n-skip, !this.splitType, this);
						this.b = new Node(x + this.split, y, this.width-this.split, this.height, this.n-skip, !this.splitType, this);
					}
					else{
						this.n = 0;
						rooms.push(this);
					}
				}
				else{
					//split the height
					if (this.height >= minRoomSize*2+margin){
						this.split = Math.floor(Math.random() * (this.height - minRoomSize*2)) + minRoomSize+margin;
						console.log(this.split, this.height);
						this.a = new Node(x, y, this.width, this.split-margin, this.n-skip, !this.splitType, this);
						this.b = new Node(x, y + this.split, this.width, this.height-this.split, this.n-skip, !this.splitType, this);
					}
					else{
						this.n = 0;
						rooms.push(this);
					}
				}

			}
			else{
				//end the branch because we ran out of space
				this.n = 0;
				rooms.push(this);
			}
		}
	}
	new Node(0, 0, width, height, maxIterations, VERTICAL, null);
	return rooms;
}

function Tile(gfx){
	this.gfx = gfx;
	this.player = null;
}
