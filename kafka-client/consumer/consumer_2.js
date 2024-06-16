const KafkaJs = require("kafkajs");

const consumerNum = 2;
const isSupportBatch = false;

// initialize a new kafka client and initialize a producer from it
const kafka = new KafkaJs.Kafka({
    clientId: "kafka-app",
    brokers: ["localhost:9090", "localhost:9091", "localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "kafka-app" + consumerNum });
const consume = async () => {
    await consumer.connect();
    await consumer.subscribe({
        topics: ["topic-1"],
        fromBeginning: false,
    });

    let consumerOpt = {};
    if (isSupportBatch) {
        consumerOpt.eachBatch = async ({ batch }) => {
            let topic = batch.topic;
            let partition = batch.partition;
            let messages = batch.messages;
            for (const message of messages) {
                const prefix = `[${consumerNum}][${topic}] [${partition}] [${message.timestamp}]`;
                console.log(`${prefix} ${message.key} - ${message.value}`);
            }
        };
    } else {
        consumerOpt.eachMessage = async ({ topic, partition, message }) => {
            console.log(
                `received message: ${message.value} - topic=${topic} - partition=${partition}`
            );
        };
    }
    await consumer.run(consumerOpt);
};

consume().catch((err) => {
    console.error("error in consumer: ", err);
});
