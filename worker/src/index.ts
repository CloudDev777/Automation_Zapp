import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

export const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor-2",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });

  await consumer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      const offset = JSON.parse(message.offset.toString());
      const value = JSON.parse(message.value.toString());
      console.log("\n");
      console.log(
        `Processing message with offset ${offset} on topic ${topic} and in partition ${partition}`
      );
      console.log("with value: ", value);

      await new Promise((r) => setTimeout(r, 1000));
      await consumer.commitOffsets([
        {
          topic,
          partition,
          offset: (parseInt(offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();