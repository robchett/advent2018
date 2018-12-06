require('./newStdLib');
const advent = require('./advent');
const input = [[63, 142],[190, 296],[132, 194],[135, 197],[327, 292],[144, 174],[103, 173],[141, 317],[265, 58],[344, 50],[184, 238],[119, 61],[329, 106],[70, 242],[272, 346],[312, 166],[283, 351],[286, 206],[57, 225],[347, 125],[152, 186],[131, 162],[45, 299],[142, 102],[61, 100],[111, 218],[73, 266],[350, 173],[306, 221],[42, 284],[150, 122],[322, 286],[346, 273],[75, 354],[68, 124],[194, 52],[92, 44],[77, 98],[77, 107],[141, 283],[87, 306],[184, 110],[318, 343],[330, 196],[303, 353],[268, 245],[180, 220],[342, 337],[127, 107],[203, 127]];


function part1(input) {
	const max = input.reduce((a,c) => ({x: Math.max(a.x, c[0]), y: Math.max(a.y, c[1])}), {x:0,y:0});
	var groups = Array(input.length).fill(0).map(a => ({void: false, count: 0}));
	var img = '';
	for (var y = 0; y <= max.x; y++) {
		for (var x = 0; x <= max.x; x++) {
			var distances = input.map((c, i) => ({id: i, d: Math.abs(c[0] - x) + Math.abs(c[1] - y)})).sort((a,b) => a.d - b.d);
			var best = {d: distances.uniqc(a => a.d).keys()[0], c: distances.uniqc(a => a.d).toArray()[0]};
			if (best.c != 1) {
				img += '.';
				continue;
			}
			if (best.d == 0) {
				img += String.fromCodePoint(group + 65)
			}
			var group = distances.filter(c => c.d == best.d)[0].id;
			img += String.fromCodePoint(group + 65 + 32);
			if (x == 0 || y == 0 || x == max.x || y == max.y) {
				groups[group].void = true;
			}

			groups[group].count++;
		}
	   img += "\n";
	}
	//img._l();
	return groups.filter(a => !a.void).sort((a,b) => b.count - a.count)[0].count;
}

function part2(input) {
	var count = 0;
	const max = input.reduce((a,c) => ({x: Math.max(a.x, c[0]), y: Math.max(a.y, c[1])}), {x:0,y:0});
	for (var y = 0; y <= max.x; y++) {
		for (var x = 0; x <= max.x; x++) {
			var distance = input.reduce((a,c) => (a + Math.abs(c[0] - x) + Math.abs(c[1] - y)), 0);			
			if (distance < 10000) count++;
		}
	}
	return count;
}

const testData = [[1, 1],	[1, 6],	[8, 3],	[3, 4],	[5, 5],	[8, 9],];
// advent.test(part1, testData, 17);
// advent.run(part1, input);

//advent.test(part2, testData, 16);
advent.run(part2, input);