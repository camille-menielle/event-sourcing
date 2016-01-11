var consumer = require('./consumer.js');
var publisher = require('./publisher.js');
var exchangePublisher = require('./exchange-publisher.js');

module.exports = {
	consumer: consumer,
	publisher: publisher,
	exchangePublisher: exchangePublisher
};