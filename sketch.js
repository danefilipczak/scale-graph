var canvas
var pianoRoll
var scaleWheel
var tile
var from, to;
var arpSpeed = 20;


// var synth = new Tone.MonoSynth({
// 	"oscillator" : {
// 		"type" : "sine"
//  },
//  "envelope" : {
//  	"attack" : 0.1
//  }
// }).toMaster();

function changeTempo(val) {
	console.log(val)
}

function setup() {
	frameRate(10)
	canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.elt.style.zIndex = 0
	canvas.elt.style.position = 'fixed'
	canvas.elt.style.left = 0
	canvas.elt.style.top = 0
	pianoRoll = new PianoRoll()
	scaleWheel = new ScaleWheel()
	tile = new Tile();

	// from = color(218, 165, 32);
	// to = color(72, 61, 139);

	from = color('cyan');
	to = color('olive');
}

function draw() {
	background(240, 234, 234, 75)
	// background('black')

	fill('black')
	// ellipse(width / 6 * 5, 100, 20, 20);

	if (app.currentPath) {
		pianoRoll.intersection = app.intersection;
		pianoRoll.scales = app.currentPath;
		scaleWheel.scales = app.currentPath;
		tile.scales = app.currentPath;
	}

	// fill('cyan')
	// ellipse(width/2, height/2, 50, 50)
	// fill('orange')
	// ellipse(width/2, height/2+50, 50, 50)
	if (app.begun) {
		tile.draw()

		pianoRoll.draw()

		scaleWheel.draw()
	} else {
		textSize(20)
		textFont('verdana')
		text('to follow you need a path, but this land has not been mapped', width/2, height/2, width/2)
	}

	if (frameCount % arpSpeed == 0 && pianoRoll.scales.length > 0 && app.arpOn) {
		// pianoRoll.step();
	}
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
	// canvas.elt.style.left=window.innerWidth/2-(width/2)
	// canvas.elt.style.top=window.innerHeight/2-(height/2)
}