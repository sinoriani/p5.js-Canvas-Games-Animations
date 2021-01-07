class Horse{
	constructor(){
		this.x = 80;
		this.y = height*0.9;
		this.w = 80;
		this.anim = new Anim(horses,0,97,this.x,this.y,107,4,this.w,1);
		this.velocity = createVector(0,0);
	}

	render(){
		// if(this.velocity.x > 0)
		// 	this.anim.play(1)
		if(this.velocity.y < 10)
			this.jump();

		else  //if(this.velocity.x <= 0)
			this.anim.play(-1)
		
		
	}

	update(){
		this.velocity.y += gravity;
		if(this.velocity.y  > 10){
			
			this.velocity.y = 10;
		} 
		this.y += this.velocity.y;

		
	}

	jump(){
		push();
			imageMode(CENTER);
        	translate(this.x,this.y)
        	angleMode(DEGREES)
      		rotate( map(this.velocity.y,-10,10,-25,15))
       	
       		
        	scale(-1,1)
        	image(this.anim.sprite,0,0,this.anim.w,this.anim.w,316,97,this.anim.tw,this.anim.h)
		pop();
	}

	GoUp(){
		if(this.velocity.y >= 10){
			this.velocity.y = -10;
		
		}
		
	}

	edges(){
		if(this.y > height*0.9) this.y = height*0.9;
	}

	hits(other){
		// noFill()
		// stroke(255);
		// // collider for the horsie
		// rect(this.x - this.w/2,this.y - this.w/2 ,this.w,this.w - 20)
		if(this.x - this.w/2 + this.w > other.x - other.wd/2 &&
			   this.x - this.w/2 + this.w < other.x - other.wd/2+other.wd &&
			   this.y - this.w/2 + this.w-20 >other.y - other.ht/2 && 
			   this.y - this.w/2 + this.w-20 < other.y  - other.ht/2+ other.ht )
		return 1;

	    if(  this.x - this.w/2 + this.w > other.x - other.wd/2 &&
	    	 this.x - this.w/2 + this.w < other.x - other.wd/2+other.wd &&
	    	 this.y - this.w/2 < other.y - other.ht/2)
	 	return 2;
		
		
	 }
}