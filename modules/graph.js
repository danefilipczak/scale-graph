// abstract graph class


export const scaleIndices = { //for reference.... 
	'dia': 0,
	'ac': 1,
	'HM': 2,
	'hm': 3,
	'hex': 4,
	'wt': 5,
	'oct': 6,
	'red': 0,
	'green': 1,
	'blue': 2
}

export class Graph {
	constructor() {

		this.sets = []
		for (var i = 0; i < 12; i++) {
			this.sets[i] = new Array(12).fill(null) // a new array with room to hold all scales types
		}

	}


	BFS(start_, end_) {
		//return an array of arrays of chords that represents the shortest path between two chords.
		// the difference between this method and BFS is that this retrieves all possible shortest paths instead of the path found first. 
		this.sets.forEach(function(c) {
			c.forEach(function(s) {
				if (s) {
					s.parent = null;
					s.visited = null;
					s.parents = [];
					s.level = Infinity;
				}

			})
		})


		var start = start_;
		var end = end_;
		var queue = [];
		start.visited = true;
		start.level = 0;
		queue.push(start)

		//first rank them
		while (queue.length > 0) {
			var current = queue.shift()
			if (current == end) {
				//found it
				break;
			}
			var linkedTo = current.linkedTo;
			for (var i = 0; i < linkedTo.length; i++) {
				var neighbor = linkedTo[i];
				if (!neighbor.visited) {
					//neighbor.visited = true;

					if (neighbor.level > current.level) {
						neighbor.level = current.level + 1;
						//neighbor.parents.push(current);
						queue.push(neighbor)
					}

				}
			}
			current.visited = true;
		}

		var result = []
		this.buildPaths(end, result, []);
		return result;
	}

	buildPaths(end, result, path) {
		path.push(end)
		if (end.level == 0) {
			result.push(path.reverse())
			return
		}
		for (var i = 0; i < end.linkedTo.length; i++) {
			if (end.linkedTo[i].level == end.level - 1) {
				this.buildPaths(end.linkedTo[i], result, path.slice())
			}
		}


		// while(end.level>0){
		// 	end.linkedTo.sort(function(a,b) {return (a.level > b.level) ? 1 : ((b.level > a.level) ? -1 : 0);} );
		// 	path.push(end);
		// 	console.log(end.level)
		// 	end = end.linkedTo[0];
		// }
		// return path;
	}
}