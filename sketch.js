var canvas
var pianoRoll
var scaleWheel
var tile
var from, to;
var arpSpeed = 20;


var synth = new Tone.MonoSynth({
	"oscillator" : {
		"type" : "sine"
 },
 "envelope" : {
 	"attack" : 0.1
 }
}).toMaster();

function changeTempo(val){
	console.log(val)
}
function setup(){
	canvas = createCanvas(window.innerWidth,window.innerHeight);
	canvas.elt.style.zIndex =0
	canvas.elt.style.position = 'fixed'
	canvas.elt.style.left=0
	canvas.elt.style.top=0
	pianoRoll = new PianoRoll()
	scaleWheel = new ScaleWheel()
	tile = new Tile();

	// from = color(218, 165, 32);
	// to = color(72, 61, 139);

	from = color('cyan');
	to = color('orange');
}

function draw(){
	background(240, 234, 234)
	// fill('cyan')
	// ellipse(width/2, height/2, 50, 50)
	// fill('orange')
	// ellipse(width/2, height/2+50, 50, 50)
	tile.draw()
	pianoRoll.drawBase()
	pianoRoll.drawChroma()
	scaleWheel.draw()
	if(frameCount%arpSpeed==0&&pianoRoll.scales.length>0&&app.arpOn){
		pianoRoll.step();
	}
}

function windowResized(){
	resizeCanvas(window.innerWidth,window.innerHeight)
	// canvas.elt.style.left=window.innerWidth/2-(width/2)
	// canvas.elt.style.top=window.innerHeight/2-(height/2)
}