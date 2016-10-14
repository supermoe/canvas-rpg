function Enemy(x, y){
	this.x = x;
	this.y = y;
	this.gfx = new createjs.Shape();
	this.fillCmd = this.gfx.graphics.beginFill("#D5213F").command;
	this.gfx.flash = 0;
	this.updateFlash = function(event){
		var c = Color("#0000FF");
		var flashColor = Color("#FFFFFF");
		c = c.blend(flashColor, Math.min(Math.max(this.gfx.flash,0),1));
		this.fillCmd.style = c.toString();
	}.bind(this);
	this.gfx.addEventListener('tick', this.updateFlash);
	this.gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
	this.gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
	this.gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
	levelGfxEntities.addChild(this.gfx);

	this.life = 10;
	this.hp = this.life;

	this.kill = function(){
			levelGfxEntities.removeChild(this.gfx);
			enemies.splice(enemies.indexOf(this), 1);
	}
}
