require('./newStdLib');
const advent = require('./advent');
const input = 9306;

function part1(input, rules, generations) {
	rules = rules.split(';').map(a => a[a.length - 1] == '#' ? a.slice(0, -5) : false).filter(a => a)
	input = input.split("").map((a, i) => ({i: i, v: a == '#'} ))
	var min = 0,
		max = input.length - 1;

	function toString(arr) {
		return arr.reduce((a, c) => (a + (c.v ? '#' :  '.')), '');
	}
	console.log(`0: ${toString(input)}`);
	var prev = {s: 0, t: ''};
	for (var g = 1; g <= generations; g++) {
		var b = '#';
		for(var i = 1; i <= 5; i++) {
			if (toString(input.slice(0, i)) == b) input.unshift({i:--min, v: false});
			b = '.' + b;
		}
		b = '#'
		for(var i = 1; i <= 5; i++) {
			if (toString(input.slice(-i)) == b) input.push({i:++max, v: false});
			b = b + '.';
		}
		var newInput = [];
		for (var i = 2; i < input.length - 1; i++) {
			var slice = toString(input.slice(i-2, i+3));
			newInput.push({i: input[i].i, v: rules.some(a => a == slice)})			
		}
		input = newInput;
		min = input[0].i;
		max = input[input.length - 1].i
		next = {s:input.reduce((a,c) => (a + (c.v ? c.i : 0)),0), t: toString(input)};
		console.log(`${g} -> ${next.s}: ${toString(newInput)}`);
		if (prev.t == next.t) {
			return next.s + ((next.s - prev.s) * (generations - g));
		}
		prev = next;
	}
	return input.reduce((a,c) => (a + (c.v ? c.i : 0)),0)
}
advent.tests(part1, [['#..#.#..##......###...###', '...## => #;..#.. => #;.#... => #;.#.#. => #;.#.## => #;.##.. => #;.#### => #;#.#.# => #;#.### => #;##.#. => #;##.## => #;###.. => #;###.# => #;####. => #', 20, 325]])
advent.runs(part1, ['#.##.#.##..#.#...##...#......##..#..###..##..#.#.....##..###...#.#..#...######...#####..##....#..###', '##.## => .;##... => #;..#.# => #;#.... => .;#..#. => #;.#### => .;.#..# => .;.##.# => .;#.##. => #;####. => .;..##. => .;##..# => .;.#.## => #;.#... => .;.##.. => #;..#.. => #;#..## => #;#.#.. => #;..### => #;...#. => #;###.. => .;##.#. => #;#.#.# => #;##### => #;....# => .;#.### => .;.#.#. => #;.###. => #;...## => .;..... => .;###.# => #;#...# => .', 20]);
advent.runs(part1, ['#.##.#.##..#.#...##...#......##..#..###..##..#.#.....##..###...#.#..#...######...#####..##....#..###', '##.## => .;##... => #;..#.# => #;#.... => .;#..#. => #;.#### => .;.#..# => .;.##.# => .;#.##. => #;####. => .;..##. => .;##..# => .;.#.## => #;.#... => .;.##.. => #;..#.. => #;#..## => #;#.#.. => #;..### => #;...#. => #;###.. => .;##.#. => #;#.#.# => #;##### => #;....# => .;#.### => .;.#.#. => #;.###. => #;...## => .;..... => .;###.# => #;#...# => .', 50000000000]);