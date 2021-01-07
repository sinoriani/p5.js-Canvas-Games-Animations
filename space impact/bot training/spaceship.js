class Spaceship{

	constructor(game,brain){
		this.x = 30;
		this.y = height/2;
		this.velocity = 0;
		this.damage = 50;
		this.health = 50;
		this.w = 50;
		this.game = game;
		this.fitness = 0;
		this.score = 0;
		if(brain)
			this.brain = brain;
		else
			this.brain = new NeuralNetwork(inputNodesNb,hiddenNodesNb,outputNodesNb)
	}

	render(){
		push();
			image(shipImg,this.x,this.y,this.w,this.w);

		pop();
	}


	update(){
		this.think(this.game.enemyProjectiles,this.game.enemies);
		this.y += this.velocity;

		this.score+= 0.1;
	}

	move(s){
		this.velocity = s;
	}

	shoot(){
		this.game.playerProjectiles.push(new Projectile(this.x,this.y+this.w/2,6, (0) , this.damage,this.game));
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

	edges(){
		if(this.y < 0){
		 this.y = 0;
		}

		if(this.y > height - this.w){
		 this.y = height - this.w;
		}
	}


	findClosestObstacle(_obstacles){
		let closest = null;
		let closestD = Infinity ;

		let closest2 = null;
		let closestD2 = Infinity ;

		for (let i = 0; i < _obstacles.length; i++) {
			let d = _obstacles[i].x+_obstacles[i].wd  - this.x ;
			if(d < closestD && d>0){

				closest2 = closest;
				closestD2 = closestD ;

				closestD = d;
				closest = _obstacles[i];
			}

		}

		return [closest,closest2];
	}

	findClosestEnemy(_enemies){
		let closest = null;
		let closestD = Infinity ;

		for (let i = 0; i < _enemies.length; i++) {
			let d = _enemies[i].x  - (this.x+this.w) ;
			if(d < closestD && d>0){
				closestD = d;
				closest = _enemies[i];
			}

		}

		return closest;
	}

	think(_obstacles,_enemies){
		let inputs = [];
		let closestObstacles = this.findClosestObstacle(_obstacles);
		let closestEnemy = this.findClosestEnemy(_obstacles);
		inputs[0] = this.y /height;
		inputs[1] = this.velocity / 6 ;
		
		inputs[2] = closestObstacles[0] ? closestObstacles[0].x  / width  : 0;
		inputs[3] = closestObstacles[0] ? (closestObstacles[0].y+ closestObstacles[0].ht/2) / height : 0;

		inputs[4] = closestObstacles[1] ? closestObstacles[1].x / width : 0;
		inputs[5] = closestObstacles[1] ? (closestObstacles[1].y + closestObstacles[1].ht/2) / height : 0;

		inputs[6] = closestEnemy ? closestEnemy.x  / width  : 0;
		inputs[7] = closestEnemy ? (closestEnemy.y+ closestEnemy.ht/2) / height : 0;


		let outputs = this.brain.predict(inputs);  // 0 = up , 1 = idle , 2 = down
		//this.outputs = outputs;

		if(outputs[0] > outputs[1] && outputs[0] > outputs[2])
			this.move(-6);
		else if(outputs[1] > outputs[0] && outputs[1] > outputs[2]){
			this.move(0);
		}else if(outputs[2] > outputs[0] && outputs[2] > outputs[1]){
			this.move(6);
		}

	}


	mutate(){
		this.brain.mutate(x => ( random(1) < mutationRate ? x + randomGaussian(0,0.1) : x ));
	}
}


