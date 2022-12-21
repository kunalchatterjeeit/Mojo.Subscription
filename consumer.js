const kafkaCon = require('./kafka');

const consumer = kafkaCon.consumer({groupId: "subscription"});

const consumeKafkaMessage = async () => {
    await consumer.connect();

    await consumer.subscribe({ topic: 'registration.to.subscription', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(),
            })
        },
    });
}

module.exports = {consumeKafkaMessage}
