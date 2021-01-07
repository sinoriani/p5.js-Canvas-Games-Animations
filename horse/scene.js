class Ground{
	constructor(){
		this.x = 0;
	}

	render(){
		image(groundImg,this.x + width/2,height*0.935,width,height*0.3)
  		image(groundImg, this.x +width/2 + width,height*0.935,width,height*0.3)
  		if(this.x < -width) this.x  = 0;
  		
	}

	update(){
		this.x-=5;
	}

}

class BackGround{
	constructor(){
		this.x = 0;
	}

	render(){
		
		image(bckImg,this.x + width/2,height/2,width,height)
  		image(bckImg, this.x +width/2 + width,height/2,width,height)
  		
  		
	}

	update(){
		if(this.x < -width) this.x  = 0;
  		this.x-= 0.5;
	}
}


class Barrier{
	constructor(){
		this.x = width;
		this.y = height*0.90;
		this.wd = 20;
		this.ht = this.wd * 2.79;
	}

	render(){
		
		image(barrierImg,this.x,this.y,this.wd,this.ht)
  		
  		
  		//rect(this.x - this.wd/2,this.y - this.ht/2,this.wd,this.ht)	
	}

	update(){
		this.x-=5;
	}
}

class Score{
	constructor(){
		this.x = width/2;
		this.y = height*0.3;
		this.scr = 0;
	}

	render(){
		strokeWeight(4);
		fill(67, 68, 68,150)
		noStroke()
		text(this.scr,this.x,this.y);
	}
}