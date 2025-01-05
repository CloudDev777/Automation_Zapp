import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

export const TOPIC_NAME = "outbox-topic";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();

  await producer.connect();

  while (1) {
    const pendingRows = await prisma.connectRunOutbox.findMany({
      where: {},
      take: 10,
    });

    await producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((row) => ({
        key: row.connectRunId,
        value: JSON.stringify(row.connectRunId),
      })),
    });
  }
}

main();
