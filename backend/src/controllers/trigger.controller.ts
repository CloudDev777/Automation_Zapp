import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { CreateAvailableTriggerInput } from "../types";
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

export const updateAvailableTrigger = async (req: Request, res: Response) => {
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

export const deleteAvailableTrigger = async (req: Request, res: Response) => {
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
