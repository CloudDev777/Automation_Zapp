import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { ConfigureTriggerSchema, CreateAvailableTriggerInput } from "../types";
import { NotFoundError } from "../errors";

export const createAvailableTrigger = async (
  req: Request<{}, {}, CreateAvailableTriggerInput>,
  res: Response
) => {
  let { name, description, appId } = req.body;

  const exists = await prismaClient.app.findFirst({
    where: { id: appId },
  });
  if (!exists) {
    throw new NotFoundError(`App with id: ${appId} does not exists!`);
  }

  const trigger = await prismaClient.availableTrigger.create({
    data: {
      name,
      description,
      appId,
    },
  });

  res.status(StatusCodes.OK).json({ trigger });
};

export const getAvailableTrigger = async (req: Request, res: Response) => {
  const availableTriggers = await prismaClient.availableTrigger.findMany({
    include: {
      app: {
        select: {
          name: true,
          icon: true,
        },
      },
    },
  });
  res.status(StatusCodes.OK).json({ availableTriggers });
};

export const updateAvailableTrigger = async (
  req: Request<{ id: string }, {}, CreateAvailableTriggerInput>,
  res: Response
) => {
  const { id } = req.params;
  let { name, description, appId } = req.body;

  const exists = await prismaClient.availableTrigger.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(
      `Available Trigger with id: ${id} does not exists!`
    );
  }
  const appExists = await prismaClient.app.findFirst({
    where: { id: appId },
  });
  if (!appExists) {
    throw new NotFoundError(`App with id: ${appId} does not exists!`);
  }

  const availableTrigger = await prismaClient.availableTrigger.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      appId,
    },
  });

  res.status(StatusCodes.OK).json({ availableTrigger });
};

export const deleteAvailableTrigger = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  const exists = await prismaClient.availableTrigger.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(
      `Available Trigger with id: ${id} does not exists!`
    );
  }

  await prismaClient.availableTrigger.delete({
    where: {
      id,
    },
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: `Available Trigger with id: ${id} is deleted successfully!` });
};

export const configureTrigger = async (
  req: Request<{ zapId: string }, {}, ConfigureTriggerSchema>,
  res: Response
) => {
  const userId = req.user?.userId;
  const { zapId } = req.params;
  const { triggerId, config, metadata, connectionId } = req.body;

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

  // Verify the trigger template exists
  const availableTrigger = await prismaClient.availableTrigger.findUnique({
    where: { id: triggerId },
  });

  if (!availableTrigger) {
    throw new NotFoundError("Available Trigger not found.");
  }

  // Create or update trigger configuration
  const trigger = await prismaClient.trigger.upsert({
    where: {
      zapId,
    },
    update: {
      triggerId: availableTrigger.id,
      metadata: config,
      connectionId,
    },

    create: {
      zapId,
      config,
      metadata,
      triggerId: availableTrigger.id,
      appId: availableTrigger.appId,
      connectionId,
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
      availableTriggerId: trigger.id,
    },
  });

  res.status(StatusCodes.OK).json({
    message: "Trigger configured successfully",
    trigger,
  });
};
