function ScaleWheel() {


	// this.scales = [{
	// 	root: 0,
	// 	type: 'dia',
	// 	chroma: [0, 2, 4, 5, 7, 9, 11]
	// }, {
	// 	root: 0,
	// 	type: 'HM',
	// 	chroma: [0, 2, 4, 5, 7, 8, 11]
	// }, {
	// 	root: 0,
	// 	type: 'hm',
	// 	chroma: [0, 2, 3, 5, 7, 8, 11]
	// }]
	this.scales = [];

	this.draw = function() {
		this.center = createVector(20, 20)
		this.center.x = window.innerWidth / 6 * 5;
		this.center.y = window.innerHeight / 2;
		this.radius = window.innerWidth / 8
		//fill('white')
		noFill()
		strokeWeight(3)
		stroke('white')
		ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2)
		angleMode(DEGREES)

		strokeWeight(1)
		push()
		translate(this.center.x, this.center.y)
		for (var i = 0; i < 12; i++) {
			var vector1 = createVector(0, -this.radius-10)
			
			var vector2 = createVector(0, -this.radius+10)
			vector1.rotate(360 / 12 * i + (360/12/2))
			vector2.rotate(360 / 12 * i + (360/12/2))
			line(vector1.x, vector1.y, vector2.x, vector2.y)
		}
		pop()

		//draw all the scales
		for (var i = 0; i < this.scales.length; i++) {
			push()
			translate(this.center.x, this.center.y)
			beginShape()
			for (var j = 0; j < this.scales[i].chroma.length; j++) {



				var vector = createVector(0, -this.radius)
				vector.rotate(360 / 12 * this.scales[i].chroma[j] + (i * 2))
				// console.log('here')
				noFill()
				vertex(vector.x, vector.y)
				fill('black')
				//ellipse(vector.x, vector.y, 5, 5)

				//make vector
				//rotate vector by some degrees /12*i
				//draw shape
			}
			var lerp = lerpColor(from, to, 1 / (this.scales.length - 1) * i)
			stroke(lerp)
			noFill()
			strokeWeight(10)
			endShape(CLOSE)
			pop()
		}
		push()
		//fill('white')
		
	}


}