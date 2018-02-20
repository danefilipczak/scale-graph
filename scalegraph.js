function Scale(root_, type_) {

	this.root = root_;
	this.type = type_;
	this.linkedTo = [];
}

var scaleIndices = { //for reference.... 
	'dia': 0,
	'ac': 1,
	'HM': 2,
	'hm': 3,
	'hex': 4,
	'wt': 5,
	'oct': 6,
}

function Graph() {
	var self = this;
	//scales are stored as a two dimensional array. Is this a good idea? Time will tell. 
	this.scales = []
	for (var i = 0; i < 12; i++) {
		this.scales[i] = new Array(7).fill(null) // a new array with room to hold all scales types
	}

	
	this.populate = function() {
		//populate all non-symetrical scales
		for (var i = 0; i < 12; i++) {
			self.scales[i][scaleIndices['dia']] = new Scale(i, 'dia')
			self.scales[i][scaleIndices['ac']] = new Scale(i, 'ac')
			self.scales[i][scaleIndices['HM']] = new Scale(i, 'HM')
			self.scales[i][scaleIndices['hm']] = new Scale(i, 'hm')
		}
		//hexatonic has 4 transpositions
		for (var i = 0; i < 4; i++) {
			self.scales[i][scaleIndices['hex']] = new Scale(i, 'hex')
		}
		//octatonic has 3 transpositions
		for (var i = 0; i < 3; i++) {
			self.scales[i][scaleIndices['oct']] = new Scale(i, 'oct')
		}
		//whole tone has 2 transpositions
		for (var i = 0; i < 2; i++) {
			self.scales[i][scaleIndices['wt']] = new Scale(i, 'wt')
		}
	}

	this.link = function() {
		
		for(var i = 0; i <12; i++){
			
			/*
				diatonic
			*/

			var current = self.scales[i][scaleIndices['dia']];
			//diatonic self reference: everything diatonic a fifth above or below
			current.linkedTo.push(self.scales[(i+7)%12][scaleIndices['dia']]);
			current.linkedTo.push(self.scales[(i+5)%12][scaleIndices['dia']]);
			//one possible connection to a HM scale, its parallel
			var parallelHM = self.scales[i][scaleIndices['HM']];
			current.linkedTo.push(parallelHM);
			parallelHM.linkedTo.push(current);
			//one possible connection to a hm scale, its relative
			var relativehm = self.scales[(i+9)%12][scaleIndices['hm']];
			current.linkedTo.push(relativehm);
			relativehm.linkedTo.push(current);
			//two possible connections to an acoustic scale : a fourth above or fourth below
			var fourthAbove = self.scales[(i+5)%12][scaleIndices['ac']];
			var fourthBelow = self.scales[(i+7)%12][scaleIndices['ac']]
			current.linkedTo.push(fourthAbove);
			current.linkedTo.push(fourthBelow);
			fourthAbove.linkedTo.push(current);
			fourthBelow.linkedTo.push(current)

			/*
				Harmonic Major
			*/

			var current = self.scales[i][scaleIndices['HM']];
			//one connection to parallel harmonic minor
			var parallelhm = self.scales[i][scaleIndices['hm']];
			current.linkedTo.push(parallelhm);
			parallelhm.linkedTo.push(current);
			//one connection to an acoustic that lies a whole step below
			var wholestepac = self.scales[(i+10)%12][scaleIndices['ac']];
			current.linkedTo.push(wholestepac);
			wholestepac.linkedTo.push(current);

		}


	}



	this.populate()
	this.link()
}



Graph.prototype.getPath = function(scale1, scale2) {

}