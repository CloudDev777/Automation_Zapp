import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const app = express();
app.use(express.json());

// https://hooks.zapier.com/hooks/catch/17043103/22b8496/
// password logic
app.post("/hooks/catch/:userId/:connectId", async (req, res) => {
  const userId = req.params.userId;
  const connectId = req.params.connectId;
  const body = req.body;

  // store in db a new trigger
  await client.$transaction(async (tx) => {
    const run = await tx.connectRun.create({
      data: {
        connectId,
        metadata: body,
      },
    });

    await tx.connectRunOutbox.create({
      data: {
        connectRunId: run.id,
      },
    });
  });
  res.json({
    message: "Webhook received",
  });
});

app.listen(3002);
