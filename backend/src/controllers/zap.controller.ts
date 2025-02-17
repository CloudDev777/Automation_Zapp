import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { BadRequestError, InternalServerError } from "../errors";

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
        orderBy: {
          sortingOrder: "asc", // Add this line to sort actions
        },
        include: {
          type: true,
          app: true,
        },
      },

      trigger: {
        include: {
          type: true,
          app: true,
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
      actions: {
        orderBy: {
          sortingOrder: "asc", // Add this line to sort actions
        },
        include: {
          type: true,
          app: true,
        },
      },
      trigger: true,
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

export const publishZap = async (req: Request, res: Response) => {
  const { zapId } = req.params;

  let zap = await prismaClient.zap.update({
    where: {
      userId: req.user?.userId,
      id: zapId,
    },
    data: {
      status: "PUBLISHED",
      zapName: req.body.zapName,
    },
  });

  if (!zap) {
    zap = await prismaClient.zap.update({
      where: {
        userId: req.user?.userId,
        id: zapId,
      },
      data: {
        status: "ERROR",
      },
    });
    throw new InternalServerError("Something went wrong while publishing zap");
  }

  res.status(StatusCodes.OK).json(zap);
};

export const toggleZap = async (req: Request, res: Response) => {
  const { zapId } = req.params;

  let zap = await prismaClient.zap.findFirst({
    where: {
      userId: req.user?.userId,
      id: zapId,
    },
  });

  if (!zap) {
    throw new InternalServerError("Something went wrong while publishing zap");
  }

  if (zap.status === "DRAFT") {
    throw new BadRequestError(
      "The zap is in draft mode and cannot be started."
    );
  }

  if (zap.status === "PUBLISHED") {
    zap = await prismaClient.zap.update({
      where: {
        userId: req.user?.userId,
        id: zapId,
      },
      data: {
        status: "PAUSED",
      },
    });
  } else {
    zap = await prismaClient.zap.update({
      where: {
        userId: req.user?.userId,
        id: zapId,
      },
      data: {
        status: "PUBLISHED",
      },
    });
  }

  res.status(StatusCodes.OK).json("toggle");
};
