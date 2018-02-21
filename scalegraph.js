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
		
		//first, all the non-symetrical scales (all those with 12 distinct transpositions)
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
			//one connection to an octatonic that lies a whole step below, mod 3 because there are only 3 distinct octatonics
			var wholestepoct = self.scales[(i+10)%3][scaleIndices['oct']];
			current.linkedTo.push(wholestepoct);
			//one connection to a parallel hexatonic, mod 4.  because there are only 4 distinct hexatonics
			var parallelhex = self.scales[i%4][scaleIndices['hex']];
			current.linkedTo.push(parallelhex);
			

			/* 
				harmonic minor
			*/

			var current = self.scales[i][scaleIndices['hm']];
			//one connection to an acoustic that lies a fourth above
			var fourthAbove = self.scales[(i+5)%12][scaleIndices['ac']];
			current.linkedTo.push(fourthAbove);
			fourthAbove.linkedTo.push(current);
			//one connection to an octatonic that lies a perfect fourth above, mod 3 because there are only 3 distinct octatonics
			var fourthAbove = self.scales[(i+5)%3][scaleIndices['oct']];
			current.linkedTo.push(fourthAbove);
			//one connection to a parallel hexatonic, mod 4.  because there are only 4 distinct hexatonics
			var parallelhex = self.scales[i%4][scaleIndices['hex']];
			current.linkedTo.push(parallelhex)

			/* 
				acoustic
				connections to diatonic and hm/HM were taken care of in their respective sections
			*/
			var current = self.scales[i][scaleIndices['ac']];
			//one connection to a parallel whole tone (mod 2 because there are only 2 distinct whole tone roms)
			var parallelwt = self.scales[i%2][scaleIndices['wt']];
			current.linkedTo.push(parallelwt);
			//one connection to a parallel octatonic (mod 3 because there are only 3 distinct octatonics)
			var paralleloct = self.scales[i%3][scaleIndices['oct']];
			current.linkedTo.push(paralleloct);

		}

		//two distinct whole tones
		for(var i = 0; i<2; i++){
			var current = self.scales[i][scaleIndices['wt']];
			//six connections to acoustic scales parallel to each of its tones (j*2 gives whole tones)
			for(var j = 0; j<6; j++){
				var acoustic = self.scales[i+(j*2)][scaleIndices['ac']];
				current.linkedTo.push(acoustic)
			}
		}

		//three distinct octatonics
		for(var i = 0; i<3; i++){
			var current = self.scales[i][scaleIndices['oct']];
			//four connections to parallel acoustic scales 
			for(var j = 0; j<4; j++){
				var acoustic = self.scales[i+(j*3)][scaleIndices['ac']]
				current.linkedTo.push(acoustic)
			}
			//four connections to hm scales, each a fifth above the transpositional root
			for(var j = 0; j<4; j++){
				var hm = self.scales[(i+5+(j*3))%12][scaleIndices['hm']]
				current.linkedTo.push(hm)
			}
			//four connections to HM scales, each a whole step above the transpositional root
			for(var j = 0; j<4; j++){
				var HM = self.scales[(i+2+(j*3))%12][scaleIndices['HM']]
				current.linkedTo.push(HM)
			}
		}

		//four distinct hexatonics
		for(var i =0; i<4; i++){
			var current = self.scales[i][scaleIndices['hex']];
			//3 connections to parallel hm
			for(var j = 0; j<3; j++){
				var hm = self.scales[(i+(j*4))%12][scaleIndices['hm']]
				current.linkedTo.push(hm)
			}
			//3 connections to parallel HM
			for(var j = 0; j<3; j++){
				var HM = self.scales[(i+(j*4))%12][scaleIndices['HM']]
				current.linkedTo.push(HM)
			}
		}


	}



	this.populate()
	this.link()
}



Graph.prototype.getPath = function(scale1, scale2) {

}