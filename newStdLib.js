Object.prototype.uniq = function() { 
	var out = [];
	for(i in this) {
		if (this.hasOwnProperty(i) && out.indexOf(this[i]) == -1) {
			out.push(this[i])
		}
	}
	return out;
}

Object.prototype.uniqc = function() { 
	var out = {};
	for(i in this) {
		if (this.hasOwnProperty(i)) {
			out[this[i]] = out[this[i]] ? ++out[this[i]] : 1;
		}
	}
	return out;
}

Array.prototype.index = function(i) {
	return this[i];
}

Object.prototype._l = function() {
	console.log(this);
	return this;
}

Object.prototype.map = function (callback) {
	var out = {};
	for(i in this) {
		if (this.hasOwnProperty(i)) {
			out[i] = callback(i, this[i]);
		}
	}
	return out
}

Object.prototype.toArray = function() {
	return Object.values(this);
}


Object.prototype.reduce = function (callback, initial) {
	for(i in this) {
		if (typeof initial === 'undefined') {
			intial = this[i];
			continue;
		}
		if (this.hasOwnProperty(i)) {
			initial = callback(initial, this[i], i);
		}
	}
	return initial
}