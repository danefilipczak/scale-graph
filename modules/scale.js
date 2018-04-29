import { Graph, scaleIndices } from './graph.js'

class Scale {
	constructor(root_, type_) {

		this.root = root_;
		this.type = type_;
		this.linkedTo = [];
		this.visited = false;
		this.initChroma()

	}

	initChroma() {
		var vals = {
			'dia': [0, 2, 4, 5, 7, 9, 11],
			'ac': [0, 2, 4, 6, 7, 9, 10],
			'HM': [0, 2, 4, 5, 7, 8, 11],
			'hm': [0, 2, 3, 5, 7, 8, 11],
			'hex': [0, 3, 4, 7, 8, 11],
			'oct': [0, 1, 3, 4, 6, 7, 9, 10],
			'wt': [0, 2, 4, 6, 8, 10]

		}

		this.chroma = []
		var temp = vals[this.type]
		for (var i = 0; i < temp.length; i++) {
			this.chroma.push((temp[i] + this.root) % 12);
		}

		this.chroma.sort(function(a, b) {
			return a - b
		});
		//console.log('love')

	}
}






export class ScaleGraph extends Graph {
	constructor() {
		super()
		this.populate();
		this.link();
	}

	populate() {
		var self = this;
		//populate all non-symetrical scales
		for (var i = 0; i < 12; i++) {
			self.sets[i][scaleIndices['dia']] = new Scale(i, 'dia')
			self.sets[i][scaleIndices['ac']] = new Scale(i, 'ac')
			self.sets[i][scaleIndices['HM']] = new Scale(i, 'HM')
			self.sets[i][scaleIndices['hm']] = new Scale(i, 'hm')
		}
		//hexatonic has 4 transpositions
		for (var i = 0; i < 4; i++) {
			self.sets[i][scaleIndices['hex']] = new Scale(i, 'hex')
		}
		//octatonic has 3 transpositions
		for (var i = 0; i < 3; i++) {
			self.sets[i][scaleIndices['oct']] = new Scale(i, 'oct')
		}
		//whole tone has 2 transpositions
		for (var i = 0; i < 2; i++) {
			self.sets[i][scaleIndices['wt']] = new Scale(i, 'wt')
		}
	}

