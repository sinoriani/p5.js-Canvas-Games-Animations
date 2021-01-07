let score;
let player;
let obstacles = [];
let satellites = [];
let spaceDebries = [];

let lost = false;
let explosion;
let gravity; 

let skyPurple;
let skyBlue;
let asteroidImg;
let lvlthreebackground;
let asteroidPieces;
let mainMenu;
let instructionImg;


let asteroidImgArr = [];
let asteroidPiecesArr = [];
let satelliteImgArr = [];
let spaceShipImg = [];

let mainMenuOn = true;
let cutSceneOneOn = false;
let levelOne = false;
let cutSceneTwoOn = false;
let levelTwo = false;
let cutSceneThreeOn = false;
let levelThree = false;
let cutSceneFourOn = false;


let cutSceneFour;


let bin;
let alignement;
let files = [];

let soundtrack;
let windSound;
let noiseSpaceSound;
let coolSound;
let mainMenuPlay;

let shipSelected = 2;



function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    textSize(30);
    imageMode(CENTER);

    player = new Player();
    score = new Score();
    
    gravity =  createVector(0,0.05);

    satellites.push(new Satellite(width*0.1 + 70,height*0.4+80, {x:width*0.1,y:height*0.4} ))
    satellites.push(new Satellite(width*0.5+30,height*0.3-80, {x:width*0.5,y:height*0.3}))
    satellites.push(new Satellite(width*0.9-90,height*0.4+80, {x:width*0.9,y:height*0.4}))

    alignement = new Alignement();
    cutSceneOne = new cutSceneOne();
    cutSceneTwo = new cutSceneTwo();
    cutSceneThree = new cutSceneThree();
    cutSceneFour = new cutScene4();
    
    bin = new Bin();
    loadSounds();

    loadImages();
    mainMenuPlay = new MainMenuPlay();
	
    
}

function draw() { 
  background(0);
  //backgroundMovement()

  if(mainMenuOn) mainMenuPlay.render();

  if(cutSceneOneOn) cutSceneOne.render();

  if(levelOne) LevelOne();

  if(cutSceneTwoOn) cutSceneTwo.render();

  if(levelTwo) LevelTwo();

  if(cutSceneThreeOn) cutSceneThree.render();

  if(levelThree) LevelThree();

    if(cutSceneFourOn) cutSceneFour.render();

  



  
}


class MainMenuPlay{
	constructor(){
		this.selectRight = createVector(width*0.35,height*0.605)
		this.selectLeft = createVector(width*0.65,height*0.605)
		this.selectRadius = 60;
		this.sprite = player.idle1;
		this.info = createVector(width*0.5,height*0.9)
		this.currentPage = mainMenu
		this.currentPageIndex = 1;
		this.backButton = createVector(width*0.1,height*0.86)
		this.playButton = createVector(width*0.83,height*0.87)
	}
	
	render(){
	//this.select()
		push()
			imageMode(CORNER)
			image(this.currentPage ,0,0,width,height)
			//ellipse(this.selectRight.x,this.selectRight.y,this.selectRadius)
			//ellipse(this.selectLeft.x,this.selectLeft.y,this.selectRadius)
			//ellipse(this.playButton.x,this.playButton.y,60)
			
			if(this.currentPageIndex == 1){
				imageMode(CENTER)
				image(this.sprite,width/2,height/2+50,150,230)
			}
			
			

		pop()
	}

	select(num){
		if(num == 1){
			this.sprite = player.idle1;
			this.currentPageIndex = 1;
			// image(player.idle1,width/2,height/2+50,150,230)
			// console.log(1)
		}
		
		else if(num == 2){
			this.sprite = player.idle2;
			this.currentPageIndex  = 1;
			//image(player.idle2,width/2,height/2+50,170,250)
			//console.log(1)
		}
		else if(num == 3){
			this.currentPage = instructionImg;
			this.currentPageIndex = 2
		}else if(num == 4){
			this.currentPage = mainMenu;
			this.currentPageIndex = 1
		}
		else if(num == 5){
			mainMenuOn = false;
			cutSceneOneOn = true;
		}
		
	}
	
}

function selectShip(){

}

