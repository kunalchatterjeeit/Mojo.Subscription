const kafkaCon = require('./kafka');

const producer = kafkaCon.producer();
producer.on('producer.connect', () => {
    console.log(`KafkaProvider: connected`);
});
producer.on('producer.disconnect', () => {
    console.log(`KafkaProvider: could not connect`);
});
producer.on('producer.network.request_timeout', (payload) => {
    console.log(`KafkaProvider: request timeout ${payload.clientId}`);
});
const sendKafkaMessage = async (key,req) => {
    // Producing
    await producer.connect()
    await producer.send({
        topic: 'registration.to.subscription',
        messages: [
            {
                key: key,
                value: Buffer.from(JSON.stringify(req)),
                timestamp: Date.now()
            },
        ],
    });
    await producer.disconnect();
}

module.exports = { sendKafkaMessage }