let spaceship;
let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];
let explosions = [];

let shipImg;
let enemy1Img;
let explosionImg;

function setup(){
	createCanvas(window.innerWidth,window.innerHeight);

	shipImg = createImg("img/ship.png");
	shipImg.hide();

	enemy1Img = createImg("img/enemy1.png");
	enemy1Img.hide();

	explosionImg = createImg("img/explosion.png");
	explosionImg.hide();

	spaceship = new Spaceship();
	enemies.push(new Enemy1());

	imageMode(CENTER);
}


function draw(){
	background(77, 142, 87);

	spaceship.healthRender();
	spaceship.render();
	spaceship.update();
	//shooting

	if(frameCount % 20 == 0){
		spaceship.shoot();
	}


	//render player bullets
	for (var i = playerProjectiles.length - 1; i >= 0; i--) {
		playerProjectiles[i].render();
		playerProjectiles[i].update();

		
		// check intersection with enemies
		for (var j = enemies.length - 1; j >= 0; j--) {
			if(playerProjectiles[i].hits(enemies[j])){
				break;
			}	
		}

		// check intersection with enemies
		for (var j = enemyProjectiles.length - 1; j >= 0; j--) {
			if(playerProjectiles[i].hits(enemyProjectiles[j])){
				break;
			}	
		}

		// delete out of bound bullets
		if(playerProjectiles[i].edges() || playerProjectiles[i].dead){
			playerProjectiles.splice(i,1);
		}
		

		
	}


	//render enemies
	for (var i = enemies.length - 1; i >= 0; i--) {
		enemies[i].render();
		enemies[i].update();
		enemies[i].shoot();

		if(enemies[i].edges() || enemies[i].checkHealth()){
			enemies.splice(i,1);
		}
	}

	//render enemy bullets
	for (var i = enemyProjectiles.length - 1; i >= 0; i--) {
		enemyProjectiles[i].render();
		enemyProjectiles[i].update();

		enemyProjectiles[i].hits(spaceship);
		
		// delete out of bound bullets
		if(enemyProjectiles[i].edges() || enemyProjectiles[i].dead){
			enemyProjectiles.splice(i,1);
		}
	}


	//render explosions*
	for (var i = explosions.length - 1; i >= 0; i--) {
		explosions[i].render();
		if(explosions[i].timer <= 0) {
			explosions.splice(i,1);
		}
	}

	//spawn new enemies
	if(frameCount % 120 == 0) enemies.push(new Enemy1());


	// restart condition
	if(spaceship.health <= 0){
		enemies = [];
		playerProjectiles = [];
		enemyProjectiles = [];
		explosions = [];
		spaceship.health = 300;

	}
}












function keyPressed(){

	if(keyCode == UP_ARROW){
		spaceship.move(-6);
	}else if(keyCode == DOWN_ARROW){
		spaceship.move(6);
	}

	// if(key == ' '){
	// 	spaceship.shoot();
	// }
}

function touchStarted(){

	if(mouseY < spaceship.y){
		spaceship.move(-6);
	}else if(mouseY > spaceship.y){
		spaceship.move(6);
	}

	
		spaceship.shoot();
	
}

function keyReleased(){

	if(keyCode == UP_ARROW ||keyCode == DOWN_ARROW){
		spaceship.move(0);
	}
}

function touchEnded(){

	
		spaceship.move(0);
	
}


































