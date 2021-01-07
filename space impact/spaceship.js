class Spaceship{

	constructor(){
		this.x = 30;
		this.y = height/2;
		this.velocity = 0;
		this.damage = 50;
		this.health = 300;
		this.w = 50;
	}

	render(){
		push();
			image(shipImg,this.x,this.y,this.w,this.w);

		pop();
	}


	update(){
		this.y += this.velocity;
	}

	move(s){
		this.velocity = s;
	}

	shoot(){
		playerProjectiles.push(new Projectile(this.x,this.y,6, (0)  ));
	}

	healthRender(){
		push()
			if(this.health > 250) fill(0,255,0)
			else if(this.health > 150) fill(175, 255, 5)
			else if(this.health > 500) fill(255, 63, 5)
			else fill(255,20,0)
			
			
			
			strokeWeight(2);

			rect(width*0.05,height*0.05, this.health * 0.6,20)
			stroke(255);
			noFill();
			rect(width*0.05,height*0.05,300 * 0.6,20);

		pop()
	}
}


