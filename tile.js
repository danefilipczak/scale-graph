function Tile(){
	this.scales = []
}


Tile.prototype.draw = function(){
	noStroke()
	fill('black')

	var h = window.innerWidth/this.scales.length/18;
	textSize(h)



	textAlign(CENTER, TOP)
	rectMode(CENTER)
	push()
	translate(0, window.innerHeight/6)
	for(var i = 0; i<this.scales.length;i++){
		
		var x = window.innerWidth/(this.scales.length+1)*(i+1);
		
		
		var lerp = lerpColor(from, to, 1 / (this.scales.length - 1) * i)
		fill(lerp)

		var w = window.innerWidth/this.scales.length/2
		
		rect(x, 0, w, h*2)
		fill(0, 50)
		rect(x, 0, w, h*2)

		// // console.log(lerp)
		// if((lerp.levels[0]+lerp.levels[1]+lerp.levels[2])/3<127){
		// 	fill('white')
		// } else {
		// 	fill('black')
		// }
		fill('white')
		text(this.scales[i].root + this.scales[i].type, x, 0)
		
	}
	pop()
	// text('love u ', 120, 100)
	rectMode(CORNER)
}