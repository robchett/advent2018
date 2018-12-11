require('./newStdLib');
const advent = require('./advent');
const input = 9306;

function part1(input) {
	var grid = Array(300).fill(0).map(a => Array(300).fill(0));
	for (var i = 1; i <= 300; i++) {
		for (var j = 1; j <= 300; j++) {
			grid[i -1][j-1] = parseInt(("000" + ((((i+10) * j) + input) * (i+10))).split("").reverse()[2]) - 5;
		}
	}

	var max = {t: 0, x:0, y: 0}
	var totals = Array(300).fill(Array(300).fill(0));
	for (var i = 1; i < 299; i++) {
		for (var j = 1; j < 299; j++) {
			var total =  grid[i-1][j-1] + grid[i][j-1] + grid[i+1][j-1] + 
						 grid[i-1][j] + grid[i][j] + grid[i+1][j] +
						 grid[i-1][j+1] + grid[i][j+1] + grid[i+1][j+1];
			if (total > max.t) {
				max = {t: total, x: i, y: j}
			}
		}
	}
	return `${max.x},${max.y}`;
}

function part2(input) {
	var grid = Array(300).fill(0).map(a => Array(300).fill(0));
	for (var i = 1; i <= 300; i++) {
		for (var j = 1; j <= 300; j++) {
			grid[i -1][j-1] = parseInt(("000" + ((((i+10) * j) + input) * (i+10))).split("").reverse()[2]) - 5;
		}
	}

	var max = {t: 0, x:0, y: 0, g: 0}
	var totals = Array(300).fill(Array(300).fill(0));
	var subgrid = Array(300).fill(0).map(a => Array(300).fill(0));
	for (var g = 0; g < 300; g++) {
		for (var i = 1; i < 299; i++) {
			for (var j = 1; j < 299; j++) {
				for (x = i; x < i + g && x < 300 && (g + j-1) < 300; x++) {
					subgrid[i][j] += grid[x][j+g-1];
				}
				for (x = j; x < j+g-1 && x < 300 && (g+i-1) < 300; x++) {
					subgrid[i][j] += grid[i+g-1][x];
				}
				if (subgrid[i][j] > max.t) {
					max = {t: subgrid[i][j], x: i, y: j, g: g}
				}
			}
		}
	}
	return `${max.x + 1},${max.y + 1},${max.g}`;
}

advent.tests(part1, [[42, '21,61'],  [18, '33,45']])
advent.run(part1, input);

advent.tests(part2, [[18, '90,269,16'],  [42, '232,251,12']])
advent.run(part2, input);