'strict mode'
require('./newStdLib');
const advent = require('./advent');

class Commands {
	constructor() {
		this.commands = ['addr', 'addi', 'mulr', 'muli', 'banr', 'bani', 'borr', 'bori', 'setr', 'seti', 'gtir', 'gtri', 'gtrr', 'eqir', 'eqri', 'eqrr'];
	}

	addr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] + registers[instruction[2]]
		return registers
	}

	addi (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] + instruction[2]
		return registers
	}

	mulr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] * registers[instruction[2]]
		return registers
	}

	muli (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] * instruction[2]
		return registers
	}

	banr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] & registers[instruction[2]]
		return registers
	}

	bani(registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] & instruction[2]
		return registers
	}

	borr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] | registers[instruction[2]]
		return registers
	}

	bori(registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] | instruction[2]
		return registers
	}

	seti (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = instruction[1]
		return registers
	}

	setr(registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]]
		return registers
	}

	gtir (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = instruction[1] > registers[instruction[2]] ? 1 : 0
		return registers
	}

	gtri(registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] > instruction[2] ? 1 : 0
		return registers
	}

	gtrr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] > registers[instruction[2]] ? 1 : 0
		return registers
	}

	eqir (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = instruction[1] == registers[instruction[2]] ? 1 : 0
		return registers
	}

	eqri(registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] == instruction[2] ? 1 : 0
		return registers
	}

	eqrr (registers, instruction) {
		registers = registers.slice(0);
		registers[instruction[3]] = registers[instruction[1]] == registers[instruction[2]] ? 1 : 0
		return registers
	}
}


function part1(input) {
	input = input.split("\n");
	var commands = new Commands
	var codes = commands.commands.reduce((a,c) => {a.c = false; return a}, {})
	var total = 0;
	for (var i = 0; i < input.length; i += 4) {
		var registers = input[i].match(/\[(.*)\]/)[1].split(', ').map(a => parseInt(a))
		var instruction = input[i+1].split(" ").map(a => parseInt(a));
		var result = input[i+2].match(/\[(.*)\]/)[1].split(', ').map(a => parseInt(a))
		var matches = [];
		
		commands.commands.forEach(a => {
			var newRegisters = commands[a](registers, instruction);
			if (newRegisters.join(",") == result.join(",")) {
				matches.push(a)
			}
		});

		if (matches.length >= 3) total++; 
	}
	return total
}

function part2(input, program) {
 	input = input.split("\n");
	var commands = new Commands
	var codes = Array(16);
	var total = 0;
	for (var i = 0; i < input.length; i += 4) {
		var registers = input[i].match(/\[(.*)\]/)[1].split(', ').map(a => parseInt(a))
		var instruction = input[i+1].split(" ").map(a => parseInt(a));
		var result = input[i+2].match(/\[(.*)\]/)[1].split(', ').map(a => parseInt(a))
		var matches = [];
		
		commands.commands.forEach(a => {
			var newRegisters = commands[a](registers, instruction);
			if (newRegisters.join(",") == result.join(",")) {
				matches.push(a)
			}
		});
		if (matches.length == 1) {
			codes[instruction[0]] = matches[0];
			commands.commands.splice(commands.commands.indexOf(matches[0]), 1)
		} 
	}

	codes._l();

	var registers = Array(4).fill(0);
 	program = program.split("\n").forEach(a => {
		var instruction = a.split(" ").map(a => parseInt(a));
		registers = commands[codes[instruction[0]]](registers, instruction);
	});

	return registers[0]

}

