'use strict';

const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

const stream = require('../');

const map = require('map-stream');

describe('ArrayStream', function(){
	it('should convert array to stream', function(done){
		var array = ['abc', 'def', 'ghi', 'jkl'];
		var counter = 0;
		stream(array)
		.pipe(map(function(data, next){
			data.should.equal(array[counter]);
			counter++;
			if (counter === array.length) done();
		}))
	})
	it('should convert Promise<Array> to stream', function(done){
		var array = ['abc', 'def', 'ghi', 'jkl'];
		var counter = 0;
		stream(new Promise(function(resolve, reject){
			setTimeout(function(){
				resolve(array);
			}, 10);
		}))
		.pipe(map(function(data, next){
			data.should.equal(array[counter]);
			counter++;
			if (counter === array.length) done();
		}))
	})
	it('should convert Promise<Array> to stream', function(done){
		var array = ['abc', 'def', 'ghi', 'jkl'];
		var counter = 0;
		stream(new Promise(function(resolve, reject){
			setTimeout(function(){
				reject(new Error('error'));
			}, 10);
		}))
		.on('error', function(e){
			e.message.should.equal('error');
			done();
		})
	})
	it('should throw error, if 1st argument is not an array.', function(){
		try {
			stream('abc')
		}
		catch (e) {
			e.message.should.equal('1st argument is not an array.')
		}
	})
})