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


	instructionImg = createImg('img/Instruction.png');
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
let altitude = 1000;
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


class File{
	constructor(){
		
		this.pos = createVector(width*0.5,-70)
		this.vel = createVector(random(-2,2),random(5,8));
		this.r = 40;
		this.sprite = createImg("img/folder.png");
		this.sprite.hide()
		this.wd = 60;
		this.ht = 40;
	}

	render(){
		push();
			fill(255);
			//rect(this.pos.x,this.pos.y,this.wd,this.ht)
			image(this.sprite,this.pos.x+ this.wd/2,this.ht/2+this.pos.y,this.wd,this.ht)
		pop();
	}

	update(){
		this.pos.add(this.vel);
	}
}

class Bin{
	constructor(){
		this.pos = createVector(width/2,height*0.9);
		this.vel = createVector(0,0)
		this.r = 45;
		this.collected = 0;
	}

	render(){
		push();
			noFill()
			stroke(255,0,0)
			textSize(30)
			rect(this.pos.x,this.pos.y,80,40);
			text(this.collected +' Mb',width*0.8,height*0.1)
		pop();

		if(this.collected == 5){
			levelThree = false;
			cutSceneFourOn = true;
		}

		push()
		fill(100,150)
		textSize(25)
			rect(width*0.1-50,height*0.1-50,300,100)
			fill(255)
			text("Catch 5 files",width*0.1,height*0.1)
		pop()
	}

	update(){
		this.pos.add(this.vel)
	}

	move(s){
		this.vel = createVector(s,0)
	}

	hits(other){
		if(this.pos.x < other.pos.x + other.wd +40 && 
			this.pos.x > other.pos.x-  40 &&
			this.pos.y <other.pos.y + 20 ) return true;
	}
}

class Player{
	constructor(sprite){
		this.pos = createVector(width/2,height*0.8);
		this.vel = createVector(0,0);
		
		this.r = 50;
		this.exploded = false;
		this.angle = 0;

		this.heading = -PI/2;
		this.rotating = 0;
		this.isBoosting = false;
		this.upOrDown = 1;
		this.idle1 ;
		this.idle2 ;
		this.leftAnim = [];
		this.leftAnim2 = [];
		this.rightAnim = [];
		this.rightAnim2 = [];
		

		this.spriteIndex = 0;

		this.currentFire ;
		this.FireArr = [];
		this.spriteIndexFire  = 0 ;
		
	}

	render(){
		if(shipSelected == 1){
			this.currentImg = this.idle1;
		}else{
			this.currentImg = this.idle2;
		}
		if(levelOne){
			this.leftAnimation();
			this.rightAnimation();
		}

		this.currentFire = this.FireArr[0];
		this.fire();



		
		push();
		translate(this.pos.x,this.pos.y)
		rotate(this.heading + PI/2)
		noFill()
		
		if(this.currentFire)
			
		image(this.currentFire,0,45,30,30)

		//stroke(255);
		
		image(this.currentImg,0,0,this.r*2,this.r*2)
		//ellipse(0,0,this.r*2);
		
		//line(0,0,0,-30);
		pop();

		

		if(this.graplin ) this.graplin.render();
	}

	fire(){
		if(levelOne || this.vel.y < 0 || this.vel.y > 0 ) {
				if(frameCount % 5 == 0) {			
					this.spriteIndexFire++;
					if(this.spriteIndexFire>3) this.spriteIndexFire = 0
				}
				this.currentFire = this.FireArr[this.spriteIndexFire];
			}
			if(!levelOne)
			if(ceil(this.vel.y)  == 0 ||floor(this.vel.y)  == 0 ) {
				this.spriteIndexFire = 0;
				this.currentFire = undefined;
			}
			
	}