var input1 = `Before: [1, 2, 3, 2]
3 1 3 0
After:  [1, 2, 3, 2]

Before: [1, 1, 1, 3]
5 1 3 0
After:  [3, 1, 1, 3]

Before: [2, 3, 0, 2]
0 1 0 2
After:  [2, 3, 6, 2]

Before: [1, 2, 2, 3]
11 0 3 3
After:  [1, 2, 2, 0]

Before: [0, 0, 3, 3]
9 0 0 1
After:  [0, 0, 3, 3]

Before: [1, 0, 1, 2]
10 1 2 0
After:  [1, 0, 1, 2]

Before: [0, 2, 0, 2]
13 1 1 1
After:  [0, 1, 0, 2]

Before: [3, 1, 1, 1]
6 1 0 1
After:  [3, 3, 1, 1]

Before: [2, 3, 2, 0]
4 1 2 2
After:  [2, 3, 1, 0]

Before: [1, 2, 0, 2]
3 1 3 2
After:  [1, 2, 1, 2]

Before: [0, 1, 3, 3]
2 1 0 2
After:  [0, 1, 1, 3]

Before: [0, 3, 1, 3]
6 2 1 2
After:  [0, 3, 3, 3]

Before: [3, 1, 1, 1]
6 1 0 2
After:  [3, 1, 3, 1]

Before: [0, 2, 3, 2]
3 1 3 0
After:  [1, 2, 3, 2]

Before: [0, 0, 1, 3]
7 2 1 0
After:  [1, 0, 1, 3]

Before: [3, 1, 2, 3]
15 2 3 1
After:  [3, 3, 2, 3]

Before: [3, 2, 3, 2]
3 1 3 3
After:  [3, 2, 3, 1]

Before: [0, 2, 1, 2]
3 1 3 0
After:  [1, 2, 1, 2]

Before: [1, 0, 1, 1]
1 1 0 1
After:  [1, 1, 1, 1]

Before: [3, 2, 2, 2]
3 1 3 1
After:  [3, 1, 2, 2]

Before: [2, 3, 2, 3]
8 2 2 3
After:  [2, 3, 2, 4]

Before: [2, 1, 0, 2]
8 0 1 0
After:  [3, 1, 0, 2]

Before: [1, 1, 2, 3]
5 0 3 1
After:  [1, 3, 2, 3]

Before: [1, 0, 3, 1]
1 1 0 0
After:  [1, 0, 3, 1]

Before: [0, 1, 3, 1]
14 3 2 1
After:  [0, 3, 3, 1]

Before: [3, 3, 1, 1]
0 1 0 1
After:  [3, 9, 1, 1]

Before: [2, 3, 0, 3]
15 0 3 2
After:  [2, 3, 3, 3]

Before: [2, 2, 3, 3]
15 1 3 2
After:  [2, 2, 3, 3]

Before: [1, 1, 3, 2]
12 0 2 3
After:  [1, 1, 3, 3]

Before: [2, 1, 1, 3]
15 0 3 3
After:  [2, 1, 1, 3]

Before: [0, 2, 3, 2]
9 0 0 2
After:  [0, 2, 0, 2]

Before: [3, 2, 1, 0]
6 2 0 0
After:  [3, 2, 1, 0]

Before: [3, 3, 3, 2]
13 1 0 0
After:  [1, 3, 3, 2]

Before: [3, 2, 2, 3]
8 2 2 3
After:  [3, 2, 2, 4]

Before: [1, 0, 2, 3]
1 1 0 2
After:  [1, 0, 1, 3]

Before: [1, 0, 2, 0]
8 2 2 2
After:  [1, 0, 4, 0]

Before: [1, 3, 3, 2]
12 0 2 1
After:  [1, 3, 3, 2]

Before: [0, 1, 2, 2]
2 1 0 2
After:  [0, 1, 1, 2]

Before: [3, 0, 2, 3]
0 3 0 0
After:  [9, 0, 2, 3]

Before: [2, 0, 3, 1]
7 3 1 3
After:  [2, 0, 3, 1]

Before: [1, 2, 1, 3]
10 1 0 0
After:  [1, 2, 1, 3]

Before: [2, 3, 3, 0]
4 1 0 2
After:  [2, 3, 1, 0]

Before: [0, 1, 1, 2]
2 1 0 3
After:  [0, 1, 1, 1]

Before: [1, 0, 0, 2]
7 0 1 1
After:  [1, 1, 0, 2]

Before: [2, 3, 2, 2]
4 1 2 1
After:  [2, 1, 2, 2]

Before: [1, 2, 1, 0]
13 1 1 2
After:  [1, 2, 1, 0]

Before: [1, 0, 2, 2]
1 1 0 2
After:  [1, 0, 1, 2]

Before: [2, 2, 1, 3]
11 0 3 2
After:  [2, 2, 0, 3]

Before: [0, 1, 3, 1]
2 1 0 0
After:  [1, 1, 3, 1]

Before: [0, 1, 2, 2]
2 1 0 1
After:  [0, 1, 2, 2]

Before: [2, 3, 1, 1]
6 2 1 1
After:  [2, 3, 1, 1]

Before: [1, 2, 1, 0]
10 1 0 1
After:  [1, 1, 1, 0]

Before: [3, 1, 0, 3]
5 1 3 3
After:  [3, 1, 0, 3]

Before: [2, 1, 3, 1]
12 1 2 0
After:  [3, 1, 3, 1]

Before: [0, 0, 2, 3]
10 0 1 0
After:  [1, 0, 2, 3]

Before: [0, 1, 2, 0]
2 1 0 1
After:  [0, 1, 2, 0]

Before: [0, 1, 0, 3]
5 1 3 1
After:  [0, 3, 0, 3]

Before: [0, 1, 1, 1]
2 1 0 0
After:  [1, 1, 1, 1]

Before: [2, 0, 2, 1]
7 3 1 2
After:  [2, 0, 1, 1]

Before: [1, 0, 1, 0]
7 2 1 1
After:  [1, 1, 1, 0]

Before: [3, 2, 3, 3]
15 1 3 1
After:  [3, 3, 3, 3]

Before: [1, 2, 0, 3]
10 1 0 0
After:  [1, 2, 0, 3]

Before: [1, 2, 0, 0]
13 1 1 3
After:  [1, 2, 0, 1]

Before: [2, 3, 2, 3]
0 1 0 2
After:  [2, 3, 6, 3]

Before: [3, 3, 3, 1]
13 1 0 1
After:  [3, 1, 3, 1]

Before: [1, 2, 3, 1]
14 3 2 2
After:  [1, 2, 3, 1]

Before: [0, 0, 1, 3]
8 0 3 1
After:  [0, 3, 1, 3]

Before: [0, 2, 2, 3]
0 3 1 2
After:  [0, 2, 6, 3]

Before: [1, 1, 3, 3]
5 0 3 2
After:  [1, 1, 3, 3]

Before: [0, 1, 1, 0]
2 1 0 2
After:  [0, 1, 1, 0]

Before: [1, 0, 3, 0]
1 1 0 0
After:  [1, 0, 3, 0]

Before: [0, 1, 2, 0]
2 1 0 0
After:  [1, 1, 2, 0]

Before: [1, 1, 3, 2]
14 3 1 1
After:  [1, 3, 3, 2]

Before: [1, 3, 2, 2]
6 0 1 1
After:  [1, 3, 2, 2]

Before: [1, 0, 0, 2]
1 1 0 1
After:  [1, 1, 0, 2]

Before: [2, 3, 3, 0]
4 1 0 3
After:  [2, 3, 3, 1]

Before: [1, 0, 2, 1]
10 1 3 2
After:  [1, 0, 1, 1]

Before: [2, 1, 1, 1]
0 3 0 3
After:  [2, 1, 1, 2]

Before: [1, 0, 0, 1]
7 0 1 3
After:  [1, 0, 0, 1]

Before: [2, 0, 0, 1]
7 3 1 3
After:  [2, 0, 0, 1]

Before: [2, 3, 3, 2]
13 1 2 0
After:  [1, 3, 3, 2]

Before: [2, 2, 0, 1]
13 1 0 3
After:  [2, 2, 0, 1]

Before: [2, 3, 1, 3]
5 2 3 3
After:  [2, 3, 1, 3]

Before: [3, 2, 3, 2]
3 1 3 2
After:  [3, 2, 1, 2]

Before: [1, 3, 3, 1]
12 0 2 2
After:  [1, 3, 3, 1]

Before: [1, 0, 1, 3]
7 2 1 0
After:  [1, 0, 1, 3]

Before: [1, 3, 2, 0]
6 0 1 1
After:  [1, 3, 2, 0]

Before: [2, 0, 3, 1]
14 3 2 3
After:  [2, 0, 3, 3]

Before: [0, 1, 3, 1]
8 0 1 1
After:  [0, 1, 3, 1]

Before: [1, 1, 2, 3]
15 2 3 2
After:  [1, 1, 3, 3]

Before: [1, 2, 2, 2]
3 1 3 3
After:  [1, 2, 2, 1]

Before: [0, 1, 0, 2]
2 1 0 1
After:  [0, 1, 0, 2]

Before: [1, 2, 3, 3]
5 0 3 2
After:  [1, 2, 3, 3]

Before: [0, 0, 2, 0]
8 2 2 1
After:  [0, 4, 2, 0]

Before: [2, 3, 3, 1]
0 0 2 1
After:  [2, 6, 3, 1]

Before: [1, 0, 3, 2]
12 0 2 1
After:  [1, 3, 3, 2]

Before: [3, 1, 0, 3]
5 1 3 0
After:  [3, 1, 0, 3]

Before: [0, 0, 3, 1]
10 0 1 1
After:  [0, 1, 3, 1]

Before: [3, 3, 0, 2]
13 1 0 2
After:  [3, 3, 1, 2]

Before: [1, 1, 0, 3]
5 0 3 1
After:  [1, 3, 0, 3]

Before: [3, 3, 3, 1]
14 3 2 0
After:  [3, 3, 3, 1]

Before: [1, 3, 2, 3]
5 0 3 0
After:  [3, 3, 2, 3]

Before: [1, 0, 0, 3]
7 0 1 2
After:  [1, 0, 1, 3]

Before: [2, 2, 3, 1]
14 3 2 3
After:  [2, 2, 3, 3]

Before: [0, 1, 3, 1]
12 1 2 0
After:  [3, 1, 3, 1]

Before: [0, 1, 2, 3]
9 0 0 3
After:  [0, 1, 2, 0]

Before: [1, 3, 2, 3]
5 0 3 3
After:  [1, 3, 2, 3]

Before: [0, 2, 2, 3]
8 1 2 2
After:  [0, 2, 4, 3]

Before: [2, 3, 3, 0]
0 2 0 3
After:  [2, 3, 3, 6]

Before: [2, 3, 3, 1]
14 3 2 3
After:  [2, 3, 3, 3]

Before: [3, 1, 2, 2]
8 2 2 0
After:  [4, 1, 2, 2]

Before: [2, 3, 3, 3]
11 0 3 2
After:  [2, 3, 0, 3]

Before: [2, 2, 3, 2]
13 1 0 3
After:  [2, 2, 3, 1]

Before: [3, 0, 3, 3]
0 3 0 0
After:  [9, 0, 3, 3]

Before: [2, 3, 2, 3]
4 1 2 2
After:  [2, 3, 1, 3]

Before: [0, 0, 1, 1]
7 2 1 0
After:  [1, 0, 1, 1]

Before: [1, 0, 3, 0]
1 1 0 2
After:  [1, 0, 1, 0]

Before: [0, 1, 2, 3]
8 2 2 1
After:  [0, 4, 2, 3]

Before: [0, 1, 3, 0]
2 1 0 3
After:  [0, 1, 3, 1]

Before: [3, 3, 3, 1]
13 1 0 2
After:  [3, 3, 1, 1]

Before: [0, 1, 3, 0]
2 1 0 2
After:  [0, 1, 1, 0]

Before: [0, 0, 3, 1]
7 3 1 3
After:  [0, 0, 3, 1]

Before: [1, 0, 3, 0]
1 1 0 3
After:  [1, 0, 3, 1]

Before: [0, 3, 1, 2]
6 2 1 2
After:  [0, 3, 3, 2]

Before: [2, 1, 1, 3]
5 2 3 3
After:  [2, 1, 1, 3]

Before: [2, 0, 0, 3]
11 0 3 3
After:  [2, 0, 0, 0]

Before: [1, 0, 2, 1]
1 1 0 3
After:  [1, 0, 2, 1]

Before: [1, 3, 2, 3]
4 1 2 0
After:  [1, 3, 2, 3]

Before: [0, 2, 1, 2]
3 1 3 3
After:  [0, 2, 1, 1]

Before: [0, 0, 0, 0]
9 0 0 3
After:  [0, 0, 0, 0]

Before: [1, 0, 3, 3]
1 1 0 1
After:  [1, 1, 3, 3]

Before: [1, 1, 3, 1]
12 0 2 3
After:  [1, 1, 3, 3]

Before: [2, 3, 0, 0]
4 1 0 2
After:  [2, 3, 1, 0]

Before: [0, 1, 2, 3]
9 0 0 0
After:  [0, 1, 2, 3]

Before: [1, 0, 0, 3]
1 1 0 3
After:  [1, 0, 0, 1]

Before: [2, 2, 2, 0]
13 1 0 3
After:  [2, 2, 2, 1]

Before: [3, 3, 3, 3]
13 1 0 2
After:  [3, 3, 1, 3]

Before: [1, 2, 1, 3]
15 1 3 3
After:  [1, 2, 1, 3]

Before: [1, 3, 2, 1]
4 1 2 2
After:  [1, 3, 1, 1]

Before: [3, 3, 3, 3]
13 1 0 1
After:  [3, 1, 3, 3]

Before: [1, 0, 1, 1]
7 2 1 0
After:  [1, 0, 1, 1]

Before: [2, 1, 0, 3]
5 1 3 2
After:  [2, 1, 3, 3]

Before: [1, 0, 1, 2]
7 0 1 2
After:  [1, 0, 1, 2]

Before: [2, 1, 3, 2]
8 1 3 3
After:  [2, 1, 3, 3]

Before: [1, 2, 2, 3]
15 1 3 0
After:  [3, 2, 2, 3]

Before: [1, 0, 2, 3]
11 0 3 3
After:  [1, 0, 2, 0]

Before: [1, 3, 2, 2]
4 1 2 0
After:  [1, 3, 2, 2]

Before: [2, 2, 2, 3]
15 0 3 2
After:  [2, 2, 3, 3]

Before: [3, 1, 3, 1]
12 1 2 2
After:  [3, 1, 3, 1]

Before: [1, 0, 2, 1]
1 1 0 2
After:  [1, 0, 1, 1]

Before: [0, 3, 2, 0]
0 2 1 2
After:  [0, 3, 6, 0]

Before: [0, 2, 3, 2]
13 1 1 0
After:  [1, 2, 3, 2]

Before: [2, 3, 3, 2]
4 1 0 2
After:  [2, 3, 1, 2]

Before: [3, 3, 2, 1]
4 1 2 1
After:  [3, 1, 2, 1]

Before: [1, 3, 1, 2]
8 2 3 3
After:  [1, 3, 1, 3]

Before: [1, 3, 1, 1]
6 0 1 0
After:  [3, 3, 1, 1]

Before: [0, 3, 2, 1]
14 3 2 2
After:  [0, 3, 3, 1]

Before: [1, 0, 0, 3]
1 1 0 0
After:  [1, 0, 0, 3]

Before: [0, 0, 1, 1]
10 0 1 2
After:  [0, 0, 1, 1]

Before: [1, 1, 2, 2]
8 2 2 0
After:  [4, 1, 2, 2]

Before: [1, 2, 3, 2]
3 1 3 1
After:  [1, 1, 3, 2]

Before: [1, 2, 1, 2]
10 1 0 1
After:  [1, 1, 1, 2]

Before: [2, 3, 2, 0]
4 1 0 1
After:  [2, 1, 2, 0]

Before: [1, 0, 1, 0]
1 1 0 1
After:  [1, 1, 1, 0]

Before: [2, 0, 1, 2]
10 1 2 1
After:  [2, 1, 1, 2]

Before: [3, 3, 3, 0]
13 1 0 2
After:  [3, 3, 1, 0]

Before: [2, 0, 3, 3]
11 0 3 3
After:  [2, 0, 3, 0]

Before: [0, 1, 2, 3]
5 1 3 3
After:  [0, 1, 2, 3]

Before: [1, 0, 2, 3]
1 1 0 0
After:  [1, 0, 2, 3]

Before: [0, 0, 3, 3]
10 0 1 0
After:  [1, 0, 3, 3]

Before: [1, 0, 2, 2]
1 1 0 0
After:  [1, 0, 2, 2]

Before: [1, 0, 0, 2]
1 1 0 2
After:  [1, 0, 1, 2]

Before: [2, 3, 1, 1]
6 2 1 2
After:  [2, 3, 3, 1]

Before: [2, 2, 3, 1]
14 3 2 2
After:  [2, 2, 3, 1]

Before: [3, 3, 1, 3]
6 2 1 3
After:  [3, 3, 1, 3]

Before: [0, 1, 1, 2]
2 1 0 0
After:  [1, 1, 1, 2]

Before: [2, 0, 3, 3]
0 2 2 3
After:  [2, 0, 3, 9]

Before: [0, 1, 0, 0]
9 0 0 1
After:  [0, 0, 0, 0]

Before: [0, 1, 2, 1]
2 1 0 3
After:  [0, 1, 2, 1]

Before: [2, 2, 0, 3]
15 0 3 3
After:  [2, 2, 0, 3]

Before: [0, 3, 2, 1]
14 3 2 3
After:  [0, 3, 2, 3]

Before: [1, 2, 1, 3]
15 1 3 0
After:  [3, 2, 1, 3]

Before: [0, 3, 0, 2]
9 0 0 3
After:  [0, 3, 0, 0]

Before: [1, 2, 0, 1]
13 1 1 1
After:  [1, 1, 0, 1]

Before: [2, 3, 3, 1]
14 3 2 1
After:  [2, 3, 3, 1]

Before: [0, 2, 1, 3]
15 1 3 3
After:  [0, 2, 1, 3]

Before: [1, 0, 2, 1]
7 3 1 2
After:  [1, 0, 1, 1]

Before: [0, 2, 3, 2]
3 1 3 3
After:  [0, 2, 3, 1]

Before: [3, 3, 1, 3]
13 1 0 3
After:  [3, 3, 1, 1]

Before: [3, 2, 2, 2]
3 1 3 3
After:  [3, 2, 2, 1]

Before: [0, 1, 1, 1]
9 0 0 1
After:  [0, 0, 1, 1]

Before: [0, 1, 2, 3]
9 0 0 1
After:  [0, 0, 2, 3]

Before: [0, 1, 3, 2]
9 0 0 0
After:  [0, 1, 3, 2]

Before: [1, 1, 3, 3]
11 0 3 2
After:  [1, 1, 0, 3]

Before: [1, 1, 1, 3]
5 0 3 1
After:  [1, 3, 1, 3]

Before: [3, 1, 1, 2]
14 3 1 1
After:  [3, 3, 1, 2]

Before: [0, 3, 1, 0]
0 1 1 2
After:  [0, 3, 9, 0]

Before: [0, 1, 1, 1]
2 1 0 1
After:  [0, 1, 1, 1]

Before: [2, 2, 2, 1]
8 2 2 3
After:  [2, 2, 2, 4]

Before: [1, 2, 3, 0]
12 0 2 0
After:  [3, 2, 3, 0]

Before: [3, 3, 2, 1]
4 1 2 2
After:  [3, 3, 1, 1]

Before: [2, 2, 2, 1]
14 3 2 0
After:  [3, 2, 2, 1]

Before: [1, 1, 2, 1]
8 2 1 2
After:  [1, 1, 3, 1]

Before: [0, 3, 2, 2]
4 1 2 1
After:  [0, 1, 2, 2]

Before: [1, 0, 0, 0]
1 1 0 0
After:  [1, 0, 0, 0]

Before: [0, 1, 3, 2]
2 1 0 1
After:  [0, 1, 3, 2]

Before: [3, 3, 2, 0]
0 0 1 1
After:  [3, 9, 2, 0]

Before: [2, 3, 3, 3]
15 0 3 2
After:  [2, 3, 3, 3]

Before: [1, 0, 0, 2]
1 1 0 0
After:  [1, 0, 0, 2]

Before: [0, 3, 2, 3]
4 1 2 3
After:  [0, 3, 2, 1]

Before: [0, 1, 1, 2]
2 1 0 2
After:  [0, 1, 1, 2]

Before: [1, 2, 1, 2]
3 1 3 0
After:  [1, 2, 1, 2]

Before: [2, 2, 0, 3]
15 0 3 2
After:  [2, 2, 3, 3]

Before: [1, 3, 3, 0]
6 0 1 3
After:  [1, 3, 3, 3]

Before: [3, 2, 2, 3]
15 2 3 2
After:  [3, 2, 3, 3]

Before: [2, 2, 0, 2]
3 1 3 0
After:  [1, 2, 0, 2]

Before: [0, 1, 3, 1]
12 1 2 1
After:  [0, 3, 3, 1]

Before: [2, 0, 3, 3]
15 0 3 1
After:  [2, 3, 3, 3]

Before: [1, 1, 0, 2]
14 3 1 0
After:  [3, 1, 0, 2]

Before: [3, 3, 1, 2]
0 1 1 0
After:  [9, 3, 1, 2]

Before: [3, 1, 0, 0]
6 1 0 1
After:  [3, 3, 0, 0]

Before: [2, 2, 3, 1]
13 1 1 0
After:  [1, 2, 3, 1]

Before: [1, 0, 3, 2]
7 0 1 1
After:  [1, 1, 3, 2]

Before: [0, 1, 2, 1]
8 2 2 0
After:  [4, 1, 2, 1]

Before: [1, 0, 3, 1]
7 0 1 2
After:  [1, 0, 1, 1]

Before: [0, 3, 1, 1]
6 2 1 0
After:  [3, 3, 1, 1]

Before: [1, 0, 3, 3]
12 0 2 1
After:  [1, 3, 3, 3]

Before: [1, 3, 3, 3]
12 0 2 2
After:  [1, 3, 3, 3]

Before: [2, 1, 3, 1]
12 1 2 3
After:  [2, 1, 3, 3]

Before: [0, 2, 3, 2]
3 1 3 1
After:  [0, 1, 3, 2]

Before: [3, 2, 0, 1]
0 0 0 3
After:  [3, 2, 0, 9]

Before: [2, 0, 1, 3]
15 0 3 2
After:  [2, 0, 3, 3]

Before: [3, 1, 1, 2]
6 2 0 3
After:  [3, 1, 1, 3]

Before: [0, 0, 3, 1]
7 3 1 2
After:  [0, 0, 1, 1]

Before: [2, 2, 3, 3]
15 1 3 0
After:  [3, 2, 3, 3]

Before: [0, 0, 1, 1]
7 2 1 3
After:  [0, 0, 1, 1]

Before: [0, 1, 3, 2]
12 1 2 2
After:  [0, 1, 3, 2]

Before: [0, 1, 3, 3]
0 2 2 2
After:  [0, 1, 9, 3]

Before: [0, 0, 2, 3]
10 0 1 3
After:  [0, 0, 2, 1]

Before: [1, 3, 1, 1]
6 0 1 3
After:  [1, 3, 1, 3]

Before: [1, 0, 1, 2]
10 1 2 1
After:  [1, 1, 1, 2]

Before: [0, 1, 0, 2]
14 3 1 0
After:  [3, 1, 0, 2]

Before: [0, 1, 3, 2]
9 0 0 2
After:  [0, 1, 0, 2]

Before: [1, 0, 1, 2]
1 1 0 0
After:  [1, 0, 1, 2]

Before: [3, 0, 2, 1]
7 3 1 0
After:  [1, 0, 2, 1]

Before: [2, 2, 1, 3]
5 2 3 2
After:  [2, 2, 3, 3]

Before: [1, 3, 0, 3]
5 0 3 2
After:  [1, 3, 3, 3]

Before: [0, 1, 3, 1]
12 1 2 2
After:  [0, 1, 3, 1]

Before: [2, 3, 2, 3]
15 2 3 1
After:  [2, 3, 2, 3]

Before: [2, 1, 1, 3]
11 0 3 2
After:  [2, 1, 0, 3]

Before: [2, 2, 0, 2]
3 1 3 3
After:  [2, 2, 0, 1]

Before: [2, 3, 2, 3]
15 0 3 2
After:  [2, 3, 3, 3]

Before: [3, 2, 1, 3]
5 2 3 1
After:  [3, 3, 1, 3]

Before: [1, 0, 1, 3]
5 2 3 2
After:  [1, 0, 3, 3]

Before: [0, 1, 3, 1]
2 1 0 2
After:  [0, 1, 1, 1]

Before: [1, 0, 3, 2]
7 0 1 3
After:  [1, 0, 3, 1]

Before: [1, 2, 2, 2]
3 1 3 1
After:  [1, 1, 2, 2]

Before: [2, 3, 0, 3]
4 1 0 0
After:  [1, 3, 0, 3]

Before: [3, 3, 1, 1]
6 2 0 2
After:  [3, 3, 3, 1]

Before: [2, 3, 3, 1]
0 0 2 3
After:  [2, 3, 3, 6]

Before: [1, 1, 2, 1]
14 3 2 0
After:  [3, 1, 2, 1]

Before: [1, 3, 1, 3]
11 0 3 0
After:  [0, 3, 1, 3]

Before: [2, 2, 0, 3]
15 0 3 1
After:  [2, 3, 0, 3]

Before: [1, 2, 2, 0]
10 1 0 1
After:  [1, 1, 2, 0]

Before: [1, 0, 1, 0]
10 1 2 1
After:  [1, 1, 1, 0]

Before: [1, 2, 0, 3]
10 1 0 2
After:  [1, 2, 1, 3]

Before: [0, 1, 1, 1]
2 1 0 3
After:  [0, 1, 1, 1]

Before: [2, 0, 1, 0]
7 2 1 2
After:  [2, 0, 1, 0]

Before: [0, 3, 1, 3]
6 2 1 1
After:  [0, 3, 1, 3]

Before: [3, 1, 3, 3]
5 1 3 1
After:  [3, 3, 3, 3]

Before: [0, 3, 3, 1]
0 1 2 2
After:  [0, 3, 9, 1]

Before: [2, 3, 2, 2]
8 3 2 0
After:  [4, 3, 2, 2]

Before: [2, 3, 1, 2]
4 1 0 3
After:  [2, 3, 1, 1]

Before: [1, 0, 3, 2]
12 0 2 0
After:  [3, 0, 3, 2]

Before: [2, 1, 2, 2]
8 2 1 0
After:  [3, 1, 2, 2]

Before: [0, 0, 0, 0]
10 0 1 3
After:  [0, 0, 0, 1]

Before: [1, 3, 0, 3]
11 0 3 2
After:  [1, 3, 0, 3]

Before: [2, 0, 3, 1]
7 3 1 1
After:  [2, 1, 3, 1]

Before: [0, 0, 3, 0]
10 0 1 2
After:  [0, 0, 1, 0]

Before: [2, 3, 1, 3]
4 1 0 0
After:  [1, 3, 1, 3]

Before: [3, 3, 2, 0]
13 1 0 3
After:  [3, 3, 2, 1]

Before: [1, 2, 2, 2]
10 1 0 1
After:  [1, 1, 2, 2]

Before: [3, 1, 3, 3]
12 1 2 1
After:  [3, 3, 3, 3]

Before: [3, 3, 2, 1]
14 3 2 0
After:  [3, 3, 2, 1]

Before: [2, 3, 2, 1]
4 1 2 1
After:  [2, 1, 2, 1]

Before: [0, 2, 2, 3]
15 2 3 3
After:  [0, 2, 2, 3]

Before: [3, 2, 3, 1]
0 2 0 1
After:  [3, 9, 3, 1]

Before: [0, 2, 0, 2]
3 1 3 3
After:  [0, 2, 0, 1]

Before: [3, 2, 3, 0]
0 2 2 3
After:  [3, 2, 3, 9]

Before: [0, 2, 1, 3]
9 0 0 1
After:  [0, 0, 1, 3]

Before: [0, 0, 0, 2]
9 0 0 1
After:  [0, 0, 0, 2]

Before: [1, 0, 3, 1]
1 1 0 1
After:  [1, 1, 3, 1]

Before: [1, 0, 1, 1]
7 3 1 3
After:  [1, 0, 1, 1]

Before: [0, 3, 3, 2]
9 0 0 0
After:  [0, 3, 3, 2]

Before: [1, 0, 1, 1]
1 1 0 2
After:  [1, 0, 1, 1]

Before: [3, 2, 1, 3]
6 2 0 0
After:  [3, 2, 1, 3]

Before: [2, 3, 2, 0]
4 1 2 0
After:  [1, 3, 2, 0]

Before: [1, 0, 2, 2]
1 1 0 1
After:  [1, 1, 2, 2]

Before: [1, 2, 1, 3]
11 0 3 1
After:  [1, 0, 1, 3]

Before: [0, 0, 2, 1]
7 3 1 2
After:  [0, 0, 1, 1]

Before: [1, 3, 1, 0]
6 2 1 1
After:  [1, 3, 1, 0]

Before: [1, 0, 1, 3]
1 1 0 0
After:  [1, 0, 1, 3]

Before: [3, 2, 2, 3]
15 2 3 0
After:  [3, 2, 2, 3]

Before: [1, 0, 1, 3]
11 0 3 1
After:  [1, 0, 1, 3]

Before: [3, 2, 1, 1]
13 1 1 2
After:  [3, 2, 1, 1]

Before: [1, 3, 0, 3]
5 0 3 1
After:  [1, 3, 0, 3]

Before: [2, 2, 2, 3]
8 0 2 1
After:  [2, 4, 2, 3]

Before: [0, 0, 3, 0]
9 0 0 3
After:  [0, 0, 3, 0]

Before: [1, 0, 2, 2]
1 1 0 3
After:  [1, 0, 2, 1]

Before: [0, 0, 3, 2]
10 0 1 3
After:  [0, 0, 3, 1]

Before: [0, 0, 0, 1]
10 1 3 1
After:  [0, 1, 0, 1]

Before: [0, 3, 3, 2]
0 3 1 2
After:  [0, 3, 6, 2]

Before: [2, 1, 3, 3]
12 1 2 1
After:  [2, 3, 3, 3]

Before: [0, 0, 2, 0]
8 0 2 1
After:  [0, 2, 2, 0]

Before: [3, 1, 1, 2]
14 3 1 3
After:  [3, 1, 1, 3]

Before: [0, 3, 2, 1]
4 1 2 2
After:  [0, 3, 1, 1]

Before: [3, 0, 1, 3]
5 2 3 0
After:  [3, 0, 1, 3]

Before: [1, 0, 3, 2]
0 3 2 2
After:  [1, 0, 6, 2]

Before: [2, 1, 3, 3]
11 0 3 3
After:  [2, 1, 3, 0]

Before: [1, 0, 0, 2]
1 1 0 3
After:  [1, 0, 0, 1]

Before: [3, 0, 1, 1]
7 3 1 0
After:  [1, 0, 1, 1]

Before: [2, 1, 2, 3]
5 1 3 3
After:  [2, 1, 2, 3]

Before: [1, 2, 0, 1]
10 1 0 3
After:  [1, 2, 0, 1]

Before: [2, 1, 0, 3]
15 0 3 0
After:  [3, 1, 0, 3]

Before: [1, 3, 3, 1]
12 0 2 3
After:  [1, 3, 3, 3]

Before: [2, 2, 3, 2]
3 1 3 1
After:  [2, 1, 3, 2]

Before: [2, 3, 3, 2]
4 1 0 1
After:  [2, 1, 3, 2]

Before: [3, 0, 1, 0]
7 2 1 1
After:  [3, 1, 1, 0]

Before: [1, 1, 0, 2]
14 3 1 2
After:  [1, 1, 3, 2]

Before: [2, 3, 1, 2]
6 2 1 3
After:  [2, 3, 1, 3]

Before: [2, 0, 0, 1]
10 1 3 2
After:  [2, 0, 1, 1]

Before: [1, 3, 1, 3]
5 0 3 0
After:  [3, 3, 1, 3]

Before: [0, 0, 1, 0]
7 2 1 2
After:  [0, 0, 1, 0]

Before: [1, 2, 1, 3]
11 0 3 2
After:  [1, 2, 0, 3]

Before: [2, 3, 0, 0]
4 1 0 3
After:  [2, 3, 0, 1]

Before: [1, 3, 1, 1]
6 2 1 0
After:  [3, 3, 1, 1]

Before: [0, 2, 2, 2]
3 1 3 2
After:  [0, 2, 1, 2]

Before: [3, 0, 3, 1]
10 1 3 3
After:  [3, 0, 3, 1]

Before: [2, 2, 1, 2]
13 1 1 1
After:  [2, 1, 1, 2]

Before: [0, 1, 3, 0]
9 0 0 3
After:  [0, 1, 3, 0]

Before: [2, 3, 0, 3]
4 1 0 3
After:  [2, 3, 0, 1]

Before: [0, 3, 2, 2]
4 1 2 2
After:  [0, 3, 1, 2]

Before: [2, 3, 3, 0]
4 1 0 0
After:  [1, 3, 3, 0]

Before: [0, 2, 3, 3]
15 1 3 1
After:  [0, 3, 3, 3]

Before: [0, 0, 2, 2]
8 0 2 3
After:  [0, 0, 2, 2]

Before: [1, 2, 2, 3]
11 0 3 0
After:  [0, 2, 2, 3]

Before: [0, 1, 0, 3]
2 1 0 3
After:  [0, 1, 0, 1]

Before: [3, 2, 3, 2]
3 1 3 0
After:  [1, 2, 3, 2]

Before: [3, 3, 1, 0]
0 0 0 2
After:  [3, 3, 9, 0]

Before: [1, 0, 0, 3]
7 0 1 1
After:  [1, 1, 0, 3]

Before: [0, 0, 0, 1]
7 3 1 1
After:  [0, 1, 0, 1]

Before: [1, 0, 0, 3]
1 1 0 1
After:  [1, 1, 0, 3]

Before: [1, 0, 2, 1]
14 3 2 2
After:  [1, 0, 3, 1]

Before: [1, 3, 2, 1]
14 3 2 2
After:  [1, 3, 3, 1]

Before: [2, 3, 3, 2]
0 2 2 3
After:  [2, 3, 3, 9]

Before: [0, 1, 2, 1]
2 1 0 2
After:  [0, 1, 1, 1]

Before: [1, 0, 3, 1]
1 1 0 3
After:  [1, 0, 3, 1]

Before: [3, 0, 3, 0]
0 2 2 2
After:  [3, 0, 9, 0]

Before: [0, 1, 2, 0]
2 1 0 3
After:  [0, 1, 2, 1]

Before: [2, 2, 3, 3]
11 0 3 0
After:  [0, 2, 3, 3]

Before: [0, 1, 0, 0]
2 1 0 1
After:  [0, 1, 0, 0]

Before: [0, 1, 0, 3]
2 1 0 0
After:  [1, 1, 0, 3]

Before: [3, 0, 2, 3]
15 2 3 2
After:  [3, 0, 3, 3]

Before: [0, 3, 1, 3]
9 0 0 1
After:  [0, 0, 1, 3]

Before: [3, 3, 2, 2]
0 2 0 3
After:  [3, 3, 2, 6]

Before: [1, 0, 2, 3]
1 1 0 3
After:  [1, 0, 2, 1]

Before: [1, 3, 3, 0]
12 0 2 2
After:  [1, 3, 3, 0]

Before: [3, 1, 3, 1]
12 1 2 3
After:  [3, 1, 3, 3]

Before: [2, 0, 1, 1]
7 3 1 0
After:  [1, 0, 1, 1]

Before: [0, 2, 0, 2]
3 1 3 1
After:  [0, 1, 0, 2]

Before: [1, 2, 1, 2]
8 0 3 3
After:  [1, 2, 1, 3]

Before: [3, 1, 1, 3]
6 1 0 2
After:  [3, 1, 3, 3]

Before: [1, 1, 3, 3]
5 0 3 1
After:  [1, 3, 3, 3]

Before: [0, 1, 3, 0]
2 1 0 1
After:  [0, 1, 3, 0]

Before: [0, 1, 2, 3]
2 1 0 2
After:  [0, 1, 1, 3]

Before: [0, 2, 0, 2]
13 1 1 3
After:  [0, 2, 0, 1]

Before: [1, 0, 1, 3]
1 1 0 2
After:  [1, 0, 1, 3]

Before: [1, 1, 0, 3]
5 0 3 3
After:  [1, 1, 0, 3]

Before: [1, 2, 3, 1]
14 3 2 1
After:  [1, 3, 3, 1]

Before: [2, 3, 2, 3]
15 2 3 2
After:  [2, 3, 3, 3]

Before: [1, 1, 2, 2]
8 2 1 1
After:  [1, 3, 2, 2]

Before: [1, 2, 1, 2]
3 1 3 2
After:  [1, 2, 1, 2]

Before: [0, 0, 1, 3]
5 2 3 2
After:  [0, 0, 3, 3]

Before: [2, 3, 0, 1]
4 1 0 2
After:  [2, 3, 1, 1]

Before: [0, 1, 3, 0]
9 0 0 2
After:  [0, 1, 0, 0]

Before: [3, 0, 0, 1]
7 3 1 0
After:  [1, 0, 0, 1]

Before: [1, 1, 3, 2]
12 1 2 1
After:  [1, 3, 3, 2]

Before: [1, 2, 3, 2]
3 1 3 3
After:  [1, 2, 3, 1]

Before: [2, 0, 1, 2]
10 1 2 3
After:  [2, 0, 1, 1]

Before: [3, 1, 3, 1]
6 1 0 2
After:  [3, 1, 3, 1]

Before: [3, 2, 2, 3]
13 1 1 2
After:  [3, 2, 1, 3]

Before: [1, 2, 0, 2]
3 1 3 3
After:  [1, 2, 0, 1]

Before: [0, 1, 0, 1]
2 1 0 3
After:  [0, 1, 0, 1]

Before: [3, 1, 1, 1]
6 1 0 3
After:  [3, 1, 1, 3]

Before: [3, 0, 3, 0]
0 2 0 3
After:  [3, 0, 3, 9]

Before: [1, 0, 1, 2]
1 1 0 2
After:  [1, 0, 1, 2]

Before: [0, 1, 2, 1]
8 2 1 1
After:  [0, 3, 2, 1]

Before: [3, 0, 2, 1]
7 3 1 2
After:  [3, 0, 1, 1]

Before: [0, 1, 1, 3]
2 1 0 1
After:  [0, 1, 1, 3]

Before: [1, 1, 2, 2]
8 1 2 2
After:  [1, 1, 3, 2]

Before: [3, 1, 3, 3]
6 1 0 0
After:  [3, 1, 3, 3]

Before: [1, 0, 3, 1]
12 0 2 3
After:  [1, 0, 3, 3]

Before: [1, 3, 3, 2]
6 0 1 1
After:  [1, 3, 3, 2]

Before: [0, 0, 3, 1]
10 1 3 1
After:  [0, 1, 3, 1]

Before: [3, 2, 3, 2]
3 1 3 1
After:  [3, 1, 3, 2]

Before: [3, 3, 1, 2]
6 2 0 2
After:  [3, 3, 3, 2]

Before: [0, 1, 0, 2]
2 1 0 2
After:  [0, 1, 1, 2]

Before: [2, 1, 2, 3]
8 0 1 1
After:  [2, 3, 2, 3]

Before: [3, 3, 1, 0]
6 2 0 3
After:  [3, 3, 1, 3]

Before: [1, 3, 3, 2]
13 1 2 1
After:  [1, 1, 3, 2]

Before: [0, 0, 2, 3]
15 2 3 0
After:  [3, 0, 2, 3]

Before: [0, 1, 1, 1]
2 1 0 2
After:  [0, 1, 1, 1]

Before: [0, 0, 0, 2]
10 0 1 2
After:  [0, 0, 1, 2]

Before: [0, 1, 1, 0]
2 1 0 1
After:  [0, 1, 1, 0]

Before: [0, 0, 2, 2]
8 3 2 2
After:  [0, 0, 4, 2]

Before: [2, 3, 1, 1]
4 1 0 3
After:  [2, 3, 1, 1]

Before: [1, 0, 0, 0]
1 1 0 3
After:  [1, 0, 0, 1]

Before: [1, 0, 3, 3]
7 0 1 2
After:  [1, 0, 1, 3]

Before: [1, 0, 3, 2]
1 1 0 1
After:  [1, 1, 3, 2]

Before: [0, 1, 1, 0]
9 0 0 0
After:  [0, 1, 1, 0]

Before: [3, 0, 3, 1]
14 3 2 2
After:  [3, 0, 3, 1]

Before: [2, 2, 2, 3]
15 1 3 1
After:  [2, 3, 2, 3]

Before: [0, 3, 3, 0]
9 0 0 0
After:  [0, 3, 3, 0]

Before: [0, 1, 3, 3]
2 1 0 3
After:  [0, 1, 3, 1]

Before: [1, 2, 2, 3]
15 2 3 2
After:  [1, 2, 3, 3]

Before: [3, 2, 2, 2]
0 3 0 2
After:  [3, 2, 6, 2]

Before: [0, 2, 3, 3]
13 1 1 3
After:  [0, 2, 3, 1]

Before: [0, 3, 2, 3]
4 1 2 1
After:  [0, 1, 2, 3]

Before: [0, 0, 3, 1]
10 0 1 3
After:  [0, 0, 3, 1]

Before: [2, 0, 2, 3]
15 0 3 2
After:  [2, 0, 3, 3]

Before: [1, 1, 3, 2]
12 1 2 3
After:  [1, 1, 3, 3]

Before: [1, 0, 2, 1]
7 0 1 3
After:  [1, 0, 2, 1]

Before: [0, 1, 3, 0]
0 2 2 3
After:  [0, 1, 3, 9]

Before: [2, 2, 2, 1]
14 3 2 2
After:  [2, 2, 3, 1]

Before: [0, 1, 0, 1]
2 1 0 0
After:  [1, 1, 0, 1]

Before: [0, 0, 2, 3]
15 2 3 1
After:  [0, 3, 2, 3]

Before: [1, 3, 0, 1]
6 0 1 2
After:  [1, 3, 3, 1]

Before: [1, 2, 2, 3]
10 1 0 3
After:  [1, 2, 2, 1]

Before: [0, 2, 3, 3]
13 1 1 2
After:  [0, 2, 1, 3]

Before: [0, 0, 0, 1]
10 1 3 0
After:  [1, 0, 0, 1]

Before: [2, 2, 3, 2]
3 1 3 0
After:  [1, 2, 3, 2]

Before: [0, 1, 2, 2]
14 3 1 1
After:  [0, 3, 2, 2]

Before: [0, 1, 3, 3]
2 1 0 1
After:  [0, 1, 3, 3]

Before: [3, 3, 3, 3]
0 2 0 0
After:  [9, 3, 3, 3]

Before: [1, 3, 2, 2]
8 0 3 1
After:  [1, 3, 2, 2]

Before: [2, 2, 0, 3]
15 1 3 2
After:  [2, 2, 3, 3]

Before: [1, 1, 2, 3]
5 0 3 0
After:  [3, 1, 2, 3]

Before: [2, 3, 3, 3]
11 0 3 3
After:  [2, 3, 3, 0]

Before: [2, 3, 2, 3]
4 1 0 1
After:  [2, 1, 2, 3]

Before: [2, 0, 0, 3]
11 0 3 1
After:  [2, 0, 0, 3]

Before: [3, 3, 1, 3]
5 2 3 1
After:  [3, 3, 1, 3]

Before: [1, 0, 3, 0]
12 0 2 2
After:  [1, 0, 3, 0]

Before: [1, 1, 3, 3]
5 1 3 2
After:  [1, 1, 3, 3]

Before: [1, 2, 0, 2]
3 1 3 1
After:  [1, 1, 0, 2]

Before: [2, 2, 3, 2]
3 1 3 2
After:  [2, 2, 1, 2]

Before: [3, 1, 2, 1]
6 1 0 1
After:  [3, 3, 2, 1]

Before: [0, 1, 3, 0]
2 1 0 0
After:  [1, 1, 3, 0]

Before: [1, 0, 1, 3]
8 1 3 2
After:  [1, 0, 3, 3]

Before: [1, 1, 2, 3]
11 0 3 2
After:  [1, 1, 0, 3]

Before: [0, 3, 2, 3]
9 0 0 0
After:  [0, 3, 2, 3]

Before: [3, 2, 2, 0]
13 1 1 0
After:  [1, 2, 2, 0]

Before: [1, 0, 0, 1]
1 1 0 1
After:  [1, 1, 0, 1]

Before: [2, 0, 0, 3]
15 0 3 0
After:  [3, 0, 0, 3]

Before: [3, 2, 0, 2]
3 1 3 3
After:  [3, 2, 0, 1]

Before: [1, 0, 1, 3]
5 2 3 1
After:  [1, 3, 1, 3]

Before: [2, 3, 3, 1]
4 1 0 1
After:  [2, 1, 3, 1]

Before: [2, 2, 1, 3]
5 2 3 1
After:  [2, 3, 1, 3]

Before: [0, 1, 0, 0]
9 0 0 2
After:  [0, 1, 0, 0]

Before: [0, 1, 0, 1]
2 1 0 2
After:  [0, 1, 1, 1]

Before: [0, 1, 0, 2]
2 1 0 3
After:  [0, 1, 0, 1]

Before: [1, 2, 2, 2]
13 1 1 1
After:  [1, 1, 2, 2]

Before: [1, 2, 1, 2]
3 1 3 3
After:  [1, 2, 1, 1]

Before: [1, 0, 2, 3]
11 0 3 1
After:  [1, 0, 2, 3]

Before: [0, 2, 0, 3]
15 1 3 0
After:  [3, 2, 0, 3]

Before: [1, 2, 3, 3]
15 1 3 2
After:  [1, 2, 3, 3]

Before: [0, 0, 1, 1]
10 1 2 2
After:  [0, 0, 1, 1]

Before: [1, 3, 1, 3]
5 2 3 3
After:  [1, 3, 1, 3]

Before: [1, 3, 1, 3]
6 0 1 2
After:  [1, 3, 3, 3]

Before: [0, 1, 2, 2]
2 1 0 0
After:  [1, 1, 2, 2]

Before: [2, 2, 2, 2]
3 1 3 0
After:  [1, 2, 2, 2]

Before: [0, 1, 3, 2]
2 1 0 3
After:  [0, 1, 3, 1]

Before: [2, 2, 3, 1]
13 1 0 1
After:  [2, 1, 3, 1]

Before: [2, 0, 2, 1]
7 3 1 0
After:  [1, 0, 2, 1]

Before: [1, 0, 3, 3]
12 0 2 0
After:  [3, 0, 3, 3]

Before: [0, 0, 3, 3]
10 0 1 3
After:  [0, 0, 3, 1]

Before: [0, 2, 0, 2]
9 0 0 0
After:  [0, 2, 0, 2]

Before: [1, 2, 0, 3]
11 0 3 0
After:  [0, 2, 0, 3]

Before: [2, 0, 0, 3]
11 0 3 0
After:  [0, 0, 0, 3]

Before: [0, 2, 0, 2]
3 1 3 0
After:  [1, 2, 0, 2]

Before: [1, 3, 1, 3]
6 0 1 1
After:  [1, 3, 1, 3]

Before: [0, 1, 3, 2]
2 1 0 2
After:  [0, 1, 1, 2]

Before: [1, 0, 3, 1]
1 1 0 2
After:  [1, 0, 1, 1]

Before: [1, 0, 2, 0]
7 0 1 1
After:  [1, 1, 2, 0]

Before: [2, 3, 1, 3]
15 0 3 3
After:  [2, 3, 1, 3]

Before: [1, 2, 0, 3]
11 0 3 1
After:  [1, 0, 0, 3]

Before: [1, 3, 0, 1]
6 0 1 0
After:  [3, 3, 0, 1]

Before: [2, 2, 1, 2]
3 1 3 2
After:  [2, 2, 1, 2]

Before: [1, 0, 3, 3]
1 1 0 2
After:  [1, 0, 1, 3]

Before: [3, 1, 0, 3]
5 1 3 2
After:  [3, 1, 3, 3]

Before: [0, 1, 2, 3]
8 2 1 1
After:  [0, 3, 2, 3]

Before: [0, 2, 2, 2]
3 1 3 1
After:  [0, 1, 2, 2]

Before: [1, 1, 2, 2]
0 0 3 1
After:  [1, 2, 2, 2]

Before: [2, 3, 1, 3]
11 0 3 1
After:  [2, 0, 1, 3]

Before: [3, 3, 2, 3]
4 1 2 0
After:  [1, 3, 2, 3]

Before: [3, 1, 3, 3]
5 1 3 2
After:  [3, 1, 3, 3]

Before: [2, 2, 1, 0]
13 1 1 1
After:  [2, 1, 1, 0]

Before: [0, 1, 3, 2]
2 1 0 0
After:  [1, 1, 3, 2]

Before: [3, 2, 0, 3]
15 1 3 0
After:  [3, 2, 0, 3]

Before: [2, 3, 0, 2]
0 1 0 0
After:  [6, 3, 0, 2]

Before: [2, 3, 0, 2]
4 1 0 1
After:  [2, 1, 0, 2]

Before: [1, 0, 1, 2]
1 1 0 3
After:  [1, 0, 1, 1]

Before: [2, 3, 3, 2]
0 3 2 1
After:  [2, 6, 3, 2]

Before: [0, 1, 3, 1]
2 1 0 3
After:  [0, 1, 3, 1]

Before: [2, 0, 0, 3]
15 0 3 3
After:  [2, 0, 0, 3]

Before: [2, 1, 3, 3]
5 1 3 3
After:  [2, 1, 3, 3]

Before: [3, 1, 3, 2]
12 1 2 3
After:  [3, 1, 3, 3]

Before: [0, 2, 1, 2]
3 1 3 1
After:  [0, 1, 1, 2]

Before: [0, 1, 0, 0]
2 1 0 3
After:  [0, 1, 0, 1]

Before: [0, 2, 3, 1]
14 3 2 0
After:  [3, 2, 3, 1]

Before: [3, 2, 2, 1]
13 1 1 1
After:  [3, 1, 2, 1]

Before: [3, 3, 1, 3]
6 2 0 3
After:  [3, 3, 1, 3]

Before: [3, 0, 3, 1]
14 3 2 3
After:  [3, 0, 3, 3]

Before: [2, 3, 2, 3]
11 0 3 0
After:  [0, 3, 2, 3]

Before: [2, 0, 1, 3]
5 2 3 2
After:  [2, 0, 3, 3]

Before: [1, 3, 1, 3]
11 0 3 1
After:  [1, 0, 1, 3]

Before: [1, 0, 1, 1]
7 3 1 1
After:  [1, 1, 1, 1]

Before: [1, 2, 2, 1]
14 3 2 0
After:  [3, 2, 2, 1]

Before: [1, 0, 2, 3]
8 1 2 1
After:  [1, 2, 2, 3]

Before: [1, 0, 1, 0]
7 2 1 0
After:  [1, 0, 1, 0]

Before: [2, 2, 1, 0]
13 1 1 2
After:  [2, 2, 1, 0]

Before: [1, 0, 1, 2]
7 2 1 2
After:  [1, 0, 1, 2]

Before: [2, 2, 2, 2]
3 1 3 2
After:  [2, 2, 1, 2]

Before: [2, 1, 0, 3]
11 0 3 1
After:  [2, 0, 0, 3]

Before: [2, 1, 2, 3]
11 0 3 1
After:  [2, 0, 2, 3]

Before: [0, 0, 1, 1]
7 3 1 1
After:  [0, 1, 1, 1]

Before: [1, 1, 0, 2]
14 3 1 1
After:  [1, 3, 0, 2]

Before: [1, 0, 1, 0]
7 0 1 3
After:  [1, 0, 1, 1]

Before: [0, 1, 2, 2]
8 3 2 1
After:  [0, 4, 2, 2]

Before: [1, 3, 0, 2]
6 0 1 0
After:  [3, 3, 0, 2]

Before: [1, 0, 1, 2]
7 0 1 0
After:  [1, 0, 1, 2]

Before: [3, 0, 3, 1]
7 3 1 2
After:  [3, 0, 1, 1]

Before: [0, 2, 0, 0]
9 0 0 0
After:  [0, 2, 0, 0]

Before: [1, 1, 2, 3]
8 1 2 2
After:  [1, 1, 3, 3]

Before: [0, 1, 2, 1]
2 1 0 1
After:  [0, 1, 2, 1]

Before: [1, 3, 3, 3]
11 0 3 1
After:  [1, 0, 3, 3]

Before: [3, 3, 1, 0]
6 2 0 0
After:  [3, 3, 1, 0]

Before: [2, 2, 0, 3]
11 0 3 3
After:  [2, 2, 0, 0]

Before: [3, 0, 1, 0]
7 2 1 0
After:  [1, 0, 1, 0]

Before: [1, 0, 3, 3]
1 1 0 0
After:  [1, 0, 3, 3]

Before: [1, 3, 3, 1]
14 3 2 3
After:  [1, 3, 3, 3]

Before: [2, 2, 0, 0]
13 1 0 1
After:  [2, 1, 0, 0]

Before: [2, 2, 2, 3]
15 2 3 0
After:  [3, 2, 2, 3]

Before: [3, 3, 0, 3]
0 0 0 3
After:  [3, 3, 0, 9]

Before: [2, 2, 1, 3]
15 1 3 0
After:  [3, 2, 1, 3]

Before: [2, 1, 3, 2]
0 2 0 3
After:  [2, 1, 3, 6]

Before: [0, 1, 1, 3]
2 1 0 2
After:  [0, 1, 1, 3]

Before: [2, 0, 1, 1]
7 2 1 0
After:  [1, 0, 1, 1]

Before: [1, 0, 2, 3]
8 1 3 2
After:  [1, 0, 3, 3]

Before: [0, 1, 0, 3]
2 1 0 1
After:  [0, 1, 0, 3]

Before: [0, 1, 2, 2]
2 1 0 3
After:  [0, 1, 2, 1]

Before: [1, 0, 1, 3]
1 1 0 3
After:  [1, 0, 1, 1]

Before: [2, 3, 1, 3]
4 1 0 3
After:  [2, 3, 1, 1]

Before: [2, 3, 2, 1]
4 1 0 3
After:  [2, 3, 2, 1]

Before: [1, 1, 1, 2]
0 0 3 0
After:  [2, 1, 1, 2]

Before: [0, 0, 0, 1]
9 0 0 0
After:  [0, 0, 0, 1]

Before: [1, 0, 3, 3]
5 0 3 1
After:  [1, 3, 3, 3]

Before: [0, 1, 1, 0]
2 1 0 3
After:  [0, 1, 1, 1]

Before: [1, 2, 1, 3]
10 1 0 3
After:  [1, 2, 1, 1]

Before: [0, 2, 0, 2]
3 1 3 2
After:  [0, 2, 1, 2]

Before: [2, 2, 1, 2]
3 1 3 3
After:  [2, 2, 1, 1]

Before: [2, 1, 3, 2]
12 1 2 3
After:  [2, 1, 3, 3]

Before: [2, 1, 2, 3]
15 2 3 3
After:  [2, 1, 2, 3]

Before: [0, 1, 2, 2]
9 0 0 2
After:  [0, 1, 0, 2]

Before: [0, 2, 2, 2]
8 0 2 0
After:  [2, 2, 2, 2]

Before: [0, 3, 2, 3]
4 1 2 0
After:  [1, 3, 2, 3]

Before: [1, 1, 3, 2]
8 0 3 0
After:  [3, 1, 3, 2]

Before: [1, 1, 3, 1]
12 1 2 1
After:  [1, 3, 3, 1]

Before: [2, 1, 1, 3]
5 1 3 3
After:  [2, 1, 1, 3]

Before: [3, 1, 1, 2]
6 1 0 1
After:  [3, 3, 1, 2]

Before: [1, 2, 2, 3]
15 2 3 0
After:  [3, 2, 2, 3]

Before: [3, 1, 3, 2]
6 1 0 1
After:  [3, 3, 3, 2]

Before: [2, 2, 0, 2]
3 1 3 1
After:  [2, 1, 0, 2]

Before: [3, 0, 1, 3]
5 2 3 3
After:  [3, 0, 1, 3]

Before: [3, 3, 1, 2]
8 2 3 2
After:  [3, 3, 3, 2]

Before: [2, 1, 2, 0]
8 3 2 2
After:  [2, 1, 2, 0]

Before: [1, 2, 3, 0]
12 0 2 2
After:  [1, 2, 3, 0]

Before: [3, 2, 0, 2]
3 1 3 1
After:  [3, 1, 0, 2]

Before: [1, 2, 1, 3]
5 0 3 2
After:  [1, 2, 3, 3]

Before: [0, 1, 0, 3]
9 0 0 0
After:  [0, 1, 0, 3]

Before: [1, 2, 3, 3]
10 1 0 2
After:  [1, 2, 1, 3]

Before: [2, 2, 1, 1]
13 1 0 3
After:  [2, 2, 1, 1]

Before: [2, 0, 2, 3]
15 2 3 0
After:  [3, 0, 2, 3]

Before: [2, 0, 0, 1]
10 1 3 1
After:  [2, 1, 0, 1]

Before: [1, 0, 2, 1]
1 1 0 1
After:  [1, 1, 2, 1]

Before: [3, 0, 1, 3]
10 1 2 3
After:  [3, 0, 1, 1]

Before: [1, 1, 3, 3]
5 1 3 1
After:  [1, 3, 3, 3]

Before: [1, 1, 2, 3]
5 0 3 3
After:  [1, 1, 2, 3]

Before: [3, 0, 1, 0]
6 2 0 3
After:  [3, 0, 1, 3]

Before: [1, 2, 0, 0]
10 1 0 3
After:  [1, 2, 0, 1]

Before: [0, 1, 0, 2]
2 1 0 0
After:  [1, 1, 0, 2]

Before: [0, 1, 2, 0]
9 0 0 1
After:  [0, 0, 2, 0]

Before: [1, 1, 0, 3]
8 2 3 1
After:  [1, 3, 0, 3]

Before: [2, 3, 1, 3]
4 1 0 1
After:  [2, 1, 1, 3]

Before: [0, 1, 3, 3]
9 0 0 3
After:  [0, 1, 3, 0]

Before: [0, 0, 1, 3]
10 0 1 0
After:  [1, 0, 1, 3]

Before: [2, 0, 1, 1]
10 1 3 3
After:  [2, 0, 1, 1]

Before: [3, 3, 0, 0]
0 0 1 1
After:  [3, 9, 0, 0]

Before: [1, 3, 2, 0]
4 1 2 0
After:  [1, 3, 2, 0]

Before: [0, 1, 1, 3]
9 0 0 0
After:  [0, 1, 1, 3]

Before: [0, 1, 2, 0]
2 1 0 2
After:  [0, 1, 1, 0]

Before: [2, 3, 3, 0]
0 2 1 1
After:  [2, 9, 3, 0]

Before: [0, 0, 1, 2]
10 1 2 3
After:  [0, 0, 1, 1]

Before: [2, 2, 0, 2]
13 1 0 3
After:  [2, 2, 0, 1]

Before: [1, 0, 1, 1]
10 1 2 0
After:  [1, 0, 1, 1]

Before: [3, 3, 2, 2]
13 1 0 1
After:  [3, 1, 2, 2]

Before: [1, 0, 2, 1]
8 0 2 1
After:  [1, 3, 2, 1]

Before: [1, 1, 2, 2]
8 2 2 2
After:  [1, 1, 4, 2]

Before: [0, 0, 1, 3]
5 2 3 3
After:  [0, 0, 1, 3]

Before: [2, 3, 1, 0]
6 2 1 3
After:  [2, 3, 1, 3]

Before: [1, 3, 1, 0]
6 2 1 3
After:  [1, 3, 1, 3]

Before: [1, 0, 2, 3]
7 0 1 2
After:  [1, 0, 1, 3]

Before: [2, 0, 3, 1]
0 3 0 0
After:  [2, 0, 3, 1]

Before: [2, 2, 3, 2]
3 1 3 3
After:  [2, 2, 3, 1]

Before: [0, 1, 0, 3]
2 1 0 2
After:  [0, 1, 1, 3]

Before: [3, 1, 1, 3]
6 1 0 1
After:  [3, 3, 1, 3]

Before: [1, 2, 2, 3]
13 1 1 1
After:  [1, 1, 2, 3]

Before: [2, 2, 1, 3]
15 0 3 2
After:  [2, 2, 3, 3]

Before: [1, 0, 0, 0]
1 1 0 1
After:  [1, 1, 0, 0]

Before: [2, 2, 0, 3]
11 0 3 0
After:  [0, 2, 0, 3]

Before: [1, 0, 3, 2]
1 1 0 0
After:  [1, 0, 3, 2]

Before: [1, 0, 3, 0]
1 1 0 1
After:  [1, 1, 3, 0]

Before: [0, 2, 2, 0]
9 0 0 3
After:  [0, 2, 2, 0]

Before: [0, 3, 3, 3]
0 3 1 0
After:  [9, 3, 3, 3]

Before: [3, 2, 1, 2]
3 1 3 2
After:  [3, 2, 1, 2]

Before: [3, 1, 2, 2]
14 3 1 3
After:  [3, 1, 2, 3]

Before: [3, 1, 3, 1]
12 1 2 1
After:  [3, 3, 3, 1]

Before: [3, 3, 3, 3]
0 3 0 0
After:  [9, 3, 3, 3]

Before: [1, 3, 3, 2]
12 0 2 2
After:  [1, 3, 3, 2]

Before: [2, 0, 1, 3]
11 0 3 1
After:  [2, 0, 1, 3]

Before: [1, 0, 1, 0]
1 1 0 2
After:  [1, 0, 1, 0]

Before: [1, 2, 0, 2]
3 1 3 0
After:  [1, 2, 0, 2]

Before: [1, 0, 1, 3]
11 0 3 2
After:  [1, 0, 0, 3]

Before: [2, 0, 2, 1]
7 3 1 3
After:  [2, 0, 2, 1]

Before: [0, 2, 3, 2]
3 1 3 2
After:  [0, 2, 1, 2]

Before: [3, 1, 2, 1]
14 3 2 3
After:  [3, 1, 2, 3]

Before: [1, 0, 2, 3]
1 1 0 1
After:  [1, 1, 2, 3]

Before: [0, 1, 3, 1]
2 1 0 1
After:  [0, 1, 3, 1]

Before: [1, 0, 2, 0]
1 1 0 3
After:  [1, 0, 2, 1]

Before: [1, 2, 0, 3]
13 1 1 3
After:  [1, 2, 0, 1]

Before: [0, 2, 2, 2]
9 0 0 3
After:  [0, 2, 2, 0]

Before: [0, 2, 0, 1]
13 1 1 3
After:  [0, 2, 0, 1]

Before: [1, 2, 2, 3]
13 1 1 0
After:  [1, 2, 2, 3]

Before: [1, 0, 1, 2]
7 0 1 3
After:  [1, 0, 1, 1]

Before: [2, 3, 2, 3]
15 2 3 3
After:  [2, 3, 2, 3]

Before: [2, 3, 0, 3]
4 1 0 1
After:  [2, 1, 0, 3]

Before: [1, 0, 0, 1]
7 0 1 0
After:  [1, 0, 0, 1]

Before: [0, 1, 3, 2]
12 1 2 3
After:  [0, 1, 3, 3]

Before: [2, 2, 1, 3]
11 0 3 1
After:  [2, 0, 1, 3]

Before: [0, 3, 2, 2]
0 2 1 3
After:  [0, 3, 2, 6]

Before: [3, 0, 3, 1]
14 3 2 1
After:  [3, 3, 3, 1]

Before: [3, 3, 2, 0]
4 1 2 0
After:  [1, 3, 2, 0]

Before: [2, 0, 3, 3]
15 0 3 3
After:  [2, 0, 3, 3]

Before: [1, 0, 2, 0]
1 1 0 0
After:  [1, 0, 2, 0]

Before: [2, 3, 1, 1]
6 2 1 0
After:  [3, 3, 1, 1]

Before: [0, 1, 0, 0]
2 1 0 0
After:  [1, 1, 0, 0]

Before: [0, 2, 1, 2]
9 0 0 2
After:  [0, 2, 0, 2]

Before: [0, 2, 2, 1]
14 3 2 3
After:  [0, 2, 2, 3]

Before: [2, 3, 2, 1]
4 1 2 0
After:  [1, 3, 2, 1]

Before: [3, 3, 0, 3]
8 2 3 1
After:  [3, 3, 0, 3]

Before: [3, 3, 3, 0]
13 1 0 0
After:  [1, 3, 3, 0]

Before: [1, 3, 0, 3]
0 3 1 0
After:  [9, 3, 0, 3]

Before: [1, 0, 1, 0]
1 1 0 3
After:  [1, 0, 1, 1]

Before: [0, 0, 1, 3]
5 2 3 1
After:  [0, 3, 1, 3]

Before: [3, 1, 3, 2]
12 1 2 1
After:  [3, 3, 3, 2]

Before: [1, 3, 2, 1]
6 0 1 3
After:  [1, 3, 2, 3]

Before: [2, 0, 2, 1]
8 0 2 1
After:  [2, 4, 2, 1]

Before: [2, 0, 2, 2]
8 1 2 2
After:  [2, 0, 2, 2]

Before: [0, 0, 1, 1]
7 3 1 2
After:  [0, 0, 1, 1]

Before: [3, 0, 2, 2]
8 1 2 1
After:  [3, 2, 2, 2]

Before: [3, 1, 3, 3]
5 1 3 3
After:  [3, 1, 3, 3]

Before: [0, 1, 0, 2]
9 0 0 0
After:  [0, 1, 0, 2]

Before: [3, 1, 2, 2]
6 1 0 0
After:  [3, 1, 2, 2]

Before: [3, 0, 1, 0]
6 2 0 0
After:  [3, 0, 1, 0]

Before: [0, 1, 1, 1]
9 0 0 2
After:  [0, 1, 0, 1]

Before: [1, 2, 0, 3]
15 1 3 2
After:  [1, 2, 3, 3]

Before: [2, 3, 1, 0]
4 1 0 2
After:  [2, 3, 1, 0]

Before: [2, 1, 2, 2]
14 3 1 1
After:  [2, 3, 2, 2]

Before: [3, 2, 0, 3]
15 1 3 3
After:  [3, 2, 0, 3]

Before: [1, 3, 0, 0]
6 0 1 0
After:  [3, 3, 0, 0]

Before: [0, 1, 1, 3]
2 1 0 0
After:  [1, 1, 1, 3]

Before: [0, 3, 3, 1]
14 3 2 0
After:  [3, 3, 3, 1]

Before: [1, 3, 3, 3]
13 1 2 1
After:  [1, 1, 3, 3]

Before: [0, 3, 2, 0]
4 1 2 1
After:  [0, 1, 2, 0]

Before: [1, 0, 3, 1]
12 0 2 0
After:  [3, 0, 3, 1]

Before: [1, 1, 2, 2]
14 3 1 2
After:  [1, 1, 3, 2]

Before: [2, 1, 1, 3]
5 2 3 2
After:  [2, 1, 3, 3]

Before: [0, 2, 2, 3]
15 1 3 1
After:  [0, 3, 2, 3]

Before: [3, 3, 2, 2]
4 1 2 3
After:  [3, 3, 2, 1]

Before: [0, 1, 3, 1]
9 0 0 2
After:  [0, 1, 0, 1]

Before: [3, 1, 1, 3]
5 2 3 0
After:  [3, 1, 1, 3]

Before: [1, 0, 1, 3]
1 1 0 1
After:  [1, 1, 1, 3]

Before: [1, 0, 0, 3]
1 1 0 2
After:  [1, 0, 1, 3]

Before: [3, 2, 1, 2]
3 1 3 1
After:  [3, 1, 1, 2]

Before: [3, 2, 3, 3]
15 1 3 0
After:  [3, 2, 3, 3]

Before: [1, 2, 3, 3]
0 2 2 2
After:  [1, 2, 9, 3]

Before: [3, 0, 0, 1]
7 3 1 3
After:  [3, 0, 0, 1]

Before: [0, 1, 0, 1]
2 1 0 1
After:  [0, 1, 0, 1]

Before: [2, 1, 1, 3]
5 2 3 0
After:  [3, 1, 1, 3]

Before: [0, 1, 1, 2]
2 1 0 1
After:  [0, 1, 1, 2]

Before: [0, 0, 2, 3]
9 0 0 0
After:  [0, 0, 2, 3]

Before: [0, 2, 1, 2]
8 2 3 3
After:  [0, 2, 1, 3]

Before: [1, 0, 1, 1]
1 1 0 3
After:  [1, 0, 1, 1]

Before: [1, 0, 1, 3]
8 1 3 0
After:  [3, 0, 1, 3]

Before: [3, 1, 3, 2]
14 3 1 0
After:  [3, 1, 3, 2]

Before: [2, 2, 0, 0]
13 1 0 2
After:  [2, 2, 1, 0]

Before: [3, 1, 3, 1]
12 1 2 0
After:  [3, 1, 3, 1]

Before: [0, 3, 3, 0]
13 1 2 1
After:  [0, 1, 3, 0]

Before: [3, 1, 3, 3]
12 1 2 0
After:  [3, 1, 3, 3]

Before: [1, 2, 2, 3]
8 0 2 1
After:  [1, 3, 2, 3]

Before: [3, 0, 1, 0]
7 2 1 3
After:  [3, 0, 1, 1]

Before: [0, 1, 2, 3]
2 1 0 3
After:  [0, 1, 2, 1]

Before: [0, 0, 1, 0]
9 0 0 1
After:  [0, 0, 1, 0]

Before: [3, 2, 3, 1]
13 1 1 1
After:  [3, 1, 3, 1]

Before: [2, 2, 0, 2]
3 1 3 2
After:  [2, 2, 1, 2]

Before: [3, 3, 3, 2]
0 2 0 0
After:  [9, 3, 3, 2]

Before: [0, 0, 2, 3]
10 0 1 1
After:  [0, 1, 2, 3]

Before: [2, 3, 2, 2]
8 0 2 3
After:  [2, 3, 2, 4]

Before: [3, 3, 2, 1]
14 3 2 1
After:  [3, 3, 2, 1]

Before: [0, 0, 1, 1]
9 0 0 1
After:  [0, 0, 1, 1]

Before: [0, 2, 2, 2]
3 1 3 0
After:  [1, 2, 2, 2]

Before: [2, 2, 1, 2]
3 1 3 1
After:  [2, 1, 1, 2]

Before: [2, 1, 2, 3]
11 0 3 2
After:  [2, 1, 0, 3]

Before: [1, 2, 2, 2]
3 1 3 2
After:  [1, 2, 1, 2]

Before: [1, 3, 2, 0]
4 1 2 2
After:  [1, 3, 1, 0]

Before: [1, 1, 3, 3]
12 1 2 2
After:  [1, 1, 3, 3]

Before: [1, 2, 0, 3]
15 1 3 3
After:  [1, 2, 0, 3]

Before: [1, 2, 3, 3]
12 0 2 3
After:  [1, 2, 3, 3]

Before: [0, 2, 1, 2]
3 1 3 2
After:  [0, 2, 1, 2]

Before: [1, 1, 1, 2]
8 1 3 1
After:  [1, 3, 1, 2]

Before: [1, 1, 2, 1]
14 3 2 1
After:  [1, 3, 2, 1]

Before: [1, 0, 1, 1]
1 1 0 0
After:  [1, 0, 1, 1]

Before: [2, 1, 1, 3]
15 0 3 0
After:  [3, 1, 1, 3]

Before: [2, 1, 1, 3]
11 0 3 1
After:  [2, 0, 1, 3]

Before: [2, 3, 1, 3]
11 0 3 0
After:  [0, 3, 1, 3]

Before: [0, 3, 1, 1]
9 0 0 0
After:  [0, 3, 1, 1]

Before: [1, 0, 2, 1]
7 0 1 2
After:  [1, 0, 1, 1]

Before: [1, 0, 0, 0]
1 1 0 2
After:  [1, 0, 1, 0]

Before: [1, 0, 2, 1]
1 1 0 0
After:  [1, 0, 2, 1]

Before: [0, 3, 3, 0]
13 1 2 2
After:  [0, 3, 1, 0]

Before: [3, 2, 0, 2]
0 0 0 2
After:  [3, 2, 9, 2]

Before: [2, 1, 2, 3]
5 1 3 0
After:  [3, 1, 2, 3]

Before: [2, 2, 2, 2]
3 1 3 3
After:  [2, 2, 2, 1]

Before: [1, 3, 2, 3]
5 0 3 1
After:  [1, 3, 2, 3]

Before: [2, 1, 3, 2]
0 1 0 0
After:  [2, 1, 3, 2]

Before: [1, 0, 0, 1]
1 1 0 2
After:  [1, 0, 1, 1]

Before: [3, 3, 3, 0]
0 2 2 0
After:  [9, 3, 3, 0]

Before: [2, 2, 3, 3]
15 0 3 3
After:  [2, 2, 3, 3]

Before: [0, 3, 2, 3]
15 2 3 2
After:  [0, 3, 3, 3]

Before: [1, 2, 0, 2]
13 1 1 1
After:  [1, 1, 0, 2]

Before: [0, 3, 1, 1]
9 0 0 2
After:  [0, 3, 0, 1]

Before: [0, 1, 2, 2]
8 2 2 3
After:  [0, 1, 2, 4]

Before: [0, 0, 2, 1]
9 0 0 1
After:  [0, 0, 2, 1]

Before: [2, 3, 0, 3]
4 1 0 2
After:  [2, 3, 1, 3]

Before: [1, 0, 2, 2]
7 0 1 0
After:  [1, 0, 2, 2]

Before: [3, 1, 3, 3]
0 3 2 0
After:  [9, 1, 3, 3]

Before: [2, 3, 2, 3]
11 0 3 1
After:  [2, 0, 2, 3]

Before: [1, 0, 3, 0]
7 0 1 0
After:  [1, 0, 3, 0]

Before: [1, 3, 2, 3]
15 2 3 0
After:  [3, 3, 2, 3]

Before: [1, 3, 3, 0]
6 0 1 0
After:  [3, 3, 3, 0]

Before: [3, 0, 1, 2]
7 2 1 1
After:  [3, 1, 1, 2]

Before: [0, 3, 1, 1]
6 2 1 1
After:  [0, 3, 1, 1]

Before: [3, 3, 3, 0]
0 2 1 3
After:  [3, 3, 3, 9]

Before: [3, 2, 1, 1]
6 2 0 3
After:  [3, 2, 1, 3]

Before: [1, 0, 3, 0]
12 0 2 0
After:  [3, 0, 3, 0]

Before: [1, 2, 1, 0]
10 1 0 2
After:  [1, 2, 1, 0]

Before: [1, 3, 2, 1]
0 1 1 1
After:  [1, 9, 2, 1]

Before: [2, 3, 1, 3]
11 0 3 2
After:  [2, 3, 0, 3]

Before: [0, 1, 1, 0]
2 1 0 0
After:  [1, 1, 1, 0]

Before: [2, 2, 3, 3]
15 1 3 1
After:  [2, 3, 3, 3]

Before: [2, 3, 0, 1]
0 3 0 1
After:  [2, 2, 0, 1]

Before: [1, 0, 1, 0]
1 1 0 0
After:  [1, 0, 1, 0]

Before: [2, 2, 0, 0]
13 1 1 2
After:  [2, 2, 1, 0]

Before: [2, 0, 3, 1]
14 3 2 0
After:  [3, 0, 3, 1]

Before: [2, 1, 3, 1]
14 3 2 2
After:  [2, 1, 3, 1]

Before: [3, 3, 1, 3]
6 2 1 2
After:  [3, 3, 3, 3]

Before: [1, 2, 1, 2]
3 1 3 1
After:  [1, 1, 1, 2]

Before: [1, 2, 2, 3]
10 1 0 0
After:  [1, 2, 2, 3]

Before: [0, 1, 3, 3]
5 1 3 2
After:  [0, 1, 3, 3]

Before: [2, 1, 2, 1]
14 3 2 3
After:  [2, 1, 2, 3]

Before: [3, 3, 2, 3]
4 1 2 3
After:  [3, 3, 2, 1]

Before: [1, 3, 2, 3]
11 0 3 0
After:  [0, 3, 2, 3]

Before: [1, 2, 0, 2]
0 0 3 1
After:  [1, 2, 0, 2]

Before: [2, 2, 2, 2]
13 1 0 3
After:  [2, 2, 2, 1]

Before: [1, 3, 2, 1]
6 0 1 1
After:  [1, 3, 2, 1]

Before: [1, 3, 2, 1]
14 3 2 0
After:  [3, 3, 2, 1]

Before: [2, 3, 3, 1]
14 3 2 0
After:  [3, 3, 3, 1]

Before: [1, 2, 1, 3]
5 2 3 0
After:  [3, 2, 1, 3]

Before: [1, 1, 3, 3]
11 0 3 1
After:  [1, 0, 3, 3]

Before: [3, 1, 2, 1]
6 1 0 3
After:  [3, 1, 2, 3]

Before: [1, 0, 1, 0]
7 0 1 2
After:  [1, 0, 1, 0]

Before: [3, 0, 1, 2]
8 2 3 0
After:  [3, 0, 1, 2]

Before: [2, 3, 0, 2]
4 1 0 3
After:  [2, 3, 0, 1]

Before: [0, 2, 2, 2]
8 1 2 0
After:  [4, 2, 2, 2]

Before: [3, 2, 2, 0]
8 3 2 1
After:  [3, 2, 2, 0]

Before: [2, 1, 2, 0]
8 0 2 1
After:  [2, 4, 2, 0]

Before: [3, 1, 3, 1]
14 3 2 2
After:  [3, 1, 3, 1]

Before: [3, 3, 1, 2]
0 0 0 3
After:  [3, 3, 1, 9]

Before: [2, 1, 0, 2]
0 1 0 3
After:  [2, 1, 0, 2]

Before: [3, 3, 1, 3]
0 0 0 2
After:  [3, 3, 9, 3]

Before: [1, 0, 2, 0]
1 1 0 1
After:  [1, 1, 2, 0]

Before: [1, 2, 1, 1]
10 1 0 0
After:  [1, 2, 1, 1]

Before: [1, 0, 1, 2]
1 1 0 1
After:  [1, 1, 1, 2]`

