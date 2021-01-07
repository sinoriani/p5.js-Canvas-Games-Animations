
class Game{
	constructor(brain){
		this.enemies = [];
		this.playerProjectiles = [];
		this.enemyProjectiles = [];
		this.explosions = [];
		this.bot = new Spaceship(this,brain);
		this.enemies.push(new Enemy1(this));
		this.gameOver = false;

	}

	update(){
		this.bot.update();
		this.bot.edges();
		//shooting

		if(frameCount % 20 == 0){
			this.bot.shoot();
		}


		//render player bullets
		for (var i = this.playerProjectiles.length - 1; i >= 0; i--) {
			this.playerProjectiles[i].update();

			
			// check intersection with enemies
			for (var j = this.enemies.length - 1; j >= 0; j--) {
				if(this.playerProjectiles[i].hits(this.enemies[j])){
					this.bot.score += 2;
					break;
				}	
			}

			// check intersection with enemies
			/*for (var j = this.enemyProjectiles.length - 1; j >= 0; j--) {
				if(this.playerProjectiles[i].hits(this.enemyProjectiles[j])){
					this.bot.score += 2;
					break;
				}	
			}*/

			// delete out of bound bullets
			if(this.playerProjectiles[i].edges() || this.playerProjectiles[i].dead){
				this.playerProjectiles.splice(i,1);
			}
			

			
		}


		//render enemies
		for (var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].update();
			this.enemies[i].shoot();

			if(this.enemies[i].edges() || this.enemies[i].checkHealth()){
				this.enemies.splice(i,1);
			}
		}

		//render enemy bullets
		for (var i = this.enemyProjectiles.length - 1; i >= 0; i--) {
			this.enemyProjectiles[i].update();

			if(this.enemyProjectiles[i].hits(this.bot)){
				this.bot.score *= 0.25;
			}
			
			// delete out of bound bullets
			if(this.enemyProjectiles[i].edges() || this.enemyProjectiles[i].dead){
				this.enemyProjectiles.splice(i,1);
			}
		}


		//render explosions*
		for (var i = this.explosions.length - 1; i >= 0; i--) {
			if(this.explosions[i].timer <= 0) {
				this.explosions.splice(i,1);
			}
		}

		//spawn new enemies
		if(frameCount % 120 == 0) this.enemies.push(new Enemy1(this));


		// restart condition
		if(this.bot.health <= 0){
			/*this.enemies = [];
			this.playerProjectiles = [];
			this.enemyProjectiles = [];
			this.explosions = [];
			this.spaceship.health = 300;
			*/
			savedBots.push(this.bot);
			this.gameOver = true;
		}
	}


	
	updateAndRender(){
		this.bot.healthRender();
		this.bot.render();
		this.bot.update();
		this.bot.edges();
		//shooting

		if(frameCount % 20 == 0){
			this.bot.shoot();
		}


		//render player bullets
		for (var i = this.playerProjectiles.length - 1; i >= 0; i--) {
			this.playerProjectiles[i].render();
			this.playerProjectiles[i].update();

			
			// check intersection with enemies
			for (var j = this.enemies.length - 1; j >= 0; j--) {
				if(this.playerProjectiles[i].hits(this.enemies[j])){
					this.bot.score += 2;
					break;
				}	
			}

			// check intersection with enemies
			/*for (var j = this.enemyProjectiles.length - 1; j >= 0; j--) {
				if(this.playerProjectiles[i].hits(this.enemyProjectiles[j])){
					break;
				}	
			}*/

			// delete out of bound bullets
			if(this.playerProjectiles[i].edges() || this.playerProjectiles[i].dead){
				this.playerProjectiles.splice(i,1);
			}
			

			
		}


		//render enemies
		for (var i = this.enemies.length - 1; i >= 0; i--) {
			this.enemies[i].render();
			this.enemies[i].update();
			this.enemies[i].shoot();

			if(this.enemies[i].edges() || this.enemies[i].checkHealth()){
				this.enemies.splice(i,1);
			}
		}

		//render enemy bullets
		for (var i = this.enemyProjectiles.length - 1; i >= 0; i--) {
			this.enemyProjectiles[i].render();
			this.enemyProjectiles[i].update();

			if(this.enemyProjectiles[i].hits(this.spaceship)){
				this.bot.score *= 0.25;
			}
			
			// delete out of bound bullets
			if(this.enemyProjectiles[i].edges() || this.enemyProjectiles[i].dead){
				this.enemyProjectiles.splice(i,1);
			}
		}


		//render explosions*
		for (var i = this.explosions.length - 1; i >= 0; i--) {
			this.explosions[i].render();
			if(this.explosions[i].timer <= 0) {
				this.explosions.splice(i,1);
			}
		}

		//spawn new enemies
		if(frameCount % 120 == 0) this.enemies.push(new Enemy1(this));


		// restart condition
		if(this.bot.health <= 0){
			// this.enemies = [];
			// this.playerProjectiles = [];
			// this.enemyProjectiles = [];
			// this.explosions = [];
			// this.bot.health = 300;
			savedBots.push(this.bot);
			this.gameOver = true;
		}
	}
}
