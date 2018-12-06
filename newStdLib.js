Object.prototype.uniq = function() { 
	var out = [];
	for(i in this) {
		if (this.hasOwnProperty(i) && out.indexOf(this[i]) == -1) {
			out.push(this[i])
		}
	}
	return out;
}

Object.prototype.uniqc = function(callback) { 
	var out = {};
	for(i in this) {
		if (this.hasOwnProperty(i)) {
			var val = callback ? callback(this[i]) : this[i];
			out[val] = out[val] ? ++out[val] : 1;
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


Object.prototype.filter = function (callback) {
	var out = {};
	for(i in this) {
		if (this.hasOwnProperty(i) && callback(i, this[i])) {
			out[i] = this[i];
		}
	}
	return out
}

Object.prototype.keys = function (callback) {	
	return Object.keys(this);
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