advent.test(part1, `Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`, 1)
advent.run(part1, input1);

var program = `5 1 0 0
12 0 2 0
5 0 0 2
12 2 3 2
5 0 0 3
12 3 1 3
0 3 0 0
5 0 3 0
8 0 1 1
2 1 1 3
14 2 3 2
14 0 2 1
14 1 1 0
2 0 2 0
5 0 1 0
8 3 0 3
2 3 3 1
14 2 1 3
14 1 1 2
14 2 0 0
3 0 3 2
5 2 1 2
5 2 3 2
8 1 2 1
2 1 1 3
5 2 0 1
12 1 2 1
14 1 1 0
14 2 3 2
2 0 2 2
5 2 3 2
8 3 2 3
2 3 0 2
14 1 1 1
5 2 0 0
12 0 2 0
14 2 1 3
14 3 0 3
5 3 1 3
8 2 3 2
5 0 0 3
12 3 2 3
14 1 0 0
14 0 3 1
8 0 0 0
5 0 1 0
8 2 0 2
2 2 3 1
14 0 3 3
14 0 0 2
14 3 0 0
7 0 2 2
5 2 2 2
8 1 2 1
2 1 0 2
14 2 0 3
14 2 3 1
14 2 2 0
3 0 3 3
5 3 3 3
8 3 2 2
2 2 1 0
14 0 0 1
5 2 0 2
12 2 0 2
14 1 0 3
12 3 1 3
5 3 1 3
8 3 0 0
2 0 2 2
14 1 3 3
14 2 2 0
14 2 0 1
4 0 3 3
5 3 1 3
5 3 3 3
8 2 3 2
2 2 0 1
14 0 1 0
14 2 3 2
14 0 3 3
11 3 2 3
5 3 3 3
8 3 1 1
2 1 3 2
14 2 2 3
14 1 1 1
14 2 2 0
0 1 0 1
5 1 1 1
8 2 1 2
2 2 2 3
5 1 0 1
12 1 3 1
14 0 2 2
13 0 1 1
5 1 3 1
8 1 3 3
5 1 0 0
12 0 3 0
14 2 3 1
14 2 0 2
9 0 1 0
5 0 1 0
5 0 3 0
8 3 0 3
2 3 1 2
14 0 3 1
5 3 0 3
12 3 1 3
14 0 3 0
14 3 0 0
5 0 1 0
8 2 0 2
14 1 2 1
14 2 3 0
4 0 3 1
5 1 3 1
8 2 1 2
2 2 3 3
14 3 0 0
14 0 2 2
14 3 1 1
1 2 0 0
5 0 1 0
8 0 3 3
2 3 0 2
14 3 2 3
5 0 0 0
12 0 2 0
14 1 2 1
9 3 0 0
5 0 1 0
8 0 2 2
2 2 1 3
14 0 2 2
14 0 1 1
14 3 0 0
1 2 0 0
5 0 2 0
8 0 3 3
2 3 0 0
14 2 1 3
14 2 2 1
10 2 3 1
5 1 2 1
8 0 1 0
14 3 3 1
10 2 3 3
5 3 3 3
8 3 0 0
2 0 1 3
14 1 2 0
14 2 3 2
2 0 2 2
5 2 1 2
8 3 2 3
2 3 1 1
14 3 0 3
14 2 0 2
2 0 2 0
5 0 1 0
5 0 1 0
8 0 1 1
14 2 1 0
14 2 0 3
5 2 0 2
12 2 0 2
10 2 3 2
5 2 3 2
8 2 1 1
5 1 0 3
12 3 3 3
14 0 2 2
14 3 3 0
1 2 0 3
5 3 1 3
8 3 1 1
2 1 2 3
14 3 2 2
14 2 2 0
14 1 1 1
6 0 2 1
5 1 1 1
8 3 1 3
2 3 2 1
5 3 0 2
12 2 2 2
14 1 2 0
14 0 3 3
2 0 2 3
5 3 3 3
8 3 1 1
5 0 0 2
12 2 0 2
14 0 0 3
8 0 0 3
5 3 3 3
8 3 1 1
14 2 0 3
0 0 3 2
5 2 1 2
5 2 2 2
8 1 2 1
14 0 2 2
14 3 0 0
1 2 0 2
5 2 3 2
8 2 1 1
2 1 1 0
14 2 1 2
14 3 3 1
14 3 1 3
13 2 1 1
5 1 1 1
8 1 0 0
2 0 0 1
14 0 1 2
14 3 0 0
14 1 1 3
1 2 0 2
5 2 1 2
5 2 2 2
8 1 2 1
2 1 1 0
14 3 0 2
14 0 2 1
5 3 2 3
5 3 3 3
8 3 0 0
2 0 0 2
14 2 1 3
14 1 2 1
14 2 0 0
3 0 3 1
5 1 1 1
8 1 2 2
2 2 3 1
14 2 0 2
14 1 2 3
4 0 3 0
5 0 1 0
8 0 1 1
14 1 1 0
2 0 2 2
5 2 3 2
8 2 1 1
14 3 2 3
14 2 0 0
14 3 1 2
6 0 2 2
5 2 3 2
8 2 1 1
2 1 0 0
14 2 3 2
14 1 2 1
14 0 1 3
11 3 2 2
5 2 3 2
8 0 2 0
2 0 0 1
14 1 0 0
14 3 1 3
14 3 3 2
14 2 3 2
5 2 3 2
5 2 2 2
8 1 2 1
2 1 2 2
14 2 2 0
5 1 0 3
12 3 1 3
14 2 1 1
8 3 3 1
5 1 3 1
5 1 2 1
8 2 1 2
14 3 3 1
5 3 0 0
12 0 1 0
8 0 0 3
5 3 1 3
5 3 3 3
8 3 2 2
2 2 2 1
5 2 0 2
12 2 0 2
14 2 0 3
5 1 0 0
12 0 2 0
3 0 3 2
5 2 3 2
8 2 1 1
14 0 3 2
14 1 2 0
0 0 3 3
5 3 1 3
8 3 1 1
2 1 1 3
14 1 0 2
14 1 0 1
8 1 0 0
5 0 3 0
8 0 3 3
14 1 3 0
14 2 0 2
14 3 3 1
2 0 2 0
5 0 1 0
8 3 0 3
2 3 3 1
14 0 0 3
14 3 1 2
14 1 2 0
10 3 2 0
5 0 3 0
5 0 2 0
8 1 0 1
14 2 2 0
5 2 0 2
12 2 1 2
14 2 0 3
3 0 3 0
5 0 3 0
8 0 1 1
2 1 3 0
14 3 3 2
5 2 0 1
12 1 0 1
14 3 1 3
7 3 2 2
5 2 3 2
8 2 0 0
2 0 3 1
14 0 1 0
14 2 2 3
14 0 0 2
10 2 3 0
5 0 3 0
5 0 3 0
8 0 1 1
2 1 3 0
5 0 0 1
12 1 2 1
14 3 0 3
7 3 2 1
5 1 3 1
8 1 0 0
2 0 3 1
5 3 0 0
12 0 3 0
14 1 1 3
5 1 0 2
12 2 3 2
5 3 2 0
5 0 1 0
8 0 1 1
2 1 3 3
14 3 2 1
14 2 1 0
1 0 2 0
5 0 3 0
8 3 0 3
2 3 1 1
14 1 0 0
14 0 1 3
14 2 0 2
2 0 2 0
5 0 1 0
8 0 1 1
2 1 0 0
5 3 0 1
12 1 3 1
11 3 2 2
5 2 1 2
8 2 0 0
14 3 1 2
14 2 0 1
14 2 3 3
15 1 3 2
5 2 1 2
8 2 0 0
2 0 3 3
14 3 3 1
14 2 1 0
5 2 0 2
12 2 2 2
9 1 0 1
5 1 3 1
5 1 1 1
8 3 1 3
2 3 0 2
14 1 3 1
14 1 3 0
14 2 1 3
8 1 0 0
5 0 3 0
8 0 2 2
2 2 2 3
5 3 0 1
12 1 2 1
14 0 0 2
5 3 0 0
12 0 1 0
5 0 2 0
5 0 3 0
8 3 0 3
2 3 1 1
14 2 2 0
14 2 0 3
14 3 3 2
6 0 2 0
5 0 2 0
8 0 1 1
2 1 2 2
14 0 1 3
14 1 1 0
14 3 0 1
12 0 1 3
5 3 3 3
8 2 3 2
2 2 3 3
5 3 0 0
12 0 2 0
14 0 2 2
14 1 1 1
0 1 0 0
5 0 3 0
8 0 3 3
2 3 3 2
14 2 0 0
14 2 0 3
5 2 0 1
12 1 3 1
13 0 1 0
5 0 1 0
5 0 2 0
8 2 0 2
2 2 3 3
14 2 1 2
14 1 1 0
14 2 1 1
2 0 2 1
5 1 3 1
8 1 3 3
5 2 0 2
12 2 3 2
5 3 0 1
12 1 3 1
14 0 2 0
7 1 2 2
5 2 3 2
8 2 3 3
2 3 0 1
14 1 2 3
14 3 0 2
5 3 2 0
5 0 1 0
8 0 1 1
5 0 0 3
12 3 2 3
14 1 1 0
14 1 1 2
0 0 3 0
5 0 3 0
8 0 1 1
2 1 1 2
14 0 2 1
14 2 1 0
3 0 3 0
5 0 2 0
8 2 0 2
2 2 1 0
5 0 0 2
12 2 2 2
14 3 0 1
5 3 0 3
12 3 0 3
15 2 3 2
5 2 2 2
8 2 0 0
2 0 3 2
14 1 2 1
14 2 3 0
14 3 1 3
9 3 0 3
5 3 3 3
8 2 3 2
5 0 0 1
12 1 3 1
14 1 0 3
4 0 3 3
5 3 3 3
5 3 1 3
8 3 2 2
2 2 0 1
14 2 1 3
5 3 0 2
12 2 0 2
14 3 2 0
10 2 3 3
5 3 2 3
8 1 3 1
2 1 2 0
14 1 3 2
5 1 0 3
12 3 0 3
14 0 2 1
14 3 2 2
5 2 1 2
5 2 2 2
8 0 2 0
14 1 3 1
14 0 3 2
5 1 2 1
5 1 2 1
5 1 1 1
8 1 0 0
5 1 0 2
12 2 3 2
14 2 3 1
6 1 2 2
5 2 1 2
8 2 0 0
2 0 2 3
14 1 2 0
14 0 2 2
5 0 2 2
5 2 3 2
8 2 3 3
14 0 3 1
5 2 0 2
12 2 2 2
2 0 2 2
5 2 2 2
8 3 2 3
2 3 0 0
14 2 0 2
14 1 2 1
14 0 2 3
15 2 3 3
5 3 1 3
8 3 0 0
2 0 1 1
14 2 0 3
14 1 3 0
14 1 1 2
0 0 3 2
5 2 2 2
8 2 1 1
2 1 0 3
5 3 0 1
12 1 1 1
14 3 3 2
5 0 2 2
5 2 3 2
8 3 2 3
2 3 2 1
14 0 2 3
5 0 0 0
12 0 2 0
14 3 1 2
6 0 2 3
5 3 3 3
8 3 1 1
2 1 2 3
14 1 3 1
14 2 2 2
0 1 0 0
5 0 1 0
8 0 3 3
14 2 3 0
14 3 2 2
1 0 2 2
5 2 2 2
8 2 3 3
2 3 0 1
14 1 3 2
14 1 0 3
14 1 3 0
8 0 0 3
5 3 1 3
5 3 3 3
8 3 1 1
2 1 3 3
14 3 0 1
14 2 2 2
14 3 2 0
6 2 0 2
5 2 1 2
5 2 3 2
8 2 3 3
2 3 3 1
14 2 3 2
5 2 0 3
12 3 0 3
11 3 2 2
5 2 2 2
8 1 2 1
14 3 0 2
10 3 2 3
5 3 2 3
5 3 3 3
8 3 1 1
2 1 2 3
14 2 2 2
14 3 0 1
6 2 0 0
5 0 1 0
5 0 3 0
8 0 3 3
2 3 2 1
14 2 1 0
14 1 1 3
14 1 2 2
4 0 3 2
5 2 3 2
8 1 2 1
2 1 1 2
14 0 2 3
14 3 2 1
15 0 3 1
5 1 2 1
5 1 2 1
8 1 2 2
14 3 1 0
14 1 3 3
14 0 2 1
12 3 1 3
5 3 2 3
5 3 1 3
8 2 3 2
2 2 1 1
14 0 1 0
14 3 0 3
14 3 3 2
14 2 3 3
5 3 2 3
5 3 3 3
8 3 1 1
14 3 3 3
14 2 1 0
14 0 1 2
14 2 3 3
5 3 2 3
8 1 3 1
2 1 2 3
14 3 3 2
14 3 3 0
14 2 2 1
6 1 0 1
5 1 3 1
8 1 3 3
2 3 2 1
14 3 2 3
14 2 0 2
13 2 0 2
5 2 1 2
8 2 1 1
2 1 2 0
14 1 0 3
14 3 3 1
14 3 3 2
14 2 1 1
5 1 1 1
5 1 2 1
8 0 1 0
2 0 3 3
5 0 0 1
12 1 1 1
14 0 1 2
14 3 0 0
1 2 0 1
5 1 1 1
5 1 2 1
8 3 1 3
2 3 1 1
5 2 0 2
12 2 2 2
14 3 1 3
6 2 0 3
5 3 3 3
5 3 2 3
8 1 3 1
5 3 0 2
12 2 0 2
14 2 1 3
5 2 0 0
12 0 2 0
3 0 3 3
5 3 2 3
8 3 1 1
2 1 2 2
5 1 0 0
12 0 3 0
14 1 1 3
14 3 2 1
12 3 1 1
5 1 2 1
5 1 1 1
8 1 2 2
2 2 1 1
14 2 0 2
5 2 0 3
12 3 0 3
5 0 0 0
12 0 1 0
11 3 2 0
5 0 3 0
8 1 0 1
2 1 1 2
5 3 0 1
12 1 1 1
14 2 0 3
5 2 0 0
12 0 2 0
3 0 3 3
5 3 1 3
5 3 1 3
8 2 3 2
2 2 1 1
14 0 2 0
5 3 0 2
12 2 3 2
14 0 1 3
14 2 3 2
5 2 3 2
8 2 1 1
2 1 2 3
14 2 3 1
14 2 1 0
5 0 0 2
12 2 3 2
6 1 2 0
5 0 2 0
8 3 0 3
2 3 1 1
14 0 0 2
5 0 0 3
12 3 1 3
14 2 3 0
8 3 3 0
5 0 3 0
8 1 0 1
5 0 0 0
12 0 2 0
14 3 2 2
14 2 2 3
3 0 3 2
5 2 2 2
8 2 1 1
14 3 2 2
3 0 3 3
5 3 1 3
5 3 1 3
8 1 3 1
2 1 3 3
14 0 3 2
14 0 0 1
5 0 0 0
12 0 1 0
8 0 0 2
5 2 2 2
8 2 3 3
2 3 0 1
5 3 0 3
12 3 2 3
14 0 0 2
14 2 3 0
10 2 3 0
5 0 3 0
8 0 1 1
14 2 3 2
14 1 2 0
8 0 0 0
5 0 2 0
5 0 3 0
8 0 1 1
2 1 2 3
14 2 3 1
14 1 2 0
8 0 0 0
5 0 3 0
8 0 3 3
2 3 0 1
5 2 0 3
12 3 2 3
14 1 3 0
2 0 2 3
5 3 2 3
8 1 3 1
2 1 0 2
14 2 1 1
14 3 1 3
14 3 3 0
6 1 0 3
5 3 3 3
8 2 3 2
14 0 2 3
14 1 0 0
5 0 0 1
12 1 0 1
14 3 0 0
5 0 2 0
8 0 2 2
2 2 1 0
14 2 0 2
14 1 2 1
11 3 2 1
5 1 3 1
5 1 2 1
8 1 0 0
2 0 0 2
14 1 0 3
14 2 3 0
5 0 0 1
12 1 0 1
4 0 3 3
5 3 2 3
5 3 1 3
8 2 3 2
2 2 3 0
5 0 0 2
12 2 3 2
14 1 3 1
14 1 1 3
14 3 1 3
5 3 2 3
8 3 0 0
2 0 0 2
5 0 0 3
12 3 2 3
14 0 3 1
14 2 2 0
3 0 3 1
5 1 3 1
5 1 3 1
8 2 1 2
5 1 0 1
12 1 2 1
14 3 0 0
9 0 1 3
5 3 1 3
8 2 3 2
2 2 2 1
14 2 3 0
14 2 2 3
14 3 0 2
6 0 2 3
5 3 1 3
5 3 1 3
8 1 3 1
2 1 0 3
14 3 3 0
14 2 2 1
9 0 1 1
5 1 1 1
8 1 3 3
14 1 0 2
14 3 0 1
14 1 0 0
7 1 2 0
5 0 3 0
5 0 2 0
8 3 0 3
5 1 0 0
12 0 3 0
14 1 0 1
7 0 2 2
5 2 1 2
8 3 2 3
2 3 1 2
14 2 3 3
14 1 2 0
0 1 3 1
5 1 2 1
8 2 1 2
2 2 3 1
5 1 0 0
12 0 2 0
14 0 3 2
3 0 3 0
5 0 3 0
5 0 3 0
8 1 0 1
2 1 2 2
14 2 2 0
14 0 3 1
14 0 1 3
14 3 0 0
5 0 2 0
8 0 2 2
2 2 2 3
14 1 3 0
5 1 0 1
12 1 1 1
14 0 2 2
8 1 0 1
5 1 3 1
5 1 1 1
8 1 3 3
2 3 0 0`

// advent.test(part2, [+7, +7, -2, -7, -4], 14);
advent.runs(part2, [input1, program]);
