var inherits = require('util').inherits;

function ConsumingError(message, extra) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	this.extra = extra;
}

inherits(ConsumingError, Error);

module.exports = ConsumingError;