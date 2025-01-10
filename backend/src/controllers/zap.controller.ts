import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prismaClient } from "../db";
import { ZapCreateInput } from "../types";

export const createZap = async (
  req: Request<{}, {}, ZapCreateInput>,
  res: Response
) => {
  // @ts-ignore
  const id = req.id;
  const { actions, availableTriggerId, triggerMetadata } = req.body;

  const zapId = await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        userId: parseInt(id),
        availableTriggerId: "",
        actions: {
          create: actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        availableTriggerId: trigger.id,
      },
    });

    return zap.id;
  });

  res.status(StatusCodes.OK).json({ zapId });
};

export const getAllZaps = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "Get all zaps" });
};

export const getSingleZap = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "get a single zap" });
};
