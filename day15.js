'strict mode'
require('./newStdLib');
const advent = require('./advent');

class Grid {
	constructor(str, eAtt) {
		var unitId = 0
		this.units = {all: [], goblins: [], elves: []},
		this.grid = str.split("\n").map((a,i) => a.split("").map((a,j) => {
			if ('EG'.indexOf(a) != -1) {
				var unit = new Unit(j, i, a, unitId++, 200, a == 'E' ? eAtt : 3);
				this.units.all.push(unit)
				this.units[a === 'E' ? 'elves' : 'goblins'].push(unit);
				return unit;
			}
			return a;
		}))
		//this.draw();
	}
	get(x,y) {
		return this.grid[y][x];
	}
	move(unit, x, y) {
		this.grid[unit.y][unit.x] = '.';
		unit.x = x;
		unit.y = y;
		this.grid[unit.y][unit.x] = unit;
		this.units.all.forEach(a => a.canMove = true)
	}
	draw() {
		var out = '';
		for(var y = 0; y < this.grid.length; y++) {
			for(var x = 0; x < this.grid[y].length; x++) {
	 			out += typeof this.grid[y][x] === 'string' ? this.grid[y][x] : this.grid[y][x].t
			}
			out += "\n"
		}
		console.log(out);
	}
	ajacents(x,y) {
		return [
        	[x+1, y, this.get(x+1,y)],
        	[x-1, y, this.get(x-1,y)],
        	[x, y+1, this.get(x,y+1)],
        	[x, y-1, this.get(x,y-1)],
        ];
	}
}

class Unit {
	constructor(x,y,t,id, hp = 200, att = 3) {
		this.x = x;
		this.y = y;
		this.t = t;
		this.id = id;
		this.hp = hp;
		this.att = att;
		this.canMove = true;
	}
	inRange(grid, unit) {
		var squares = [];
		if (grid.get(this.x,this.y+1) == '.' || grid.get(this.x,this.y+1) == unit) squares.push([this.x, this.y+1, this]);
		if (grid.get(this.x,this.y-1) == '.' || grid.get(this.x,this.y-1) == unit) squares.push([this.x, this.y-1, this]);
		if (grid.get(this.x+1,this.y) == '.' || grid.get(this.x+1,this.y) == unit) squares.push([this.x+1, this.y, this]);
		if (grid.get(this.x-1,this.y) == '.' || grid.get(this.x-1,this.y) == unit) squares.push([this.x-1, this.y, this]);
	    return squares;
	}
	ajacents(grid) {

	}
}

function heuristic_cost_estimate(start, goal) {
	return Math.abs(start[0] - goal[0]) + Math.abs(start[1] - goal[1]);
}


function reconstruct_path(cameFrom, current) { 
    total_path = [current]
    while (Object.keys(cameFrom).indexOf(coordinateToKey(current)) !== -1) {
        current = cameFrom[coordinateToKey(current)]
        total_path.push(current)
    }
    return total_path.length - 1;
}

function coordinateToKey(coord) {
	return `${coord[0]},${coord[1]}`;
}

function pathFind(start, goal, grid) {
    closedSet = []
    openSet = [start]
    cameFrom = []
    gScore = {}
    gScore[coordinateToKey(start)] = 0
    fScore = {}
    fScore[coordinateToKey(start)] = heuristic_cost_estimate(start, goal)

    while (openSet.length) {
        current = openSet.sort((a,b) => fScore[coordinateToKey(a)] - fScore[coordinateToKey(b)]).shift();
        if (coordinateToKey(current) == coordinateToKey(goal)) {
        	var res = reconstruct_path(cameFrom, current);
            return res
        }

        closedSet.push(current)
        var neighbors = grid.ajacents(current[0], current[1]).filter(a => a[2] == '.');

        neighbors.forEach(neighbor => {
            if (closedSet.some(a => coordinateToKey(neighbor) == coordinateToKey(a)) ) {
            	return false;
            }

            tentative_gScore = gScore[coordinateToKey(current)] + 1

            if (!openSet.some(a => coordinateToKey(neighbor) == coordinateToKey(a)) ) {
            	openSet.push(neighbor);
            } else if (tentative_gScore >= gScore[coordinateToKey(neighbor)]) {          	
                return false;       
            }

            cameFrom[coordinateToKey(neighbor)] = current
            gScore[coordinateToKey(neighbor)] = tentative_gScore
            fScore[coordinateToKey(neighbor)] = gScore[coordinateToKey(neighbor)] + heuristic_cost_estimate(neighbor, goal)
        });
    }
    return false;
}

