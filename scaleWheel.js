function ScaleWheel(){
	this.center = createVector(20, 20)
	this.center.x = window.innerWidth/6*5;
	this.center.y = window.innerHeight/2;
	this.radius = window.innerWidth/6-20

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

	this.draw = function(){
		fill('red')
		ellipse(this.center.x, this.center.y, this.radius*2, this.radius*2)
		angleMode(DEGREES)

		for(var i = 0; i<this.scales.length; i++){
			for(var j = 0; j<this.scales[i].chroma.length;j++){
				
				push()
				translate(this.center.x, this.center.y)
				var vector = createVector(0, -this.radius)
				vector.rotate(360/12*this.scales[i].chroma[j]+(i*5))
				// console.log('here')
				fill('black')
				ellipse(vector.x, vector.y, 10, 10)
				pop()
				//make vector
				//rotate vector by some degrees /12*i
				//draw shape
			}
		}
	}


}