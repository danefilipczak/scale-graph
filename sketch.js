var canvas
var pianoRoll
var scaleWheel

function setup(){
	canvas = createCanvas(window.innerWidth,window.innerHeight);
	canvas.elt.style.zIndex =0
	canvas.elt.style.position = 'fixed'
	canvas.elt.style.left=0
	canvas.elt.style.top=0
	pianoRoll = new PianoRoll()
	scaleWheel = new ScaleWheel()
}

function draw(){
	background('olive')
	// fill('cyan')
	// ellipse(width/2, height/2, 50, 50)
	// fill('orange')
	// ellipse(width/2, height/2+50, 50, 50)
	pianoRoll.drawBase()
	pianoRoll.drawChroma()
	scaleWheel.draw()
}

function windowResized(){
	resizeCanvas(window.innerWidth,window.innerHeight)
	// canvas.elt.style.left=window.innerWidth/2-(width/2)
	// canvas.elt.style.top=window.innerHeight/2-(height/2)
}