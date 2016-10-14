tileSize = 30;
tileSpacing = 3;
stepDuration = 150;

function Map(width, height){
	this.possibleSpawnPositions = [];
	this.width = width;
	this.height = height;
	this.tiles = []

	this.getSpawnPosition = function(){
		var index = Math.floor(Math.random()*this.possibleSpawnPositions.length);
		var pos = this.possibleSpawnPositions[index];
		this.possibleSpawnPositions.splice(index, 1);
		return pos;
	}

	var gen = generateBsp(this.width, this.height);
	var rooms = gen[0];
	var bridges = gen[1];
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
				this.possibleSpawnPositions.push({x:x, y:y});
				var gfx = new createjs.Shape();
				gfx.graphics.beginFill("#73A9CA");
				gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
				gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
				gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
				levelGfxTiles.addChild(gfx);
				this.tiles[x][y] = new Tile(gfx);
			}
		}
	}
	for (var bridge of bridges){
		var gfx = new createjs.Shape();
		gfx.graphics.beginFill("#73A9CA");
		gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
		gfx.x = tileSize/2 + bridge.x * (tileSize + tileSpacing);
		gfx.y = tileSize/2 + bridge.y * (tileSize + tileSpacing);
		levelGfxTiles.addChild(gfx);
		this.tiles[bridge.x][bridge.y] = new Tile(gfx);
	}
}

function generateBsp(width, height){
	//less than 2 doesn't really make sense
	var minRoomSize = 3;
	var maxSkippedIterations = 2;
	var VERTICAL = true;
	var HORIZONTAL = !VERTICAL;
	var maxIterations = 5;
	var emptySpace = [];
	for (var x = 0; x < width; x++){
		emptySpace.push([])
		for (var y = 0; y < height; y++){
			emptySpace[x].push(false);
		}
	}
	var rooms = [];
	var bridges = [];

	function createEmptySpace(_x, _y, width, height){
		for (var x = _x; x < _x+width; x++){
			for (var y = _y; y < _y+height; y++){
				emptySpace[x][y] = true;
			}
		}
	}

	function Bridge(x, y){
		this.x = x;
		this.y = y;
	}

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
						createEmptySpace(x + this.split-margin, y, 1, height);
						this.a = new Node(x, y, this.split-margin, this.height, this.n-skip, !this.splitType, this);
						this.b = new Node(x + this.split, y, this.width-this.split, this.height, this.n-skip, !this.splitType, this);
						var possibleBridgesY = [];
						for (var i = y; i < y+this.height; i++)
							if (!(emptySpace[x+this.split-margin-1][i]) && !(emptySpace[x+this.split+1][i]))
								possibleBridgesY.push(i);
						var bridgeY = possibleBridgesY[Math.floor(Math.random()*possibleBridgesY.length)];
						bridges.push(new Bridge(this.x+this.split-margin, bridgeY));
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
						createEmptySpace(x, y + this.split-margin, width, 1);
						this.a = new Node(x, y, this.width, this.split-margin, this.n-skip, !this.splitType, this);
						this.b = new Node(x, y + this.split, this.width, this.height-this.split, this.n-skip, !this.splitType, this);
						var possibleBridgesX = [];
						for (var i = x; i < x+this.width; i++)
							if (!(emptySpace[i][y+this.split-margin-1]) && !(emptySpace[i][y+this.split+1]))
								possibleBridgesX.push(i);
						var bridgeX = possibleBridgesX[Math.floor(Math.random()*possibleBridgesX.length)];
						bridges.push(new Bridge(bridgeX, y+this.split-margin));
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
	return [rooms, bridges];
}

function Tile(gfx){
	this.gfx = gfx;
	this.player = null;
}
