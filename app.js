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
	methods: {
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