function mousePressed(){
	if(dist(mouseX,mouseY,mainMenuPlay.selectRight.x,mainMenuPlay.selectRight.y) < mainMenuPlay.selectRadius){
		mainMenuPlay.select(1)
		
	}
	else if(dist(mouseX,mouseY,mainMenuPlay.selectLeft.x,mainMenuPlay.selectLeft.y) < mainMenuPlay.selectRadius){
		mainMenuPlay.select(2)
		
	}
	else if(dist(mouseX,mouseY,mainMenuPlay.info.x,mainMenuPlay.info.y) < mainMenuPlay.selectRadius*1.5){
		mainMenuPlay.select(3)
		
	}
	else if(dist(mouseX,mouseY,mainMenuPlay.backButton.x,mainMenuPlay.backButton.y) < mainMenuPlay.selectRadius*2){
		mainMenuPlay.select(4)
		
	}
	else if(dist(mouseX,mouseY,mainMenuPlay.playButton.x,mainMenuPlay.playButton.y) < mainMenuPlay.selectRadius*2){
		mainMenuPlay.select(5)
		
	}
}

function loadSounds(){
	soundtrack = new Audio('sounds/soundtrack.wav');
	//soundtrack.play();
	soundtrack.volume = 0.3;
	soundtrack.loop = true;

	windSound = new Audio('sounds/wind.wav');
	noiseSpaceSound = new Audio('sounds/noise space louder.wav');
	explosionSound = new Audio('sounds/explosionSound.wav');
	metalImpact = new Audio('sounds/metalImpact.wav');
	coolSound = new Audio('sounds/coolSound.wav');


}




function keyReleased(){
  if( ((keyCode == RIGHT_ARROW || key == 'D') && player.vel.x == 4) || ((keyCode == LEFT_ARROW|| key == 'Q')  && player.vel.x  == -4) ){
    player.move(0);
  }

  if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW){
		player.turn(0);
	}
	if(keyCode == UP_ARROW){
		player.boosting(false);
	}if(keyCode == DOWN_ARROW){
		player.boosting(false);
	}

	if(levelThree ) {
  	if(keyCode == RIGHT_ARROW && bin.vel.x > 0){
		bin.move(0);
	}else if(keyCode == LEFT_ARROW && bin.vel.x < 0){
		bin.move(0);
	}
	
	
  }
}

function keyPressed(){
 
 if(lost && key == 'R') restart();

 if(levelOne){
 	if(keyCode == RIGHT_ARROW || key == 'D' ){
    player.move(4);
  }

  if(keyCode == LEFT_ARROW || key == 'Q'){
    player.move(-4);
  }
 }
  


  if(levelTwo ) {
  	if(keyCode == RIGHT_ARROW){
		player.turn(0.05);
	}else if(keyCode == LEFT_ARROW){
		player.turn(-0.05);
	}else if(keyCode == UP_ARROW){
		player.boosting(true,1);
	}else if(keyCode == DOWN_ARROW){
		player.boosting(true,-1);
	}

	if(key == ' ' && !player.graplin){
		player.grab();
	}else if(key == ' ' && player.graplin){
		player.graplin = undefined;
	}
  }

  if(levelThree ) {
  	if(keyCode == RIGHT_ARROW){
		bin.move(5);
	}else if(keyCode == LEFT_ARROW){
		bin.move(-5);
	}

	
  }

 }


function restart(){
	lost = false;
	altitude = 1500;
	explosion = undefined;
	player.exploded = false;
	player.pos = createVector(width/2,height*0.8);
	if(obstacles.length > 0) obstacles.splice(0,obstacles.length)
}

function loadImages(){
	skyPurple = createImg("img/skyPurple.jpg")
	skyPurple.hide();

	mainMenu = createImg('img/mainMenu.png');
	mainMenu.hide();


	instructionImg = createImg('img/instruction.png');
	instructionImg.hide();

	skyBlue = createImg("img/skyPurple.jpg");
	skyBlue.hide();

	for (var i = 0;i < 7 ;i++) {
		asteroidImgArr.push(createImg(`img/asteroid/${i+1}.png`));
		asteroidImgArr[i].hide();
	}

	for (var i = 0;i < 6 ;i++) {
		satelliteImgArr.push(createImg(`img/sat/${i+1}.png`));
		satelliteImgArr[i].hide();
	}

	for (var i = 0;i < 3 ;i++) {
		player.FireArr.push(createImg(`img/fire/${i}.png`));
		player.FireArr[i].hide();
	}


	lvlthreebackground = createImg("img/lvlthreebackground.jpg");
	lvlthreebackground.hide();


	//spaceship
	

		player.idle1 = createImg(`img/spaceship/top.png`);
		player.idle1.hide();

		

		for (var i = 0; i < 4 ;i++) {
			player.leftAnim.push(createImg(`img/spaceship/Left/${i}.png`));
			player.leftAnim[i].hide();
		}

		for (var i = 0; i < 4 ;i++) {
			player.rightAnim.push(createImg(`img/spaceship/right/${i}.png`));
			player.rightAnim[i].hide();
		}

		//ship2
		player.idle2 = createImg(`img/ship2/${5}.png`);
		player.idle2.hide();

		for (var i = 0; i < 5 ;i++) {
			player.leftAnim2.push(createImg(`img/ship2/${5-i}.png`));
			player.leftAnim2[i].hide();
		}

		for (var i = 0; i < 5 ;i++) {
			player.rightAnim2.push(createImg(`img/ship2/${i+5}.png`));
			player.rightAnim2[i].hide();
		}


		
	
}







