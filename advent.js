const assert = require('assert');

module.exports = {
	test: (method, input, output) => assert.equal(method(input), output),
	tests: (method, inputs) => inputs.forEach(a => {var ans = a.pop(); assert.equal(method(...a), ans); a.push(ans); console.log("test passed");}),
	run: (method, input) => console.log('Result: ' + method(input)),
	runs: (method, input) => console.log('Result: ' + method(...input))
}
