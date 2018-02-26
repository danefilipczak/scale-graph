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
	this.drawBase = function(){
		var w = 30;
		var bottom = window.innerHeight / 2 + (w * 6)
		noStroke()
		for(var i = 0; i < 12; i++){
			if(i==1||i==3||i==6||i==8||i==10){
				fill(100)
			} else {
				fill(150)
			}
			var margin = 20
			rect(window.innerWidth/3+margin, bottom-(i*w), window.innerWidth/3-margin, w)
		}

	}
	this.drawChroma = function() {
		//console.log(this.name)
		for (var i = 0; i < this.scales.length; i++) {
			//var w = window.innerWidth/4/12;
			var w = 30;
			var left = window.innerWidth / 2 - (w * this.scales.length / 2);
			var bottom = window.innerHeight / 2 + (w * 6)

			var scale = this.scales[i].chroma;
			for (var j = 0; j < scale.length; j++) {
				if(scale[j]==0||scale[j]==2||scale[j]==4||scale[j]==5||scale[j]==7||scale[j]==9||scale[j]==11){
					stroke('black')
					fill(250);
				} else {
					stroke('white')
					fill(10);
				}
				if(scale[j]==this.scales[i].root){
					stroke('black')
					//noStroke()
					fill('cyan')
				}
				rect(left + (w * i), bottom - scale[j] * w, w, w)
			}

		}
	}
}