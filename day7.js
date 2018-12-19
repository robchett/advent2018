require('./newStdLib');
const advent = require('./advent');
const input = ['Step H must be finished before step C can begin.','Step R must be finished before step S can begin.','Step F must be finished before step M can begin.','Step S must be finished before step Z can begin.','Step X must be finished before step Z can begin.','Step Q must be finished before step G can begin.','Step M must be finished before step Z can begin.','Step G must be finished before step V can begin.','Step N must be finished before step Z can begin.','Step I must be finished before step J can begin.','Step Z must be finished before step T can begin.','Step B must be finished before step A can begin.','Step L must be finished before step T can begin.','Step E must be finished before step D can begin.','Step U must be finished before step Y can begin.','Step W must be finished before step O can begin.','Step C must be finished before step V can begin.','Step O must be finished before step J can begin.','Step T must be finished before step D can begin.','Step A must be finished before step J can begin.','Step J must be finished before step V can begin.','Step D must be finished before step P can begin.','Step P must be finished before step V can begin.','Step K must be finished before step Y can begin.','Step V must be finished before step Y can begin.','Step D must be finished before step V can begin.','Step W must be finished before step Y can begin.','Step I must be finished before step U can begin.','Step B must be finished before step V can begin.','Step U must be finished before step D can begin.','Step M must be finished before step C can begin.','Step H must be finished before step Z can begin.','Step B must be finished before step P can begin.','Step X must be finished before step N can begin.','Step G must be finished before step O can begin.','Step I must be finished before step C can begin.','Step B must be finished before step K can begin.','Step J must be finished before step Y can begin.','Step M must be finished before step E can begin.','Step T must be finished before step J can begin.','Step O must be finished before step P can begin.','Step P must be finished before step Y can begin.','Step R must be finished before step D can begin.','Step N must be finished before step W can begin.','Step H must be finished before step G can begin.','Step I must be finished before step K can begin.','Step L must be finished before step O can begin.','Step X must be finished before step K can begin.','Step B must be finished before step J can begin.','Step Z must be finished before step C can begin.','Step Z must be finished before step O can begin.','Step F must be finished before step U can begin.','Step F must be finished before step Q can begin.','Step U must be finished before step K can begin.','Step T must be finished before step V can begin.','Step O must be finished before step D can begin.','Step R must be finished before step B can begin.','Step U must be finished before step J can begin.','Step U must be finished before step A can begin.','Step T must be finished before step K can begin.','Step F must be finished before step N can begin.','Step J must be finished before step P can begin.','Step Z must be finished before step A can begin.','Step L must be finished before step A can begin.','Step R must be finished before step V can begin.','Step F must be finished before step Y can begin.','Step C must be finished before step A can begin.','Step H must be finished before step P can begin.','Step A must be finished before step K can begin.','Step C must be finished before step J can begin.','Step X must be finished before step T can begin.','Step L must be finished before step D can begin.','Step L must be finished before step J can begin.','Step N must be finished before step B can begin.','Step Z must be finished before step B can begin.','Step G must be finished before step P can begin.','Step E must be finished before step P can begin.','Step L must be finished before step P can begin.','Step T must be finished before step Y can begin.','Step S must be finished before step U can begin.','Step M must be finished before step U can begin.','Step D must be finished before step K can begin.','Step L must be finished before step U can begin.','Step F must be finished before step S can begin.','Step N must be finished before step L can begin.','Step W must be finished before step P can begin.','Step G must be finished before step I can begin.','Step L must be finished before step Y can begin.','Step D must be finished before step Y can begin.','Step K must be finished before step V can begin.','Step B must be finished before step O can begin.','Step P must be finished before step K can begin.','Step R must be finished before step C can begin.','Step G must be finished before step L can begin.','Step O must be finished before step A can begin.','Step M must be finished before step L can begin.','Step E must be finished before step K can begin.','Step F must be finished before step C can begin.','Step B must be finished before step L can begin.','Step O must be finished before step T can begin.','Step S must be finished before step O can begin.'];



function part1(input) {
	var tree = input
		.map(a => a.match(/Step (.*) must be finished before step (.*) can begin./))
		.reduce((a, c) => {
			a.a[c[1]] = a.a[c[1]] || []; a.a[c[1]].push(c[2]); 
			a.b[c[2]] = a.b[c[2]] || []; a.b[c[2]].push(c[1]); 
			return a
		}, {a: {}, b: {}})._l();
	var stack = [];
	tree.a.keys().forEach(k => {
		var first = tree.a.keys().reduce((a,c) => a &= tree.a[c].indexOf(k) == -1, true);
		first && stack.push(k);
	});

	stack._l();

	var out = '';

	function walk(key) {
		input = tree.a[key] || [];
		if (out.indexOf(key) != -1) return stack;
		out += key;
		if (input.length === 0) return stack
		return stack.concat(input.filter(a => tree.b[a].reduce((a,c) => a &= out.indexOf(c) != -1, true)))
	}

	while (stack._l().length) {	
		stack = stack.sort();
		stack = walk(stack.shift());		
	}
	return out;
}

function part2(input) {
	var tree = input
			.map(a => a.match(/Step (.*) must be finished before step (.*) can begin./))
			.reduce((a, c) => {
				a.a[c[1]] = a.a[c[1]] || []; a.a[c[1]].push(c[2]); 
				a.b[c[2]] = a.b[c[2]] || []; a.b[c[2]].push(c[1]); 
				return a
			}, {a: {}, b: {}})._l();
		var stack = [];
		tree.a.keys().forEach(k => {
			var first = tree.a.keys().reduce((a,c) => a &= tree.a[c].indexOf(k) == -1, true);
			first && stack.push(k);
		});

		var out = '';
		var working = '';

		function walk(key) {
			input = tree.a[key] || [];
			if (out.indexOf(key) != -1 || working.indexOf(key) != -1) return stack;
			if (input.length === 0) return stack
			return 
		}

		var workers = [{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''},{t: 0, c: ''}];
		var time = 0;
		while (true) {
			var _break = workers.sort((a, b) => a.t - b.t).some(a => {
				a.t = Math.max(0, a.t - 1);
				if (a.t == 0 && a.c) {
					out += a.c;
					out._l();
					console.log(`Finished ${a.c}`)
					var next = tree.a[a.c] || [];
					if (next.length === 0) {
						return true;
					}
					stack = stack.concat(tree.a[a.c].filter(a => tree.b[a].reduce((a,c) => a && out.indexOf(c) != -1, true))).sort()._l();
					a.c = '';
				}
			});
			if (_break) {
				return time;
			}
			while (stack.length && workers[0].t == 0) {
				var char = stack.shift();
				working += char;
				console.log(`starting ${char}`)
				workers[0] = {c: char, t: 60 + (char.codePointAt(0) - 64)};
				workers = workers.sort((a, b) => a.t - b.t)
			}
			if (stack.length === 0) {
				console.log('no available jobs')
			} 
			if (workers[0].t > 0) {
				console.log('no available workers')
			}
			time++;
		} 
}

const testData = ['Step C must be finished before step A can begin.','Step C must be finished before step F can begin.','Step A must be finished before step B can begin.','Step A must be finished before step D can begin.','Step B must be finished before step E can begin.','Step D must be finished before step E can begin.','Step F must be finished before step E can begin.',];
// advent.test(part1, testData, 'CABDFE');
// advent.run(part1, input);

//advent.test(part2, testData, 15);
advent.run(part2, input);