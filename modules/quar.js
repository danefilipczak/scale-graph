import {
	Graph,
	scaleIndices,
	intersection
} from './graph.js'

class Quar {
	constructor(root_, type_) {

		this.root = root_;
		this.type = type_;
		this.linkedTo = [];
		this.visited = false;
		this.initChroma()

	}

	initChroma() {
		var vals = {
			'earth': [0, 2, 5, 10],
			'air': [0, 3, 5, 10],
			'fire': [0, 5, 7, 10],
			'water': [0, 5, 8, 10]
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

	findYourNeighbors(sets) {
		//console.log(this.chroma)
		//loop through sets, a two dimensional array, and link yourself to those sets that have exactly three chroma in common
		for (var i = 0; i < sets.length; i++) {
			for (var j = 0; j < sets[i].length; j++) {
				if (sets[i][j] != this && sets[i][j]!=null) {
					//console.log(intersection)
					// console.log(intersection(this.chroma, sets[i][j].chroma))
					if (intersection(this.chroma, sets[i][j].chroma) ==3) {
						this.linkedTo.push(sets[i][j])
					}
				}
			}
		}
	}
}


export class QuarGraph extends Graph {
	constructor() {
		super()
		this.populate();
		this.link();
	}

	populate() {
		// var self = this;
		//populate all non-symetrical scales
		for (var i = 0; i < 12; i++) {
			this.sets[i][scaleIndices['earth']] = new Quar(i, 'earth')
			this.sets[i][scaleIndices['air']] = new Quar(i, 'air')
			this.sets[i][scaleIndices['fire']] = new Quar(i, 'fire')
			this.sets[i][scaleIndices['water']] = new Quar(i, 'water')
		}
	}

	link() {

		for (var i = 0; i < this.sets.length; i++) {
			for (var j = 0; j < this.sets[i].length; j++) {
				//for every extant pent
				if (this.sets[i][j]) {
					this.sets[i][j].findYourNeighbors(this.sets)
				}

			}
		}


	}

	getPath(array) {
		//return a path that represents the shortest route through the scales contained in array.
		// each scale represented by an object { root: int, type: string}
		// array.forEach(function(s){
		// 	console.log(s.root)
		// })


		var s0 = this.sets[array[0].root][scaleIndices[array[0].type]]
		var s1 = this.sets[array[1].root][scaleIndices[array[1].type]]
		return this.BFS(s0, s1)
	}
}