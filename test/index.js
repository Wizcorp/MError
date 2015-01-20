var assert = require('assert');
var MError = require('../index.js');


describe('MError', function () {
	it('can be set up with levels', function () {
		MError.setupLevels(['warning', 'error', 'alert', 'critical', 'emergency'], 'error');
	});

	it('can embed an Error', function () {
		var error = new Error('Error 1');
		var merror = new MError(error, 'Something bad happened');

		assert.equal(merror.message, 'Something bad happened: Error 1');
		assert(merror instanceof MError);
		assert.strictEqual(merror.cause(), error);
		assert.equal(merror.cause().message, 'Error 1');
	});

	it('can embed an MError containing an Error', function () {
		var error = new Error('Error 2');
		var merror = new MError(error, 'Something bad happened again');
		var merror2 = new MError(merror, 'This is bad');

		assert.equal(merror2.message, 'This is bad: Something bad happened again: Error 2');
		assert.strictEqual(merror.cause(), error);
	});

	it('can change levels', function () {
		var merror = new MError('Problem 3');
		assert.equal(merror.getLevel(), 'error');
		merror.decLevel('warning');
		assert.equal(merror.getLevel(), 'warning');
		merror.incLevel('alert');
		assert.equal(merror.getLevel(), 'alert');
		merror.decLevel('emergency');
		assert.equal(merror.getLevel(), 'alert');
		merror.incLevel('warning');
		assert.equal(merror.getLevel(), 'alert');
		merror.setLevel('warning');
		assert.equal(merror.getLevel(), 'warning');
	});
});




