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
