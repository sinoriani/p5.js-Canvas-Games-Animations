class Enemy1{

	constructor(game){
		this.x = width+50;
		this.y = random(100,height-100);
		this.w = 50;
		this.ht = 50;
		this.speedX = -3;
		random(2) > 1 ? this.speedY = 1: this.speedY = -1;
		this.health  = 100;
		this.fireRate = random(70,90);
		this.game = game;
		
	}

	render(){
		image(enemy1Img,this.x,this.y,this.w ,this.w );
	}

	update(){
		this.x += this.speedX;
		this.y += this.speedY;

		if(frameCount % this.fireRate == 0)
		random(2) > 1 ? this.speedY = 1: this.speedY = -1;
	}

	edges(){
		if(this.y > height || this.y < 0) this.speedY *= -1;

		if(this.x < 0 )return true;
	}

	shoot(){
		if(frameCount % 50 == 0){
			this.game.enemyProjectiles.push(new Projectile(this.x,this.y,-5,0, 25 ,this.game));
		}
	}

	checkHealth(){
		if (this.health <= 0) return true;
	}
}