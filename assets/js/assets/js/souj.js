var bc;
var souj;
var bullets = [];
var soujImg;
var bcImg;
var frames = 45;
var sspeed = 0;
var bspeed = 5;
var bHealth = 5;
var bAlive = true;
var soujImg;
var bcImg;


function preload() {
	soujImg = loadImage("images/SOUJ.png");
	bcImg = loadImage("images/bc.png")
}

function setup() {

	createCanvas(600, 600);
	souj = new Character(0, soujImg);
	bc = new Character(1, bcImg);
	bc.yspeed = 5;
}

function draw() {
	background(51);
	souj.update(sspeed);
	souj.show();
	bc.update(bspeed);
	bc.show();
	frames++;
	for(var i = 0 ; i < bullets.length ; i++){
		bullets[i].update();
		bullets[i].show();
	}
	if(bAlive){
		if(frameCount % 45 == 0 && round(random(0, 1)) == 1){
			bc.yspeed *= -1;
		}
	} else{
		bc.yspeed = 0;
		bspeed = 0;
	}
	bAlive = bHealth > 0;
	if(bHealth < 0){
		bHealth = 0;
	}
	if(!bAlive){
		textSize(14);
		fill(255, 0, 255);
		text("CLAIM YOUR FREE IPOD TOUCH AT\nhttps://goo.gl/eqbUzw", 20, 200);
	}

	fill(255);
	textSize(20);
	text("Hits Remaining: " + bHealth, width / 2 + 120, 30);
}

function keyPressed(){
	if(keyCode == UP_ARROW){
		souj.yspeed = -5;
	} else if (keyCode == DOWN_ARROW){
		souj.yspeed = 5;
	} else if (keyCode == 32 && frames > 45){
	 	frames = 0;
	 	bullets.push(new Bullet(souj.y + 15));
	}
}

function keyReleased() {
	if(keyCode == UP_ARROW || keyCode == DOWN_ARROW){
		souj.yspeed = 0;
	}
}
