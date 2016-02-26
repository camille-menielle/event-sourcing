var consumer = require('./consumer.js');
var publisher = require('./publisher.js');
var exchangePublisher = require('./exchange-publisher.js');
var ConsumingError = require('./error/error');
var ConsumingWarning = require('./error/warning');

module.exports = {
	consumer: consumer,
	publisher: publisher,
	exchangePublisher: exchangePublisher,
	consumingErrors: {
		error: ConsumingError,
		warning: ConsumingWarning
	}
};