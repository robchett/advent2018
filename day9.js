require('./newStdLib');
const advent = require('./advent');
const tests = [[1, 48,95], [9, 24, 32], [9,48,63], [10, 1618, 8317], [13, 7999, 146373], [17, 1104 ,2764], [21, 6111, 54718], [30, 5807, 37305]];
const input = [[491, 71058], [491, 7105800]];

function part1(players, marbles) {
	var struct = [0], 
		curr = 1,
		index = 0,
		player = 0
		scores = Array(players).fill(0);
	while (marbles--) {
		if (!(curr % 23)) {
			scores[player] += parseInt(curr);
			if (index < 7) {
				index = index - 7 + struct.length
			} else {
				index = index - 7 % struct.length
			}
			scores[player] += struct.splice(index, 1)[0];
		} else {
			var prev = index;
			if (struct.length > 1) {
				index = (index + 2) % struct.length;
			} else {
				index++;
			}
			if (index == 0) {
				struct.push(curr);
				index = struct.length - 1;
			} else {
				struct.splice(index, 0, curr)
			}
		}
		curr++;
		player = (player + 1) % players;
	}
	return scores.sort((a, b) => b-a)[0];
}

function part2(players, marbles) {
	var currNode = {v: 0, p: null, n: null};
		currNode.p = currNode;
		currNode.n = currNode;
		curr = 1,
		index = 0,
		player = 0
		scores = Array(players).fill(0),
		first = currNode;
	while (curr <= marbles) {
		if (!(curr % 23)) {
			scores[player] += curr;
			for (var i = 0; i < 7; i++) {
				currNode = currNode.p;
			}
			scores[player] += currNode.v;
			currNode.p.n = currNode.n;
			currNode.n.p = currNode.p;
			currNode = currNode.n;
		} else {
			currNode = currNode.n
			var newNode = {v: curr, p: currNode, n: currNode.n};
			currNode.n.p = newNode;	
			currNode.n = newNode;
			currNode = newNode;		
		}
		curr++;
		player = (player + 1) % players;
	}
	return scores.sort((a, b) => b-a)[0];

}

advent.tests(part1, tests);
advent.runs(part1, input[0]);
advent.tests(part2, tests);
advent.runs(part2, input[1]);