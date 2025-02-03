import { StatusCodes } from "http-status-codes";
import { prismaClient } from "../db";
import { Request, Response } from "express";

export const getDashboardCount = async (req: Request, res: Response) => {
  const activeZaps = await prismaClient.zap.count({
    where: {
      status: "PUBLISHED",
    },
  });
  const totalZaps = await prismaClient.zap.count();

  res.status(StatusCodes.OK).json({ activeZaps, totalZaps });
};