	leftAnimation(){
		if(shipSelected == 1){
			if(this.vel.x < 0) {
				if(frameCount % 5 == 0) {			
					this.spriteIndex++;
					if(this.spriteIndex>3) this.spriteIndex = 3
				}
				this.currentImg = this.leftAnim[this.spriteIndex];
			}
			if(this.vel.x == 0) {
				this.spriteIndex = 0;
			}
		}
		else{
			if(this.vel.x < 0) {
				if(frameCount % 5 == 0) {			
					this.spriteIndex++;
					if(this.spriteIndex > 4) this.spriteIndex = 4
				}
				this.currentImg = this.leftAnim2[this.spriteIndex];
			}
			if(this.vel.x == 0) {
				this.spriteIndex = 0;
			}
		}
		
		
	}
	rightAnimation(){
		if(shipSelected == 1){
			if(this.vel.x > 0) {
				if(frameCount % 5 == 0) {			
					this.spriteIndex++;
					if(this.spriteIndex>3) this.spriteIndex = 3
				}
				this.currentImg = this.rightAnim[this.spriteIndex];
			}
			if(this.vel.x == 0) {
				this.spriteIndex = 0;
			}
		}
		else{
			if(this.vel.x > 0) {
				if(frameCount % 5 == 0) {			
					this.spriteIndex++;
					if(this.spriteIndex>4) this.spriteIndex = 4
				}
				this.currentImg = this.rightAnim2[this.spriteIndex];
			}
			if(this.vel.x == 0) {
				this.spriteIndex = 0;
			}
			
		}
		
	}




	update(){
		this.pos.add(this.vel);
		this.edges();


	}

	move(s){

		this.vel = createVector(s,0);
	}

	hits(other){
		
		return dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y) < this.r+other.r;

		
	}

	explode(){
		if(!this.exploded)
		explosion = new Explosion();
		this.exploded = true;
		this.pos = createVector(width/2,5005);

	}







	// Level2 Controlls
	turn(angle){
		this.rotating = angle;
	}

	boost(){
		let force = p5.Vector.fromAngle(this.heading);
		force.mult(0.1*this.upOrDown)
		if((this.graplin && this.upOrDown == -1) || !this.graplin)
		
		this.vel.add(force);
	}

	boosting(b,upOrDown){
		this.isBoosting = b;
		this.upOrDown = upOrDown;
	}

	grab(){
		if(!this.graplin){
			this.graplin = new Graplin(this.pos.x,this.pos.y,this.heading );
			this.vel = createVector(0,0);
		}
		
	}

	edges(){
		if(this.pos.x > width-this.r)  this.pos.x = width-this.r;
		if(this.pos.x < +this.r)  this.pos.x = +this.r;

		if(this.pos.y > height-this.r)  this.pos.y = height-this.r;
		if(this.pos.y < +this.r)  this.pos.y = +this.r;
	}

	update2(){

		if(this.graplin){
			//satellites[1].pos = createVector(satellites[1].pos.x+cos(player.heading),satellites[1].pos.y+sin(player.heading))
		
		}
		this.heading += this.rotating;
		this.pos.add(this.vel);
		this.vel.mult(0.98);

		if(this.isBoosting)
			this.boost();

		if(this.graplin){
			// this.graplin.x = this.pos.x;
			// this.graplin.y = this.pos.y;
		}
		this.edges();
	}
}



class Graplin{
	constructor(x,y,angle){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.length = 100;

		this.reach = createVector(this.x + this.length* cos(this.angle),this.y + this.length*sin(this.angle))
		
	}

	render(){

		push();
			stroke(101, 4, 237);
			translate(this.x,this.y)
			line(0,0,this.length* cos(this.angle), this.length*sin(this.angle))
			//this.reach = createVector(this.length*cos(this.angle), this.length*sin(this.angle))
			this.x = player.pos.x;
			this.y = player.pos.y;
		pop();
	}
}

class Satellite{
	constructor(x,y,point){
		this.pos = createVector(x,y);
		this.vel = createVector(0,0);
		this.aligned = false;
		this.point = point;
		this.r = 80;
		this.i = 0;
		this.j = 0;
		this.angle = random(0,TWO_PI)
		this.angle2 = random(0,TWO_PI)
		this.pointer = createVector(0,0)
		this.pointer2 = createVector(0,0)
	}

