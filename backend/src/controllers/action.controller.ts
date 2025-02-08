import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { CreateAvailableActionInput } from "../types";
import { NotFoundError } from "../errors";

export const createAvailableAction = async (
  req: Request<{}, {}, CreateAvailableActionInput>,
  res: Response
) => {
  let { name, description, appId } = req.body;

  const exists = await prismaClient.app.findFirst({
    where: { id: appId },
  });

  if (!exists) {
    throw new NotFoundError(`App with id: ${appId} does not exists!`);
  }

  const action = await prismaClient.availableAction.create({
    data: {
      name,
      description,
      appId,
    },
  });

  res.status(StatusCodes.OK).json({ action });
};

export const getAvailableAction = async (req: Request, res: Response) => {
  const availableActions = await prismaClient.availableAction.findMany({
    include: { app: { select: { icon: true, name: true } } },
  });
  res.status(StatusCodes.OK).json({ availableActions });
};

export const updateAvailableAction = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, description, appId } = req.body;

  const exists = await prismaClient.availableAction.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(`Available Action with id: ${id} does not exists!`);
  }

  const AppExists = await prismaClient.app.findFirst({
    where: { id: appId },
  });

  if (!AppExists) {
    throw new NotFoundError(`App with id: ${appId} does not exists!`);
  }

  const availableActions = await prismaClient.availableAction.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      appId,
    },
  });

  res.status(StatusCodes.OK).json({ availableActions });
};

export const deleteAvailableAction = async (req: Request, res: Response) => {
  const { id } = req.params;

  const exists = await prismaClient.availableAction.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(`Available Action with id: ${id} does not exists!`);
  }

  await prismaClient.availableAction.delete({
    where: {
      id,
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: `Available Action with id: ${id} is deleted successfully!` });
};

export const configureAction = async (req: Request, res: Response) => {
  // TODO: Validate input
  const userId = req.user?.userId;
  const { zapId } = req.params;
  const { actionId, config, metadata } = req.body;

  // Verify the Zap exists and belongs to the user
  const existingZap = await prismaClient.zap.findUnique({
    where: {
      id: zapId,
      userId: userId,
    },
  });

  if (!existingZap) {
    throw new NotFoundError("Zap not found.");
  }

  // Verify the action template exists
  const availableAction = await prismaClient.availableAction.findUnique({
    where: { id: actionId },
  });

  if (!availableAction) {
    throw new NotFoundError("Available Action not found.");
  }

  // Get the count of existing actions for the Zap
  const actionCount = await prismaClient.action.count({
    where: {
      zapId: zapId,
    },
  });

  // Create a new action with the next sortingOrder
  const action = await prismaClient.action.create({
    data: {
      zapId: zapId,
      actionId: availableAction.id,
      config: config,
      metadata: metadata,
      sortingOrder: actionCount + 1, // Automatically set sortingOrder
      appId: availableAction.appId,
    },
    include: {
      type: true,
    },
  });

  // Update Zap status if needed
  await prismaClient.zap.update({
    where: { id: zapId },
    data: {
      status: "DRAFT",
    },
  });

  res.status(StatusCodes.OK).json({
    message: "Action configured successfully",
    action,
  });
};
