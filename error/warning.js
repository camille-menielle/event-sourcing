var inherits = require('util').inherits;

function ConsumingWarning(message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(ConsumingWarning, Error);

module.exports = ConsumingWarning;