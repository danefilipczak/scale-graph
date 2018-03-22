function Quartal(root, type) {
	this.chroma = []
	this.linkedTo = [];
	this.init(root, type);
}

Quartal.prototype.init = function(root, type) {
	//make it a quartal
	this.root = root;
	this.chroma.push(this.root);
	this.chroma.push((this.root + 5) % 12);
	this.chroma.push((this.root + 10) % 12);

	switch (type) {
		case 3:
			this.chroma.push((this.root + 3) % 12);
			break;
		case 2:
			this.chroma.push((this.root + 2) % 12);
			break;
		case 5:
			this.chroma.push((this.root + 7) % 12);
			break;
		case 6:
			this.chroma.push((this.root + 8) % 12);
			break;
	}
}

Quartal.prototype.checkParsimony = function(otherQuartal) {
	var intersection = otherQuartal.chroma.filter((c) => this.chroma.includes(c))
	return intersection.length
}

QuartalGraph.prototype.init = function() {

	for (var i = 0; i < 12; i++) {
		this.quartals.push(new Quartal(i, 2))
		this.quartals.push(new Quartal(i, 3))
		this.quartals.push(new Quartal(i, 6))
		this.quartals.push(new Quartal(i, 5))
	}

}

function QuartalGraph(similarity) {
	/*
		params:
			similarity - int - 2 or 3, the minimum intersection required to make two quartals contiguous
	*/
	this.quartals = []
	this.init()
	this.initLinks(similarity)
}

QuartalGraph.prototype.initLinks = function(similarity) {
	for (var i = 0; i < this.quartals.length; i++) {
		for (var j = 0; j < this.quartals.length; j++) {
			if (i != j) {
				if (this.quartals[i].checkParsimony(this.quartals[j]) >= similarity) {
					this.quartals[i].linkedTo.push(this.quartals[j]);
				}
			}
		}
	}
}

