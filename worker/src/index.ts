import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

export const TOPIC_NAME = "zap-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });

  await consumer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const offset = JSON.parse(message.offset.toString());
      const value = JSON.parse(message.value.toString());

      console.log("Topic: ", topic);
      console.log("Partion: ", partition);
      console.log(`Offset: ${offset}`);
      console.log("Value: ", value);

      await new Promise((r) => setTimeout(r, 3000));
    },
  });
}

main();
