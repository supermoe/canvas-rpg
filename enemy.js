function Enemy(x, y){
	this.x = x;
	this.y = y;
	this.gfx = new createjs.Shape();
	this.gfx.graphics.beginFill("blue");
	this.gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
	this.gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
	this.gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
	levelGfxContainer.addChild(this.gfx);

	this.life = 10;
	this.hp = this.life;
}
