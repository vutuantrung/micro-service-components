const KafkaJs = require("kafkajs");

const topic = "topic-1";

// initialize a new kafka client and initialize a producer from it
const kafka = new KafkaJs.Kafka({
    clientId: "kafka-app",
    brokers: ["localhost:9090", "localhost:9091", "localhost:9092"],
});
const producer = kafka.producer({
    createPartitioner: KafkaJs.Partitioners.LegacyPartitioner,
});

// we define an async function that writes a new message each second
const produce = async () => {
    await producer.connect();

    let i = 0;
    setInterval(async () => {
        try {
            await producer.send({
                topic,
                messages: [
                    {
                        key: String(i),
                        value: "this is message from producer_1 " + i,
                    },
                ],
            });

            // if the message is written successfully, log it and increment `i`
            console.log("[producer_1]", "writes:", i);
            i++;
        } catch (error) {
            console.error("could not write message " + error);
        }
    }, 2000);
};

produce().catch((err) => {
    console.log(err);
});
