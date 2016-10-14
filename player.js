function Player(x, y){
	this.x = x;
	this.y = y;
	this.gfx = new createjs.Shape();
	this.gfx.graphics.beginFill("#F35D17");
	this.gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
	this.gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
	this.gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
	levelGfxEntities.addChild(this.gfx);

	this.atk = 1;
	this.life = 10;
	this.hp = this.life;

	this.damage = function(enemy){
		var dmg = Math.min(this.atk, enemy.hp);
		enemy.hp-=dmg;
		console.log("did "+dmg+" dmg. ("+enemy.hp+")");
		createjs.Tween.get(enemy.gfx).to({
			scaleX: 1.6,
			scaleY: 1.6,
			flash: 1
		}, 100).to({
			scaleX: 1,
			scaleY: 1,
			flash: 0
		}, 300, createjs.Ease.backOut).call(function(){
			if (enemy.hp <= 0){
				createjs.Tween.get(enemy.gfx).to({
					alpha: 0
				}, 300).call(enemy.kill);
			}
		});
		var dmgText = new createjs.Text(dmg, "30px Main", "white");
		dmgText.rotation = Math.random()*60-30;
		dmgText.regX = dmgText.getBounds().width/2;
		dmgText.regY = dmgText.getBounds().height/2;
		dmgText.x = enemy.gfx.x;
		dmgText.y = enemy.gfx.y-15;
		//dmgText.regY = dmgText.getBounds().height/2;
		levelGfxOverlay.addChild(dmgText);
		dmgText.scaleX = 0;
		createjs.Tween.get(dmgText).to({
			scaleX: 1
		}, 300, createjs.Ease.backOut).wait(200).to({
			alpha: 0
		}, 300, createjs.Ease.backOut);
		createjs.Tween.get(dmgText).to({
			y: dmgText.y-tileSize
		}, 900, createjs.Ease.sineOut);
	}

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
				player.x = x;
				player.y = y;
				createjs.Tween.get(this.gfx).to({
					x: tileSize/2 + x * (tileSize + tileSpacing),
					y: tileSize/2 + y * (tileSize + tileSpacing)
				}, stepDuration, createjs.Ease.sineOut);
			}
			else{
				console.log("bump");
				this.damage(enemy);
			}
		}
		else {
			console.log("can't move there")
		}
	}
}