function part1(input, elvesAtt = 3, noDeaths = false) {
	var grid = new Grid(input, elvesAtt), units = grid.units;

	var turns = 0;
	while(units.goblins.length && units.elves.length) {
		units.all.sort((a,b) => {return (a.y - b.y) || (a.x - b.x)})
		var currPos = [];
		for (var c = 0; c < units.all.length; c++) {
			var unit = units.all[c],
				allTargets = units[unit.t == 'E' ? 'goblins' : 'elves'];
			if (unit.hp <= 0) continue;


			var adjacents = grid.ajacents(unit.x, unit.y).filter(a => typeof a[2] == 'object' && a[2].t != unit.t && a[2].hp > 0);

		    if (!adjacents.length && unit.canMove) {
				var targets = allTargets
							.filter(a => a.hp > 0)
							.reduce((a, c) => {return a.concat(c.inRange(grid, unit))}, [])
							.map(a => {a.dist = pathFind([unit.x, unit.y], [a[0], a[1]], grid); return a})
							.filter(a => a.dist !== false)
							.sort((a,b) => a.dist - b.dist || a[1] - b[1] || a[0] - b[0])

				if (targets.length && targets[0].dist != 0) {		
					var move = grid.ajacents(unit.x, unit.y)
						.filter(a => a[2] == '.')
			        	.map(a => {a[2] = pathFind(targets[0], a, grid); return a;})
			        	.filter(a => a[2] !== false)
			        	.sort((a,b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0])
					grid.move(unit, move[0][0], move[0][1]);
				}
			}

			var targets = grid.ajacents(unit.x, unit.y).filter(a => typeof a[2] == 'object' && a[2].t != unit.t && a[2].hp > 0)
		         .sort((a,b) => a[2].hp - b[2].hp || a[1] - b[1] || a[0] - b[0]);

			if (targets.length) {
				target = targets[0]
			    target[2].hp -= unit.att;
			    if (target[2].hp <= 0) {
			    	grid.grid[target[1]][target[0]] = '.';
			    	// console.log(`target ${target[2].id} died`)
			    	if (target[2].t === 'E' && noDeaths) {
			    		return false
			    	}
			    }
			}
		}
    	units.all = units.all.filter(a => a.hp > 0);
		units.elves = units.elves.filter(a => a.hp > 0);
		units.goblins = units.goblins.filter(a => a.hp > 0);
		turns++;
		// grid.draw();
		// units.all._l();
	}
	var hp = units.all.reduce((a,c) => a + c.hp, 0);
	console.log(`${turns}: ${hp} @ ${elvesAtt}`)
	return (turns - 1) * hp
}

function part2(input) {
	var min = 4, max = 200, mid;
	do {
		console.log(`${min}, ${max}`);
		mid = min + Math.floor((max - min) / 2)
		res = part1(input, mid, true);
		if (res) {max = mid} else {min = mid}
	} while ((max - min) > 1);
	if ((max - min) == 1) {
		res = part1(input, min, true) || part1(input, max, true)
	}
	return res;
}

var tests = [
[`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`,39514],
[`#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`, 36334],
[`#######
#E.G#.#  
#.#G..#  
#G.#.G#  
#G..#.#  
#...E.#  
#######  
`,27755]];

var input = `################################
#######.......###.#.G###########
#######...G#.####...#.##########
#######....#####....G.##########
######......#..#......##########
#########G..G..#.......#########
###########.........G..#########
############.#.........#########
###########..##.......##.##.####
########G...##...G#............#
#####..##...#........G.........#
#####.G##........G.GG.......E.##
#####..#......#####....#.......#
#####.G......#######.......E...#
#####...G...#########E.........#
#####.....G.#########.........##
####....G...#########.....#...##
#.##........#########.....#.#.##
#...........#########.....#.#..#
#.G.#..##E...#######..#####.#..#
##G.......#...#####...#####.##E#
#........#..........E.#####..#.#
##..#....#........#######..#...#
#.....##.#...E....########.....#
##..E.##...G..E..##########....#
###########.....###########..E.#
###########.....##########.....#
###########..#############.....#
##########..#################..#
##########.##################..#
#########..##################.##
################################`

advent.tests(part1, tests)
advent.run(part1, input);

var tests = [
[`#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`,31284],
[`####### 
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
####### `, 4988],
[`#######
#E.G#.#  
#.#G..#  
#G.#.G#  
#G..#.#  
#...E.#  
#######  
`,3478]];

advent.tests(part2, tests)
advent.run(part2, input)