let x = 2;
function backgroundMovement(){
  
  x+= 1.5;
  image(backgroundImg,width/2,-height/2+x,width,height)
  image(backgroundImg,width/2,height/2+x,width,height)
  if(x> height) x = 0;
}





function renderObstacles(){
	for(let i=obstacles.length-1;i>=0;i--){
  	obstacles[i].render();
  	obstacles[i].update();
  	

  	if(player.hits(obstacles[i])){
  		lost = true;
  		player.explode();
  		explosionSound.play();
  		explosionSound.volume = 0.7;
  		metalImpact.play();
  		metalImpact.volume = 0.9;
  		metalImpact.playbackRate = 0.5;
  	}

  	if(obstacles[i].pos.y > height+ 30 ) obstacles.splice(i,1);
  }
}

let spawnedDebree = false;
let altitude = 1500;
function LevelOne(){

	soundtrack.play()
	soundtrack.loop = true;


	image(skyPurple,width/2,height/2,width,height)
	if(!spawnedDebree){
		spawnedDebree = true;
		for(let i=0;i<150;i++){
			spaceDebries.push(new SpaceDebree(0));
		}

		for(let i=0;i<100;i++){
			spaceDebries.push(new SpaceDebree(255));
		}
	}
	for(let i=0;i<spaceDebries.length;i++){
			spaceDebries[i].render();

		}

	

	if(!lost){
	windSound.play();
	windSound.volume = 0.2;
	windSound.loop = true;
  	if(frameCount % 12 == 0) obstacles.push(new Obstacle());

  	altitude--;
  	fill(66, 116, 244)
  	text(altitude+' Km',width*0.1,height*0.1)

  	for (var i = obstacles.length - 1; i >= 0; i--) {
  		

  		if(obstacles[i].pos.y > height+100)
  		obstacles.splice(i,1);
  	}

  	player.render();
  	player.update();


}
  
	renderObstacles();
  

  if(explosion) {
  	explosion.render();
  	explosion.update();
  }
  
 // score.render();

  if(altitude < 0) {
  	cutSceneTwoOn = true;
  	levelOne = false;
  	spaceDebries = []
  	spawnedDebree = false;
  }
}



spawnedDebree = false;
function spawnDebree(){
	if(!spawnedDebree){
		spawnedDebree = true;
		for(let i=0;i<150;i++){
		spaceDebries.push(new SpaceDebree(0));

	}



	}
}

counter = 0;
function LevelTwo(){
	
	spawnDebree();
	
		soundtrack.play()
		soundtrack.loop = true;
		soundtrack.volume = 0.8

		noiseSpaceSound.play()
		noiseSpaceSound.loop = false;
		noiseSpaceSound.volume = 0.4;
	

	image(skyPurple,width/2,height/2,width*1,height*1)
	if(!lost){
  		player.render();
  		player.update2();

  		HandleSatellites();
  		alignement.render();

  		for(let i=0;i<spaceDebries.length;i++){
			spaceDebries[i].render();

		}

	}

	if(satellites[0].aligned && satellites[1].aligned && satellites[2].aligned){
		counter++;
	}

	if(counter == 100){
		levelTwo = false;
		cutSceneThreeOn = true;
	}

}

function HandleSatellites(){
	for (var i = satellites.length - 1; i >= 0; i--) {
		satellites[i].render();
		satellites[i].update();
	}
}

function LevelThree(){
	image(lvlthreebackground,width/2,height/2,width*1,height*1)
	if(!lost){
  		
		if(frameCount % 110 == 0) files.push( new File() ) ;

		for (var i = files.length - 1; i >= 0; i--) {
			files[i].render();
			files[i].update();
			if(bin.hits(files[i])){
				bin.collected++;
				files[i].pos.x = bin.x;
				files[i].pos.y = bin.y;
				// continue;
			}
			if(files[i].pos.y > height+100) {
				
				files.splice(i,1);
			}
		}

		bin.render();
		bin.update();
  		

	}
}
