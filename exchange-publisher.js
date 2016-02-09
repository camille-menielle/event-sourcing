var uuid = require('node-uuid');
var inherits = require('util').inherits;
var Publisher = require('./publisher');

function ExchangePublisher(config) {
	if (!this.exchange) throw new Error('Missing exchange property');
	if (!this.exchangeType) throw new Error('Missing exchangeType property');

	this.domain = 'bleh';

	ExchangePublisher.super_.call(this, config);
}

inherits(ExchangePublisher, Publisher);

ExchangePublisher.prototype.connect = function (callback) {
	var self = this;

	this.storage.initAdapters(function (err) {
		if (err) return callback(err);

		self.amqp.connect().then(function (channel) {
		    self.channel = channel;
		    self.channel.assertExchange(self.exchange, self.exchangeType).then(function (exchangeAssertion) {
			return callback(null, channel);;
		    });
		}, callback);
	});
};

ExchangePublisher.prototype.askRPC = function (event, routingKey, callback) {
	var self = this;
	this.persistEvent(event, function (err) {
		if (err) return callback(err);
		self.emitEvent(event, routingKey, callback);
	});
};

ExchangePublisher.prototype.persistEvent = function (event, callback) {
	this.storage.persistEvent(event, callback);
};

ExchangePublisher.prototype.assertReplyExchange = function () {
	return this.channel.assertExchange(this.exchange, this.exchangeType).then(function (exchangeAssertion) {
		return exchangeAssertion.exchange;
	});
};

ExchangePublisher.prototype.emitEvent = function (event, routingKey, callback) {
	event = new Buffer(JSON.stringify(event));

	if (!callback) return this.channel.publish(this.exchange, routingKey, event);

	throw new Error('emitEvent code with callback parameter not implemented yet');

	// TODO code below

	//var self = this;
	//var rpcConfig = { correlationId: uuid.v4(), replyTo: null };
	//var rpcCallback = function (msg) {
	//	if (msg.properties.correlationId !== rpcConfig.correlationId) return;
	//	callback(msg);
	//};
    //
	//this.assertReplyExchange().then(function (exchangeName) {
	//	self.channel.consume(responseQ, rpcCallback, { noAck: true }).then(function () {
	//		rpcConfig.replyTo = responseQ;
	//		self.channel.sendToQueue(queue, event, rpcConfig);
	//	});
	//});
};

module.exports = ExchangePublisher;