	render(){
		push();

			noFill();
			stroke(255)
			strokeWeight(5)
			translate(this.pos.x,this.pos.y)
			if(frameCount % 10 == 0) this.j++;
			this.i = this.j % satelliteImgArr.length;
			this.pointMove();
			image(satelliteImgArr[this.i],0,0,this.r,this.r)
			//ellipse(this.pos.x,this.pos.y,this.r);
		pop();

		
	}

	pointMove(){
		this.angle+= 0.1
		this.angle2+= 0.12
		this.pointer.x = this.r * cos(this.angle)
		this.pointer.y = this.r * sin(this.angle)

		this.pointer2.x = this.r * cos(this.angle2)
		this.pointer2.y = this.r * sin(this.angle2)

		point(this.pointer2.x,this.pointer2.y)
		point(this.pointer.x,this.pointer.y)
	}

	update(){

		

		this.pos.add(this.vel);
		this.vel.mult(0.97);

		this.align();

		if(player.graplin && dist(player.graplin.reach.x,player.graplin.reach.y,this.pos.x,this.pos.y ) < this.r-40){
			this.grabbed = true;
		}

		if(this.grabbed){
			this.vel = createVector(player.vel.x,player.vel.y);
			//this.pos = createVector(this.pos.x+cos(player.heading),this.pos.y+sin(player.heading))
		}
		
		
		if(!player.graplin)
			this.grabbed = false;
	}

	align(){
		if(dist(this.pos.x,this.pos.y,this.point.x,this.point.y) < this.r){
			this.aligned = true;
		}else{
			this.aligned = false;
		}
	}

	

	
}








class Alignement{
	constructor(){
		this.color1 ;
		this.color2 ;
		this.alpha = 150;
		this.alphaGoingUp = true;
		this.alphaGoingDown =  false;
	}

	render(){
		this.update();
		
		push();
			strokeWeight(6);
			
			//line 1
			stroke(this.color1);
			line(width*0.1,height*0.4,width*0.5,height*0.3)
			//line 2
			stroke(this.color2);
			line(width*0.5,height*0.3,width*0.9,height*0.4)
		pop();


	}

	update(){

		if(this.alphaGoingUp) {
			this.alpha+=10;
		}else if(this.alphaGoingDown){
			this.alpha-= 10
		}

		if(this.alpha> 255) {
			this.alphaGoingUp = false;
			this.alphaGoingDown = true;
		}else if(this.alpha < 1) {
			this.alphaGoingUp = true;
			this.alphaGoingDown = false;
		}



		if(satellites[0].aligned && satellites[1].aligned){
			this.color1 = color(2, 242, 18,this.alpha)
		}else if(satellites[0].aligned && !satellites[1].aligned || !satellites[0].aligned && satellites[1].aligned){
			this.color1 = color(66, 241, 244,this.alpha);
		}else{
			this.color1 = color(255,0,0,this.alpha);
		}


		if(satellites[1].aligned && satellites[2].aligned){
			this.color2 = color(2, 242, 18,this.alpha);
		}else if(satellites[1].aligned && !satellites[2].aligned || !satellites[1].aligned && satellites[2].aligned){
			this.color2 = color(66, 241, 244,this.alpha);
		}else{
			this.color2 = color(255,0,0,this.alpha);
		}
	}
}



class SpaceDebree{
	constructor(col){
		this.col = col;
		if(levelOne)
				this.pos = createVector(random(0,width),random(-500,0));
		else if(levelTwo)
			this.pos = createVector(random(width,width+500),random(0,height));
		
		if(levelOne){
			this.vel = createVector(random(-1,1),random(5,3))
			this.r = this.vel.y *0.6 ;
		}
		else if(levelTwo){
			this.vel = createVector(random(-3,-6),random(-3,-1))
			this.r = this.vel.x *0.6 * -1 ;
		}	

		if(this.col == 255){
			this.vel = createVector(0,random(10))
			this.r = 1;
		}
		
		
	}

	render(){	
		push()

			strokeWeight(this.r)
			stroke(this.col)
			point(this.pos.x,this.pos.y)
		pop()

		this.update();
		this.edges();
	}

