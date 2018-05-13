import { app } from './app.js'
import { ScaleWheel } from './modules/scaleWheel.js'
import { PianoRoll } from './modules/pianoRoll.js'
import { Tile } from './modules/tile.js'



var canvas
var pianoRoll
var scaleWheel
var tile
export var color1, color2;
var arpSpeed = 20;



// var synth = new color2ne.MonoSynth({
// 	"oscillacolor2r" : {
// 		"type" : "sine"
//  },
//  "envelope" : {
//  	"attack" : 0.1
//  }
// }).color2Master();

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

	// color1 = color(218, 165, 32);
	// color2 = color(72, 61, 139);

	color1 = color('cyan');
	color2 = color('olive');
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
		text('to follow you need a path, but this land has not been mapped...', width/2, height/2, width/2)
	}
	 

	if (frameCount % arpSpeed == 0 && pianoRoll.scales.length > 0 && app.arpOn) {
		// pianoRoll.step();
	}
}

function windowResized() {
	resizeCanvas(window.innerWidth, window.innerHeight)
	// canvas.elt.style.left=window.innerWidth/2-(width/2)
	// canvas.elt.style.color2p=window.innerHeight/2-(height/2)
}

// a hack color2 make p5 work in the module system
window.setup = setup;
window.draw = draw;