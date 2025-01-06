import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const prisma = new PrismaClient();

export const TOPIC_NAME = "zap-events";
