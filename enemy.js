function Enemy(x, y){
	Entity.call(this, x, y, "#EA4AA0");

	this.life = 5;
	this.hp = this.life;
	this.stopColliding = function(){
		if (enemies.indexOf(this)>=0)
			enemies.splice(enemies.indexOf(this), 1);
	}.bind(this);
	this.stopDrawing = function(){
			levelGfxEntities.removeChild(this.gfx);
	}.bind(this);

	this.onDeath = function() {
		console.log("ded");
		this.stopColliding();
		createjs.Tween.get(this.gfx).to({
			alpha: 0
		}, 300).call(this.stopDrawing);
	}
}
