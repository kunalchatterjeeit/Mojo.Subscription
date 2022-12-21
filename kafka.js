const { Kafka } = require('kafkajs');


// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafkaCon = new Kafka({
    clientId: 'registration_client',
    brokers: ['pkc-56d1g.eastus.azure.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'Y4T5SYNMK5IWS5T2',
        password: 'tAqP529S/UZeU//FeX2Z+8fekXdmF1E2/Mtu9t6eG4Bt631sgh0hw4oDfD7v0741'
    }
});


module.exports = kafkaCon;
