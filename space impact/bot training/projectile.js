class Projectile{

	constructor(x,y,speed,colr,dmg,game){
		this.x = x + 10;
		this.y = y - 5 ;
		this.ht = 10;
		this.w = 20;
		this.speed = speed;
		this.colr = colr;
		this.dmg = dmg;
		this.dead = false;
		this.game = game;
		
	}

	render(){
		push();
			fill(this.colr);
			noStroke();
			rect(this.x,this.y,this.w ,this.ht);

		pop();
	}

	update(){
		this.x += this.speed;
	}

	hits(other){
		if(other instanceof Enemy1){
			if(this.x+this.w > other.x && this.x < other.x + other.w/2 && this.y > other.y-other.w/2 && this.y < other.y + other.w/2){
				other.health -= this.dmg;
				this.dmg = 0;
				this.dead = true;
				this.game.explosions.push(new Explosion(this.x,this.y));
				return true;
			}
		}

		// else if(other instanceof Projectile){
		// 	if(this.x+this.w > other.x && this.x < other.x + other.w && this.y > other.y-other.w && this.y < other.y + other.w){
		// 		this.dead = true;
		// 		other.dead = true;

		// 		this.game.explosions.push(new Explosion(this.x,this.y));
		// 		return true;
				
		// 	}
		// }

		else if(other instanceof Spaceship){
			if(this.x+this.w > other.x && this.x < other.x + other.w && this.y > other.y-other.w && this.y < other.y + other.w){
				this.dead = true;
				other.health -= this.dmg;

				this.game.explosions.push(new Explosion(this.x- this.w,this.y));
				return true;
				
			}
		}
	}

	edges(){
		if(this.x > width + 50 || this.x < - 150) return true;

	}
}



class Explosion{

	constructor(x,y){
		this.x = x;
		this.y = y;
		this.timer = 50;
		this.w = 50;
	}

	render(){
		image(explosionImg,this.x,this.y,this.w,this.w);

		this.w -= 50/50;
		this.timer--;
	}
}