function Entity(x, y, color){
	this.x = x;
	this.y = y;
	this.gfx = new createjs.Shape();
	this.fillCmd = this.gfx.graphics.beginFill(color).command;
	this.gfx.graphics.drawRect(-tileSize/2, -tileSize/2, tileSize, tileSize);
	this.gfx.x = tileSize/2 + x * (tileSize + tileSpacing);
	this.gfx.y = tileSize/2 + y * (tileSize + tileSpacing);
	levelGfxEntities.addChild(this.gfx);
	this.gfx.flash = 0;

	//stats
	this.atk = 1;
	this.life = 10;
	this.hp = this.life;

	this.updateFlash = function(event){
		var c = Color(color);
		var flashColor = Color("#FFFFFF");
		c = c.blend(flashColor, Math.min(Math.max(this.gfx.flash,0),1));
		this.fillCmd.style = c.toString();
	}.bind(this);
	this.gfx.addEventListener('tick', this.updateFlash);

	this.moveTo = function(x, y){
		this.x = x;
		this.y = y;
		createjs.Tween.get(this.gfx).to({
			x: tileSize/2 + x * (tileSize + tileSpacing),
			y: tileSize/2 + y * (tileSize + tileSpacing)
		}, stepDuration, createjs.Ease.sineOut);
	}.bind(this);

	this.onDeath = function(){
		console.print("ded1");
	};

	this.onHit = function(dmg){
		createjs.Tween.get(this.gfx, {override:true}).to({
			scaleX: 1.6,
			scaleY: 1.6,
			flash: 1
		}, 100).to({
			scaleX: 1,
			scaleY: 1,
			flash: 0
		}, 300, createjs.Ease.backOut);

		var dmgText = new createjs.Text("-"+dmg, "30px Main", "white");
		dmgText.rotation = Math.random()*60-30;
		dmgText.regX = dmgText.getBounds().width/2;
		dmgText.regY = dmgText.getBounds().height/2;
		dmgText.x = this.gfx.x;
		dmgText.y = this.gfx.y-15;
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
		}, 1000, createjs.Ease.elasticOut);
	}.bind(this);

	this.damage = function(dmg) {
		dmg = Math.min(Math.max(0, dmg), this.hp);
		this.hp -= dmg;
		this.onHit(dmg);
		if (this.hp <= 0){
			this.onDeath();
		}
		return dmg;
	}.bind(this);
}