	link() {
		//first, all the non-symetrical scales (all those with 12 distinct transpositions)
		for (var i = 0; i < 12; i++) {
			var self = this;

			/*
				diatonic
			*/

			var current = self.sets[i][scaleIndices['dia']];
			//diatonic self reference: everything diatonic a fifth above or below
			current.linkedTo.push(self.sets[(i + 7) % 12][scaleIndices['dia']]);
			current.linkedTo.push(self.sets[(i + 5) % 12][scaleIndices['dia']]);
			//one possible connection to a HM scale, its parallel
			var parallelHM = self.sets[i][scaleIndices['HM']];
			current.linkedTo.push(parallelHM);
			parallelHM.linkedTo.push(current);
			//one possible connection to a hm scale, its relative
			var relativehm = self.sets[(i + 9) % 12][scaleIndices['hm']];
			current.linkedTo.push(relativehm);
			relativehm.linkedTo.push(current);
			//two possible connections to an acoustic scale : a fourth above or fourth below
			var fourthAbove = self.sets[(i + 5) % 12][scaleIndices['ac']];
			var fourthBelow = self.sets[(i + 7) % 12][scaleIndices['ac']]
			current.linkedTo.push(fourthAbove);
			current.linkedTo.push(fourthBelow);
			fourthAbove.linkedTo.push(current);
			fourthBelow.linkedTo.push(current)

			/*
				Harmonic Major
			*/

			var current = self.sets[i][scaleIndices['HM']];
			//one connection to parallel harmonic minor
			var parallelhm = self.sets[i][scaleIndices['hm']];
			current.linkedTo.push(parallelhm);
			parallelhm.linkedTo.push(current);
			//one connection to an acoustic that lies a whole step below
			var wholestepac = self.sets[(i + 10) % 12][scaleIndices['ac']];
			current.linkedTo.push(wholestepac);
			wholestepac.linkedTo.push(current);
			//one connection to an octatonic that lies a whole step below, mod 3 because there are only 3 distinct octatonics
			var wholestepoct = self.sets[(i + 10) % 3][scaleIndices['oct']];
			current.linkedTo.push(wholestepoct);
			//one connection to a parallel hexatonic, mod 4.  because there are only 4 distinct hexatonics
			var parallelhex = self.sets[i % 4][scaleIndices['hex']];
			current.linkedTo.push(parallelhex);


			/* 
				harmonic minor
			*/

			var current = self.sets[i][scaleIndices['hm']];
			//one connection to an acoustic that lies a fourth above
			var fourthAbove = self.sets[(i + 5) % 12][scaleIndices['ac']];
			current.linkedTo.push(fourthAbove);
			fourthAbove.linkedTo.push(current);
			//one connection to an octatonic that lies a perfect fourth above, mod 3 because there are only 3 distinct octatonics
			var fourthAbove = self.sets[(i + 5) % 3][scaleIndices['oct']];
			current.linkedTo.push(fourthAbove);
			//one connection to a parallel hexatonic, mod 4.  because there are only 4 distinct hexatonics
			var parallelhex = self.sets[i % 4][scaleIndices['hex']];
			current.linkedTo.push(parallelhex)

			/* 
				acoustic
				connections to diatonic and hm/HM were taken care of in their respective sections
			*/
			var current = self.sets[i][scaleIndices['ac']];
			//one connection to a parallel whole tone (mod 2 because there are only 2 distinct whole tone roms)
			var parallelwt = self.sets[i % 2][scaleIndices['wt']];
			current.linkedTo.push(parallelwt);
			//one connection to a parallel octatonic (mod 3 because there are only 3 distinct octatonics)
			var paralleloct = self.sets[i % 3][scaleIndices['oct']];
			current.linkedTo.push(paralleloct);

		}

		//two distinct whole tones
		for (var i = 0; i < 2; i++) {
			var current = self.sets[i][scaleIndices['wt']];
			//six connections to acoustic scales parallel to each of its tones (j*2 gives whole tones)
			for (var j = 0; j < 6; j++) {
				var acoustic = self.sets[i + (j * 2)][scaleIndices['ac']];
				current.linkedTo.push(acoustic)
			}
		}

		//three distinct octatonics
		for (var i = 0; i < 3; i++) {
			var current = self.sets[i][scaleIndices['oct']];
			//four connections to parallel acoustic scales 
			for (var j = 0; j < 4; j++) {
				var acoustic = self.sets[i + (j * 3)][scaleIndices['ac']]
				current.linkedTo.push(acoustic)
			}
			//four connections to hm scales, each a fifth above the transpositional root
			for (var j = 0; j < 4; j++) {
				var hm = self.sets[(i + 7 + (j * 3)) % 12][scaleIndices['hm']]
				current.linkedTo.push(hm)
			}
			//four connections to HM scales, each a whole step above the transpositional root
			for (var j = 0; j < 4; j++) {
				var HM = self.sets[(i + 2 + (j * 3)) % 12][scaleIndices['HM']]
				current.linkedTo.push(HM)
			}
		}

		//four distinct hexatonics
		for (var i = 0; i < 4; i++) {
			var current = self.sets[i][scaleIndices['hex']];
			//3 connections to parallel hm
			for (var j = 0; j < 3; j++) {
				var hm = self.sets[(i + (j * 4)) % 12][scaleIndices['hm']]
				current.linkedTo.push(hm)
			}
			//3 connections to parallel HM
			for (var j = 0; j < 3; j++) {
				var HM = self.sets[(i + (j * 4)) % 12][scaleIndices['HM']]
				current.linkedTo.push(HM)
			}
		}
	}

	getPath(array) {
		//return a path that represents the shortest route through the scales contained in array.
		// each scale represented by an object { root: int, type: string}
		// array.forEach(function(s){
		// 	console.log(s.root)
		// })

		//check modulo
		array.forEach(function(s) {
			switch (s.type) {
				case 'hex':
					s.root = s.root % 4;
					break;
				case 'oct':
					s.root = s.root % 3;
					break;
				case 'wt':
					s.root = s.root % 2;
					break;
			}
		})

		var s0 = this.sets[array[0].root][scaleIndices[array[0].type]]
		var s1 = this.sets[array[1].root][scaleIndices[array[1].type]]
		return this.BFS(s0, s1)
	}
}