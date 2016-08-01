'use strict';

const util = require('util');
const stream = require('stream');
const Readable = stream.Readable;
const assign = Object.assign;

module.exports = ArrayStream;

const defaults = {
	objectMode: true
}

function ArrayStream(array, options){
	if (!(this instanceof ArrayStream)) return new ArrayStream(array, options);
	options = assign(options || {}, defaults);
	Readable.call(this, options);

	var push = this.push.bind(this);
	var end = this.push.bind(this, null);
	var error = this.emit.bind(this, 'error');
	if (array instanceof Array) {
		array.forEach(push);
		end();
	}
	else if (array instanceof Promise) {
		array.then(function(array){
			array.forEach(push);
			end();
		}, error)
	}
	else throw new Error('1st argument is not an array.');
}
util.inherits(ArrayStream, Readable);

ArrayStream.prototype._read = function(){
};
