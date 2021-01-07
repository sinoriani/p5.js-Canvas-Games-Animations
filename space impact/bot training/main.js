

let inputNodesNb = 8 , hiddenNodesNb = 10 , outputNodesNb = 3;


// let spaceship;
// let enemies = [];
// let playerProjectiles = [];
// let enemyProjectiles = [];
// let explosions = [];

// let shipImg;
// let enemy1Img;
// let explosionImg;

const TOTAL = 150;
let games = [];
let savedBots = [];


function setup(){
	createCanvas(window.innerWidth,window.innerHeight);
	inputNodes = 5 ; hiddenNodes = 5 ; outputNodes = 2;
	shipImg = createImg("img/ship.png");
	shipImg.hide();

	enemy1Img = createImg("img/enemy1.png");
	enemy1Img.hide();

	explosionImg = createImg("img/explosion.png");
	explosionImg.hide();

	/*spaceship = new Spaceship();
	enemies.push(new Enemy1());*/

	for(let i = 0 ; i< TOTAL ; i++){
		games.push(new Game());

	}
	

	imageMode(CORNER);
}


function draw(){
	background(77, 142, 87);

	games[0].updateAndRender();
	
	for(let i= games.length-1; i> 0 ; i--){
		games[i].update();
		if(games[i].gameOver){
			games.splice(i,1);
		}
	}


	if(games.length == 0){
		nextGeneration();
	}
	
}












/*function keyPressed(){

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
	
}*/