	update(){
		this.pos.add(this.vel)
	}

	edges(){
		if(levelTwo){
			if(this.pos.x < 0) this.pos.x = width;
			else if(this.pos.x > width+500) this.pos.x = 0;
			if(this.pos.y < 0) this.pos.y = height;
			else if(this.pos.y > height) this.pos.y = 0;
		}else if(levelOne){
			if(this.pos.x < 0) this.pos.x = width;
			else if(this.pos.x > width) this.pos.x = 0;
			if(this.pos.y < 0) this.pos.y = height;
			else if(this.pos.y > height+500) this.pos.y = 0;
		}

			
	}

	hits(){
		if((this.pos.x-player.pos.x)*(this.pos.x-player.pos.x) +
		   (this.pos.y-player.pos.y)*(this.pos.y-player.pos.y) < player.r*player.r )
			return true;
	}
}

class cutSceneOne{
	constructor(){
		this.timer = 0;
		this.images = [];
		this.imageTimer = 0;
		this.index = 0;
		for(let i=0;i<8;i++){
			this.images.push(createImg(`img/cutSceneOne/${i+1}.jpg`));
			this.images[i].hide();
		}
		this.paused = false;
		
	}

	render(){
		if(!this.paused){
			this.paused = true;
			soundtrack.pause()
		}
		
		this.imageTimer++;
		push()
		imageMode(CORNER)
		image(this.images[this.index],0,0,width,height)
		this.textShow();

		pop()

		if(this.imageTimer > 150){
			this.imageTimer = 0;
			this.index++;
		}

		if(this.index >= this.images.length){
			// next level
			levelOne = true;
			cutSceneOneOn = false;
		}
	}

	textShow(){
		push()
		if(this.index == 0){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("I'm mastering this game , this is so much fun..",width*0.5,height*0.85)
		}else if(this.index == 1){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("Huuh ??!..",width*0.7,height*0.85)
		}
		else if(this.index == 2){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("Huuuuuuh ??!..",width*0.69,height*0.85)
		}else if(this.index == 5){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("I will fix this myself..",width*0.5,height*0.85)
		}else if(this.index == 7){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("Space here i come..",width*0.5,height*0.85)
		}
		pop()
	}
}

class cutSceneTwo{
	constructor(){
		this.timer = 0;
		this.images = [];
		this.imageTimer = 0;
		this.index = 0;
		for(let i=0;i<1;i++){
			this.images.push(createImg(`img/cutSceneOne/${9}.jpg`));
			this.images[i].hide();
		}
		this.paused = false;
	}


	render(){
		if(!this.paused){
			windSound.pause();
			this.paused = true;
			coolSound.play();
			soundtrack.pause()
			obstacles = []
		}
		
		this.imageTimer++;
		push()
		imageMode(CORNER)
		image(this.images[this.index],0,0,width,height)

		pop()

		
		if(this.imageTimer > 250){
			this.imageTimer = 0;
			this.index++;
		}

		this.textShow();

		if(this.index >= this.images.length){
			// next level
			levelTwo = true;
			cutSceneTwoOn = false;
		}


	}

	textShow(){
		push()
		if(this.index == 0){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("I have to realign the satellites..",width*0.5,height*0.85)
		}
		pop()
	}
}


class cutSceneThree{
	constructor(){
		this.timer = 0;
		this.images = [];
		this.imageTimer = 0;
		this.index = 0;
		for(let i=0;i<1;i++){
			this.images.push(createImg(`img/cutSceneThree/${i}.jpg`));
			this.images[i].hide();
		}
		this.paused = false;
	}


	render(){
		if(!this.paused){
			noiseSpaceSound.pause();
			soundtrack.pause();
			this.paused = true;
		}
		
		this.imageTimer++;
		push()
		imageMode(CORNER)
		image(this.images[this.index],0,0,width,height)

		pop()

		if(this.imageTimer > 200){
			this.imageTimer = 0;
			this.index++;
		}

		if(this.index >= this.images.length){
			// next level
			levelThree = true;
			cutSceneThreeOn = false;
		}

		this.textShow()
	}

