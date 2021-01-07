
let r = 150;
let sides = 5;
let slider;

function setup(){
	createCanvas(window.innerWidth,window.innerHeight)
	slider = createSlider(0, 20, sides);
    slider.position(20, 20);
    textSize(20);
    textAlign(CENTER,CENTER)
}

function draw(){

	
	background(0);
	
	stroke(255);
	sides = slider.value();

	fill(255)
	text("sides = " + sides ,width*0.5,height*0.2)
	noFill()
    translate(width/2,height/2);
	rotate(-3.13/2)

	beginShape();
	for (var i = 0; i<=sides ; i++) {
		vertex(r*cos(i/sides*TWO_PI) , r* sin(i/sides*TWO_PI));
	}
	endShape();
}