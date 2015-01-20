var assert = require('assert');
var inherits = require('util').inherits;
var VError = require('verror');

function MError() {
	if (!(this instanceof MError)) {
		var obj = Object.create(MError.prototype);
		MError.apply(obj, arguments);
		return obj;
	}

	VError.apply(this, arguments);
	this._level = MError._defaultLevel;
}


module.exports = MError;


inherits(MError, VError);


MError.setupLevels = function (levels, defaultLevel) {
	MError._levels = levels;
	MError._defaultLevel = MError.levelToNum(defaultLevel);
};


MError.levelToNum = function (level) {
	var index = this._levels.indexOf(level);
	assert.notEqual(index, -1, 'Unrecognized error level: ' + level);
	return index;
};


MError.numToLevel = function (num) {
	var level = this._levels[num];
	assert(level, 'Unrecognized error level number ' + num);
	return level;
};


MError.prototype.getLevel = function () {
	return MError._levels[this._level];
};


MError.prototype.setLevel = function (level) {
	this._level = MError.levelToNum(level);
	return this;
};


MError.prototype.incLevel = function (level) {
	var index = MError.levelToNum(level);
	if (this._level === undefined || index > this._level) {
		this._level = index;
	}
	return this;
};


MError.prototype.decLevel = function (level) {
	var index = MError.levelToNum(level);
	if (this._level === undefined || index < this._level) {
		this._level = index;
	}
	return this;
};

