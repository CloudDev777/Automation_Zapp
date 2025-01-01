import express, { Request, Response } from "express";

const app = express();

// password logic here

app.post("/hooks/catch/:userId/:connectId", (req: Request, res: Response) => {
  const userId = req.params.userId;
  const connectId = req.params.connectId;

// store  in db a new trigger 

// push  it on to a queue (kafka/redis)



});
