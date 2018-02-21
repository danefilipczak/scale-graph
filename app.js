window.onload = function(){
	app.$mount('.app')
}

var app = new Vue({
	data: {
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
		getPath: function(){
			var g = new Graph()
			console.log(g.getPath(this.scales))
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

