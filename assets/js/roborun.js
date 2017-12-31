let obstacles = [];
let souj;
let diff = 4;
let alive = true;
let score = 0;
let bgImg;
let soujImg;
let roboImg;

function preload(){
	souj = loadImage("images/souj.png");
	bg = loadImage("images/bg.png")
	robo = loadImage("images/robot.png")
}


function setup() {
	createCanvas(900, 300);
	obstacles.push(new Obstacle(width, 205, 40, 30, diff));
	souj = new Character();
}

function draw() {
	if (alive) {
		imageMode(CORNER);
		image(bgImg, 0, 0);
		fill(255, 0, 0);
		let str = "Score: "
		str += score;
		str += " Level: ";
		str += diff-3;
		textSize(24);
		text(str, width / 2 - 100,24);
		fill(0, 255, 0);
		rect(0, 175 + 60, width, height - 175);
		souj.update();
		souj.show();
		for (let i = 0; i < obstacles.length; i++) {
			obstacles[i].update();
			obstacles[i].show();
			if (obstacles[i].x + obstacles[i].width < 0) {
				obstacles.splice(i, 1)
			}
		}
		if (frameCount % 20 == 0) {
			score++;
			if (score % 50 == 0) {
				diff++;
			}
		}
		if (frameCount % 50 == 0) {
			if (random() < .5) {
				obstacles.push(new Obstacle(width + random(0, 50), 205, 40, 30, diff));
			}
		}

		for (let i = 0; i < obstacles.length; i++) {
			if (souj.x < obstacles[i].x + obstacles[i].w && souj.x + souj.w > obstacles[i].x && souj.y < obstacles[i].y + obstacles[i].h && souj.y + souj.h > obstacles[i].y) {
				alive = false;
			}
		}
	}
	else{
		fill(255, 0, 0);
		textSize(20);
		text("Souj has been defeated by the Roboda army! Refresh the page to try again!", 0, height / 2);
	}
}

function keyPressed() {
	if (keyCode == 32) {
		if (souj.y == 210) {
			souj.jump();
		}
	}
}

class Character {
	constructor() {
		this.x = 60;
		this.y = 210;
		this.w = 25;
		this.h = 25;
		this.momentum = 0;
	}

	show() {
		fill(0, 0, 255);
		imageMode(CORNER);
		image(soujImg, this.x, this.y);
	}

	jump() {
		this.momentum = 9;
	}

	update() {
		this.y -= this.momentum;
		this.momentum -= .5;
		if (this.y > 210) {
			this.y = 210;
		}
	}
}

class Obstacle {
	constructor(x, y, w, h, speed) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speed = speed;
		this.col = color(random(255), random(255), random(255));
	}

	show() {
		fill(this.col);
		img(roboImg, this.x, this.y)
	}

	update() {
		this.x -= this.speed;
	}
}
