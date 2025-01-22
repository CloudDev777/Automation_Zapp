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

  // Ensure the trigger exists
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

  // Validate each action exists in the database
  const actionIds = actions.map((x) => x.availableActionId);
  const actionExists = await prismaClient.availableAction.findMany({
    where: {
      id: {
        in: actionIds,
      },
    },
  });

  // Check for missing actions
  const foundActionIds = actionExists.map((action) => action.id);
  const missingActions = actionIds.filter((id) => !foundActionIds.includes(id));

  if (missingActions.length > 0) {
    throw new NotFoundError(
      `Actions not found for the following IDs: ${missingActions.join(", ")}`
    );
  }

  // Create the Zap and associated actions/trigger in a transaction
  const zapId = await prismaClient.$transaction(async (tx) => {
    const zap = await tx.zap.create({
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
    .json({ msg: `Zap is created successfully with ID: ${zapId}` });
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

export const deleteZap = async (req: Request, res: Response) => {
  const { zapId } = req.params;

  await prismaClient.zap.delete({
    where: {
      id: zapId,
      userId: req.user?.userId,
    },
  });

  res.status(StatusCodes.OK).json({ msg: "Zap deleted successfully!" });
};
