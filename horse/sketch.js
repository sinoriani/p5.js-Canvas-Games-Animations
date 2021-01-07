let horses;
let groundImg;
let horse;
let gravity = 0.3;
let ground;
let bckImg;
let bck;
let barrierImg;
let barriers = [];
let barriersRate;

let score ;
let lost = false;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    imageMode(CENTER);
    // loading sheet
    horses = createImg("img/horses.png");
    groundImg = createImg("img/ground.png");
    bckImg = createImg("img/background.png");
    barrierImg = createImg("img/barrier.png");
    bckImg.hide();
    barrierImg.hide();
    groundImg.hide();
    horse = new Horse();
    ground = new Ground();
    bck = new BackGround();
    score = new Score();

   
    
    
    textSize(180);
    textAlign(CENTER)
    barriersRate = 100;
}

function draw() { 
  background(0);
  bck.render();
  ground.render();

if(!lost){
	bck.update();
  ground.update();

  horse.render();

  horse.update();
  horse.edges();
  
  
  
  if(frameCount % barriersRate == 0) barriers.push(new Barrier());

  for(let i = barriers.length-1;i >= 0;i--){
  	barriers[i].render();
  	barriers[i].update();
  	if(horse.hits(barriers[i]) == 1) {
  		lost = true;
  	}else if(horse.hits(barriers[i]) == 2){
  		score.scr++;
  		
  	}
  	if(barriers[i].x < -40) barriers.splice(i,1)
  }

}else{ // display lose 
	push()
	textSize(60)
	fill(255,0,0,200)
	textStyle(BOLD);
	text("You lose",width/2,height*0.5);
	text("Tap to restart",width/2,height*0.6)
	pop()
}
  
	score.render();
} 


function keyPressed(){
  if (key == ' ') horse.GoUp();
  if(lost ) restart()
}

function touchStarted(){
	horse.GoUp();
	 if(lost ) restart()
}

function keyReleased(){
	

}

function restart(){
	lost = false;
	barriers = []
	horse.velocity.y = 0;
	score.scr = 0
}
