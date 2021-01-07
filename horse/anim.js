class Anim{

	constructor(sprite,dx,dy,x,y,frameWidth,frames,w){
		this.sprite = sprite//createImg(sprite);
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.dx = dx;
		this.tw = frameWidth;
		this.h = 107;
		this.frames = frames;
		this.w = w;
	
		
		
    	this.sprite.hide();
	}

	play(scl){
		push();
			imageMode(CENTER);
        	translate(this.x,this.y)
        	angleMode(DEGREES)
      		
       		if(frameCount % 5 == 0 ) this.dx += this.tw;
       			
       		scale(scl,1)
        	if (this.dx >= this.tw * this.frames ){ this.dx = 0}
        	image(this.sprite,0,0,this.w,this.w,this.dx,this.dy,this.tw,this.h)
		pop();
	}

}



