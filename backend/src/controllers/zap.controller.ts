import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { InternalServerError, NotFoundError } from "../errors";

export const createZap = async (req: Request, res: Response) => {
  const userId = req.user?.userId!;
  const zap = await prismaClient.zap.create({
    data: {
      userId,
    },
  });

  if (!zap) {
    throw new InternalServerError("Something went wrong while creating zap");
  }

  res.status(StatusCodes.OK).json({ zap });
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

  const zap = await prismaClient.zap.findFirst({
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

  res.status(StatusCodes.OK).json(zap);
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
