function PianoRoll() {
	this.scales = [{
		root: 0,
		type: 'dia',
		chroma: [0, 2, 4, 5, 7, 9, 11]
	},{
		root: 0,
		type: 'HM',
		chroma: [0, 2, 4, 5, 7, 8, 11]
	},{
		root: 0,
		type: 'hm',
		chroma: [0, 2, 3, 5, 7, 8, 11]
	}]
	this.name = 'ted'
	this.draw = function() {
		//console.log(this.name)
		for (var i = 0; i < this.scales.length; i++) {
			var w = window.innerWidth/4/12;
			var w = 30;
			var left = window.innerWidth / 2 - (w * this.scales.length / 2);
			var bottom = window.innerHeight / 2 + (w * 6)
			var scale = this.scales[i].chroma;
			for (var j = 0; j < scale.length; j++) {
				if(scale[j]==0||scale[j]==2||scale[j]==4||scale[j]==5||scale[j]==7||scale[j]==9||scale[j]==11){
					fill(225);
				} else {
					fill(50);
				}
				if(scale[j]==this.scales[i].root){
					fill('cyan')
				}
				rect(left + (w * i), bottom - scale[j] * w, w, w)
			}

		}
	}
}