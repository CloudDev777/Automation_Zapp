import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prismaClient } from "../db";
import { CreateAvailableActionInput } from "../types";
import { NotFoundError } from "../errors";

export const createAvailableAction = async (
  req: Request<{}, {}, CreateAvailableActionInput>,
  res: Response
) => {
  const { name, image } = req.body;

  const action = await prismaClient.availableAction.create({
    data: {
      name,
      image,
    },
  });

  res.status(StatusCodes.OK).json({ action });
};

export const getAvailableAction = async (req: Request, res: Response) => {
  const availableActions = await prismaClient.availableAction.findMany({});

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
