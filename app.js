// window.onload = function(){
// 	app.$mount('.app')
// }


import {
	ScaleGraph
} from './modules/scale.js'
import {
	PentGraph
} from './modules/pent.js'
import {
	QuarGraph
} from './modules/quar.js'
import {
	TriadGraph
} from './modules/triad.js'


export const app = new Vue({
	data: {
		begun: false,
		paths: [],
		currentPath: null,
		scaleGraph: new ScaleGraph(),
		pentGraph: new PentGraph(),
		quarGraph: new QuarGraph(),
		triadGraph: new TriadGraph(),
		arpOn: false,
		section: 'scales',
		scales: [{

			root: null,
			type: null


		}, {

			root: null,
			type: null

		}]
	},
	// computed: {
	// 	entryComplete: function(){
	// 		this.scales.forEach(function(s){
	// 			if(!s.root || !s.type){
	// 				console.log("not done")
	// 				return false;
	// 			}
	// 		})
	// 		console.log("done")
	// 		return true;
	// 	}
	// },
	methods: {
		setSection: function(section) {
			this.section = section;
			this.scales = [{

				root: null,
				type: null


			}, {

				root: null,
				type: null

			}]

			this.reset();

			

		},
		reset: function(){

			this.paths = [];
			this.currentPath = [];
			this.intersection = [];
			this.isEntryComplete();

		},
		isEntryComplete: function() {
			for (var i = 0; i < this.scales.length; i++) {
				if (this.scales[i].root == null || !this.scales[i].type) {
					// console.log(this.scales[i].root)
					return false;
				}
			}
			this.getPath();
			this.begun = true;
			return true;


		},
		toggleArpOn: function() {
			this.arpOn = !this.arpOn;
		},
		// tranlate: function(){
		// 	var roots = {
		// 		'A'
		// 	}
		// 	var types = {}
		// 	var translation = [];
		// 	this.scales.forEach(function(s){
		// 		translation.push({
		// 			root:roots[s.root],
		// 			type:types[s.type]
		// 		})
		// 	})
		// 	return translation;
		// }
		selectPath: function(index) {
			this.currentPath = this.paths[index]
			var chromas = []
			for (var i = 0; i < this.currentPath.length; i++) {
				chromas.push(this.currentPath[i].chroma)
			};
			this.intersection = intersection(chromas);
			//console.log(index)
		},
		getPath: function() {
			//var g = new Graph()
			switch (this.section) {
				case 'scales':
					var result = this.scaleGraph.getPath(this.scales.slice(0, this.scales.length));
					break;
				case 'pent':
					var result = this.pentGraph.getPath(this.scales.slice(0, this.scales.length));
					break;
				case 'quar':
					var result = this.quarGraph.getPath(this.scales.slice(0, this.scales.length));
					break;
				case 'triads':
					var result = this.triadGraph.getPath(this.scales.slice(0, this.scales.length));
					break;



			}


			console.log(result)
			this.paths = result;

			this.selectPath(0);
			//this.currentPath = result;
			// pianoRoll.scales = path[0];
			// scaleWheel.scales = path[0];
			// tile.scales = path[0];
			// arp.step=0;
			// arp.chroma=0;
			// arp.scale=0;

		},
		makeRandomSets: function() {
			switch(this.section){
				case 'scales':
					this.randomScales();
					break;
				case 'pent':
					this.randomPents();
					break;
				case 'quar':
					this.randomQuars();
					break;
				case 'triads':
					this.randomTriads();
					break;

			}
			
			this.isEntryComplete();
			//this.getPath()
		},
		randomScales: function() {
			this.scales.forEach(function(s) {
				s.root = Math.round(Math.random() * 11)
				var items = ['oct', 'ac', 'dia', 'wt', 'hex', 'hm', 'HM']
				s.type = items[Math.floor(Math.random() * items.length)];
			})
		},
		randomPents: function() {
			this.scales.forEach(function(s) {
				s.root = Math.round(Math.random() * 11)
				var items = ['red', 'green', 'blue']
				s.type = items[Math.floor(Math.random() * items.length)];
			})
		},
		randomQuars: function() {
			this.scales.forEach(function(s) {
				s.root = Math.round(Math.random() * 11)
				var items = ['earth', 'air', 'fire', 'water']
				s.type = items[Math.floor(Math.random() * items.length)];
			})
		},
		randomTriads: function() {
			this.scales.forEach(function(s) {
				s.root = Math.round(Math.random() * 11)
				var items = ['+','-']
				s.type = items[Math.floor(Math.random() * items.length)];
			})
		},
		addScale: function(previousScale) {
			//add a new scale
			var index = this.scales.indexOf(previousScale) + 1;
			this.scales.splice(index, 0, {
				root: null,
				type: null
			})
		},
		removeScale: function(scale) {
			var index = this.scales.indexOf(scale);
			this.scales.splice(index, 1)
		}
		// addScale: function() {
		// 	var pitchclass = this.pitchclass && this.newTodo.trim()
		// 	if (!value) {
		// 		return
		// 	}
		// 	this.scales.push({
		// 		pitchclass: pitchclass,
		// 		id: todoStorage.uid++,
		// 		title: value,
		// 		completed: false
		// 	})
		// 	this.newTodo = ''
		// }
	}
})



function intersection() {
	var result = [];
	var lists;

	if (arguments.length === 1) {
		lists = arguments[0];
	} else {
		lists = arguments;
	}

	for (var i = 0; i < lists.length; i++) {
		var currentList = lists[i];
		for (var y = 0; y < currentList.length; y++) {
			var currentValue = currentList[y];
			if (result.indexOf(currentValue) === -1) {
				var existsInAll = true;
				for (var x = 0; x < lists.length; x++) {
					if (lists[x].indexOf(currentValue) === -1) {
						existsInAll = false;
						break;
					}
				}
				if (existsInAll) {
					result.push(currentValue);
				}
			}
		}
	}
	return result;
}

app.$mount('.app')