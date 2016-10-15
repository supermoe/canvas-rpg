function Player(x, y){
	Entity.call(this, x, y, "#FFC910");

	var entityMoveTo = this.moveTo;
	this.moveTo = function(x, y){
		//check if moving within map boundaries and on a tile
		if ((x >= 0 && x < map.width) && (y >= 0 && y < map.height) && map.tiles[x][y] != null){
			var enemy = null;
			for (var e of enemies){
				if (e.x == x && e.y == y){
					enemy = e;
					break;
				}
			}
			//check collision with enemies
			if (enemy == null){
				entityMoveTo(x, y);
			}
			else{
				console.log("bump "+enemy.damage(this.atk));
			}
		}
		else {
			console.log("can't move there")
		}
	}
}
