# MError

MError: VError with error levels

[![Build Status](https://travis-ci.org/Wizcorp/MError.png)](https://travis-ci.org/Wizcorp/MError)

## The purpose of this module

[VError](https://www.npmjs.com/package/verror) is a really awesome NPM module.
MError inherits from VError and adds some nice APIs that make it a bit nicer to
work with (for me anyway, use it or don't).

## API

The main API is documented by the VError module, so we will only go into detail
on what is added.

**MError.setupLevels(levels, defaultLevel)**

You call this once to set up error log levels (in order of severity) that MError
should be aware of, and to pass the default level that each error will carry
until changed.

Example:

```js
MError.setupLevels(['warning', 'error', 'fatal'], 'error');
```

**error.getLevel()**

Returns the current level of the error.

Example:

```js
var error = new MError('Ouch');
console.log(error.getLevel()); // outputs: error
```

**error.setLevel(level)**

Changes the error level to any of the levels configured through MError.setupLevels.

Example:

```js
var error = new MError('Ouch');
error.setLevel('fatal');
```

**error.incLevel(level)**

Changes the level to what is passed, but only if it's an increase in severity.

```js
var error = new MError('Ouch');
error.incLevel('fatal');
```

**error.decLevel(level)**

Changes the level to what is passed, but only if it's a decrease in severity.

```js
var error = new MError('Ouch');
error.decLevel('error');
```

## Chaining

The constructor does not require the "new" keyword to function. This fact,
combined with function chaining, allows for one-liner patterns like this:

```js
function statMyFile(cb) {
	fs.stat(someFile, function (error, stats) {
		if (error) {
			return cb(MError(error, 'Stat failed').setLevel('fatal'));
		}

		return cb(null, stats);
	});
});
```

