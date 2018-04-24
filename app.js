window.onload = function(){
	app.$mount('.app')
}

var app = new Vue({
	data: {
		begun: false,
		paths: [],
		currentPath: null,
		graph: new Graph(),
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
		isEntryComplete: function(){
			for(var i =0;i<this.scales.length;i++){
				if(this.scales[i].root == null || !this.scales[i].type){
					// console.log(this.scales[i].root)
					return false;
				}
			}
			this.getPath();
			this.begun=true;
			return true;


		},
		toggleArpOn: function(){
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
		selectPath: function(index){
			this.currentPath = this.paths[index]
			var chromas = []
			for(var i = 0; i<this.currentPath.length;i++){
				chromas.push(this.currentPath[i].chroma)
			};
			this.intersection = intersection(chromas);
			//console.log(index)
		},
		getPath: function(){
			//var g = new Graph()
			var result = this.graph.getPath(this.scales.slice(0, this.scales.length));

			console.log(result)
			this.paths = result;
			
			this.selectPath(0);
			//this.currentPath = result;
			// pianoRoll.scales = path[0];
			// scaleWheel.scales = path[0];
			// tile.scales = path[0];
			arp.step=0;
			arp.chroma=0;
			arp.scale=0;

		},
		makeRandomScales: function(){
			this.randomScales()
			this.isEntryComplete();
			//this.getPath()
		}
		,
		randomScales: function(){
			this.scales.forEach(function(s){
				s.root = Math.round(Math.random()*11)
				var items = ['oct', 'ac', 'dia', 'wt', 'hex', 'hm', 'HM']
				s.type = items[Math.floor(Math.random()*items.length)];
			})
		}
		,
		addScale: function(previousScale){
			//add a new scale
			var index = this.scales.indexOf(previousScale)+1;
			this.scales.splice(index, 0, {root:null, type:null})
		},
		removeScale: function(scale){
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

