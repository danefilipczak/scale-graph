window.onload = function(){
	app.$mount('.app')
}

var app = new Vue({
	data: {
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
				if(!this.scales[i].root || !this.scales[i].type){
					return false
				}
			}
			return true;
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
		getPath: function(){
			var g = new Graph()
			var path = g.getPath(this.scales.slice(0, this.scales.length));
			console.log(path)
			pianoRoll.scales = path;
			scaleWheel.scales = path;

		},
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