	textShow(){
		push()
		if(this.index == 0){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("All i have to do now is to recollect the data..",width*0.5,height*0.85)
		}
		pop()
	}
}

class cutScene4{
	constructor(){
		this.timer = 0;
		this.images = [];
		this.imageTimer = 0;
		this.index = 0;
		for(let i=0;i<7;i++){
			this.images.push(createImg(`img/cutSceneThree/${i+1}.jpg`));
			this.images[i].hide();
		}
		this.paused = false;
	}


	render(){
		if(!this.paused){
			noiseSpaceSound.pause();
			this.paused = true;
		}
		
		this.imageTimer++;
		push()
		imageMode(CORNER)
		image(this.images[this.index],0,0,width,height)

		pop()

		if(this.imageTimer > 150){
			this.imageTimer = 0;
			this.index++;
		}

		if(this.index >= this.images.length){
			// next level
			//levelThree = true;
			//cutSceneThreeOn = false;
			this.index = 6;
		}

		this.textShow()
	}

	textShow(){
		push()
		if(this.index == 2){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("*Wakes up disoriented and confused..",width*0.5,height*0.85)
		}else if(this.index == 3){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("It was just a dream...",width*0.5,height*0.85)
		}else if(this.index == 4){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("OMG..",width*0.5,height*0.85)
		}else if(this.index == 5){
			fill(0,150)
			rect(width*0.5-50,height*0.85-50,800,100)
			fill(255)
			text("..LOL",width*0.5,height*0.85)
		}
		pop()
	}
}


class Obstacle{
	constructor(y){
		this.pos = createVector(random(width*0.05,width*0.95), -100);
		this.vel = createVector(0,random(4,6));
		this.r = random(10,30);
		this.sprite = random(asteroidImgArr);
		this.angle =0;
		this.angularSpeed = random(0.02,0.09) ;
	}

	render(){
		push();
			noFill();
			translate(this.pos.x,this.pos.y)
			rotate(this.angle)
			image(this.sprite,0,0,this.r*2,this.r*2)
			//ellipse(this.pos.x,this.pos.y,this.r*2);
		pop();
	}

	update(){
		this.pos.add(this.vel);
		this.angle+= this.angularSpeed;
		//this.edges();
	}

	edges(){
		if(this.pos.y > height+this.r) this.pos.y = - width/2;
	}
}

class Explosion{

	constructor(){
		this.x = player.pos.x;
		this.y = player.pos.y;
		this.particles = [];
		for (var i = 0; i < 30; i++) {
			this.particles.push(new Particle(this.x,this.y));
		}
	}

	render(){
		for (var i = this.particles.length - 1; i >= 0; i--) {
			this.particles[i].render();
			
		}
	}

	update(){
		for (var i = this.particles.length - 1; i >= 0; i--) {
			
			this.particles[i].update();
			if(this.particles[i].done() ) this.particles.splice(i,1)
		}
	}
}


class Particle{

	constructor(x,y,col){
		this.pos = createVector(x,y);
		this.lifeSpan = 255;
		this.col = color(255);


		
			this.vel = p5.Vector.random2D();
			this.vel.mult(random(3,6))
		
		this.acc = createVector(0,0);
	}

	applyForce(force){
		this.acc.add(force);
	}

	update(){
		this.applyForce(gravity);
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);

	}

	render(){
		push()
		stroke(255)
		strokeWeight(3)
		//stroke(this.col.r,this.col.g,this.col.b,this.lifeSpan);
		point(this.pos.x,this.pos.y);
		pop()
	}

	done(){
		return this.lifeSpan < 0;
		
	}
}

class Score{
	constructor(){
		this.score = 0;
		this.x = width * 0.7;
		this.y = height * 0.1;
	}

	render(){
		push();
			fill(255,0,150);
			noStroke();
			text("Score "+floor(this.score),this.x,this.y);
		pop();


		//if(frameCount % 10== 0) this.score++;
	}
}