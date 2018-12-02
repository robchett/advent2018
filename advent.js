const assert = require('assert');

module.exports = {
	test: (method, input, output) => assert.equal(method(input), output),
	run: (method, input) => console.log('Result: ' + method(input))
}
