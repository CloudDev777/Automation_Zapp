import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prismaClient } from "../db";
import { ZapCreateInput } from "../types";
import { NotFoundError } from "../errors";

export const createZap = async (
  req: Request<{}, {}, ZapCreateInput>,
  res: Response
) => {
  const userId = req.user?.userId!;

  const { actions, zapName, availableTriggerId, triggerMetadata } = req.body;

  const triggerExists = await prismaClient.availableTrigger.findFirst({
    where: {
      id: availableTriggerId,
    },
  });

  if (!triggerExists) {
    throw new NotFoundError(
      `Trigger with ID '${availableTriggerId}' not found.`
    );
  }

  const actionExists = await prismaClient.availableAction.findMany({
    where: {
      id: {
        in: actions.map((x) => x.availableActionId), // Use the `in` operator
      },
    },
  });

  if (!actionExists || actionExists.length < actions.length) {
    const missingActions = actions
      .map((x) => x.availableActionId)
      .filter((id) => !actionExists.some((action) => action.id === id));
    console.log("Missing actions:", missingActions); // Debugging the missing actions  //TODO: We can not use same action twice, bug fix.
    throw new NotFoundError(
      `Actions not found for the following IDs: ${missingActions.join(", ")}`
    );
  }

  const zapId = await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        zapName,
        userId,
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
        metadata: triggerMetadata,
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

  res
    .status(StatusCodes.OK)
    .json({ msg: `Zap is created sucessfully with ID: ${zapId}` });
};

export const getAllZaps = async (req: Request, res: Response) => {
  const zaps = await prismaClient.zap.findMany({
    where: {
      userId: req.user?.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
      zapRuns: true,
    },
  });
  res.status(StatusCodes.OK).json({ zaps });
};

export const getSingleZap = async (req: Request, res: Response) => {
  const { zapId } = req.params;

  const zap = await prismaClient.zap.findMany({
    where: {
      userId: req.user?.userId,
      id: zapId,
    },
    include: {
      actions: true,
      trigger: {
        include: {
          zap: true,
        },
      },
      zapRuns: true,
    },
  });

  if (zap.length === 0) {
    throw new NotFoundError(`Zap with id: ${zapId} does not exists!`);
  }

  res.status(StatusCodes.OK).json({ zap });
};
