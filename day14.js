require('./newStdLib');
const advent = require('./advent');
const input = '440231';


function iter(input, part) {
	var varCount = 2,
		firstNode = {v: 3, p: null, n: null};
		lastNode = {v: 7, p: null, n: null};
	lastNode.p = lastNode.n = firstNode;
	firstNode.n = firstNode.p = lastNode;

	players = [{node: firstNode}, {node: firstNode.n}];

	var last5 = '37'
	var res = {part1: 0, part2: 0};
	out: while(true) {
		str = ("" + (players[0].node.v + players[1].node.v)).split("");
		while(str.length) {
			var newNode = {v: parseInt(str.shift()), p: lastNode, n: lastNode.n}
			lastNode.n.p = newNode
			lastNode.n = newNode;
			lastNode = newNode;
			varCount++;
			last5 = (last5 + newNode.v).substr(-input.length)
			if (part == 2 && last5 === input) {
				return varCount - input.length;
			}
			if (part == 1 && varCount > (input + 9)) {
				var out = '';
				for (var i = 0; i < 10; i++) {
					out += lastNode.v;
					lastNode = lastNode.p;
				}
				return out.split("").reverse().join("")
			}
		}
		players.map((i,c) => {
			var end = i.node.v + 1;
			for(var j = 0; j < end; j++) {
				i.node = i.node.n;
			}
			return i;
		})
	}	
}

function part1(input) {
	return iter(parseInt(input), 1);
}

function part2(input) {
	return iter(input, 2);
}


advent.tests(part1, [[9, 5158916779], [5, 0124515891], [18, 9251071085], [2018, 5941429882]])
advent.run(part1, input);

advent.tests(part2, [['51589', 9], ['01245', 5], ['92510', 18], ['59414', 2018]])
advent.run(part2, input)