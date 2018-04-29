import { color1, color2 } from '../sketch.js'

function Chroma() {

}

var arp = {
	scale: 0,
	step: 0,
	chroma: 0
}

export function PianoRoll() {
	// this.scales = [{
	// 	root: 0,
	// 	type: 'dia',
	// 	chroma: [0, 2, 4, 5, 7, 9, 11]
	// },{
	// 	root: 0,
	// 	type: 'HM',
	// 	chroma: [0, 2, 4, 5, 7, 8, 11]
	// },{
	// 	root: 0,
	// 	type: 'hm',
	// 	chroma: [0, 2, 3, 5, 7, 8, 11]
	// }]
	this.intersection = []
	// this.aucolor2step = true;
	this.scales = [];
	this.name = 'ted'
	this.drawBase = function() {
		var w = 30;
		var botcolor2m = window.innerHeight / 2 + (w * 6)
		// var botcolor2m = window.innerHeight-window.innerHeight/6;
		//noStroke()
		for (var i = 0; i < 12; i++) {
			if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
				fill(0, 20)
				stroke(100)

			} else {
				fill(255, 20)
				stroke(150)
			}
			var margin = 20
			// noFill()
			var weight = 7;
			strokeWeight(weight)
			rect(window.innerWidth / 3 + margin, botcolor2m - (i * w), window.innerWidth / 3 - margin, w - (weight))
		}

	}
	this.drawIntersection = function() {
		var w = 30;
		var length = w*(this.scales.length+2);
		//var left = window.innerWidth / 2 - (w * this.scales.length / 2);
		var botcolor2m = window.innerHeight / 2 + (w * 6)
		var weight = 5
		fill('grey')
		noStroke();
		//rectMode(CENTER, color2P)
		for (var i = 0; i < this.intersection.length; i++) {
			rect(window.innerWidth/2-(length/2), (botcolor2m - this.intersection[i] * w)+5, length, (w - weight)/2)
		}
	}
	this.drawChroma = function() {
		//console.log(this.name)
		for (var i = 0; i < this.scales.length; i++) {
			//var w = window.innerWidth/4/12;
			var w = 30;
			var left = window.innerWidth / 2 - (w * this.scales.length / 2);
			var botcolor2m = window.innerHeight / 2 + (w * 6)
			// var botcolor2m = window.innerHeight;

			var scale = this.scales[i].chroma;
			for (var j = 0; j < scale.length; j++) {
				var lerp = lerpColor(color1, color2, 1 / (this.scales.length - 1) * i)
				var weight = 5
				strokeWeight(weight)

				if (scale[j] == 0 || scale[j] == 2 || scale[j] == 4 || scale[j] == 5 || scale[j] == 7 || scale[j] == 9 || scale[j] == 11) {
					//stroke('black')
					stroke('white')
					fill(250);

				} else {
					//stroke('white')
					stroke('black')
					fill(5);
				}
				// if(scale[j]==this.scales[i].root){
				// 	//stroke('black')
				// 	//noStroke()
				// 	fill(lerp)
				// } else {
				// 	stroke(lerp)
				// }
				if(this.intersection.includes(scale[j])){
					//fill(255, 255, 0, 50)
				} else {
					//noFill()
				}

				stroke(lerp)
				// if(i==arp.scale&&scale[j]==arp.chroma){
				// 	fill('yellow')
				// 	stroke('yellow')
				// }
				rect(left + (w * i), botcolor2m - scale[j] * w, w - weight, w - weight)
			}

		}
	}
	this.draw = function() {
		
		this.drawBase()
		this.drawIntersection()
		
		this.drawChroma()
	}
}

PianoRoll.prototype.startArpegiacolor2r = function() {
	var self = this;
	setInterval(function() {
		self.step();
	}, 300);
}

PianoRoll.prototype.step = function() {
	if (this.aucolor2step) {



		arp.step++;
		arp.step %= this.scales[arp.scale].chroma.length;


		// arp.scale++
		// console.log(this.scales[arp.scale].length)
		if (arp.step == 0) {
			console.log('hi change')
			arp.scale++
				arp.scale %= this.scales.length;
		}

		arp.chroma = this.scales[arp.scale].chroma[arp.step]

		var map = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4']
		var note = map[arp.chroma]
		// synth.triggerAttackRelease(note, "8n");


	}
}


