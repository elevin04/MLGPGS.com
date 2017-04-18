function Character(pos, img){
	this.w = 30;
	if(pos == 1){
		this.x = width - 2 * this.w;
	} else{
		this.x = this.w;
	}
	this.y = height / 2;
	this.yspeed = 0;
	if(img){
		this.image = img;
	}
	this.show = function(){
		if(img){
			imageMode(CORNER);
			image(img, this.x, this.y, 50, 50);
		}else{
			if(pos == 1){
				fill(255, 0, 0);
			}	else {
				fill(255);
			}
			rect(this.x, this.y, this.w, this.w);
		}
	}

	this.edges = function(){
		if(this.y > height - 50){
			this.y = height - 50;
		}else if(this.y < 0){
			this.y = 0;
		}
	}

	this.update = function(){
		this.y += this.yspeed;
		this.edges();
	}
}

function Bullet(starty){
	this.y = starty;
	this.x = 60;
	this.xspeed = 3;
	this.w = 10;

	this.show = function(){
		if(this.x < width){
			fill(255, 255, 0);
			rect(this.x, this.y, this.w, this.w);
		}
	}

	this.update = function(){
		this.x += this.xspeed;
		this.hit(bc);
	}

	this.done = function(){
		this.x = 1000;
	}

	this.hit = function(character){
		if(this.x > character.x && this.x < character.x + character.w && this.y > character.y && this.y < character.y + character.w + 20){
			this.done()
			bHealth--;
		}
	}

}
