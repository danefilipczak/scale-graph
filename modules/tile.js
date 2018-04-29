import { color1, color2 } from '../sketch.js'

export function Tile(){
	this.scales = []
}


Tile.prototype.draw = function(){
	noStroke()
	fill('black')

	var h = window.innerWidth/this.scales.length/18;
	textSize(h)
	textFont('verdana')


	textAlign(CENTER, CENTER)
	rectMode(CENTER)
	push()
	translate(0, window.innerHeight/6)
	for(var i = 0; i<this.scales.length;i++){
		
		var x = window.innerWidth/(this.scales.length+1)*(i+1);
		
		
		var lerp = lerpColor(color1, color2, 1 / (this.scales.length - 1) * i)
		fill(lerp)

		var w = window.innerWidth/this.scales.length/1.7
		
		rect(x, 0, w, h*2)
		fill(0, 50)
		rect(x, 0, w, h*2)

		// // console.log(lerp)
		// if((lerp.levels[0]+lerp.levels[1]+lerp.levels[2])/3<127){
		// 	fill('white')
		// } else {
		// 	fill('black')
		// }
		fill('white')
		text(this.translateChord(this.scales[i].root, this.scales[i].type), x, 0)
		
	}
	pop()
	// text('love u ', 120, 100)
	rectMode(CORNER)

	this.drawArrows()
}

Tile.prototype.drawArrows = function(){
	var h = window.innerWidth/this.scales.length/15;
	textSize(h)
	fill(100)
	push()
	translate(0, window.innerHeight/6)
	for(var i = 0; i<this.scales.length-1; i++){
		var x = window.innerWidth/(this.scales.length+1)*(i+1.5);
		// rect(x, 0, 10, 10);
		text('\u2194', x, 0)

	}
	pop()
}

Tile.prototype.translateChord = function(root, type){
	var roots = ['C', 'D\u266D', 'D', 'E\u266D', 'E', 'F', 'F\u266F', 'G', 'A\u266D', 'A', 'B\u266D', 'B'];

	var types = {
		'dia': 'diatonic',
		'ac': 'acoustic',
		'oct': 'octatonic',
		'hm': 'harmonic minor',
		'HM': 'harmonic major',
		'hex': 'hexatonic',
		'wt': 'whole tone'
	}


	return roots[root] + ' ' + types[type]

}