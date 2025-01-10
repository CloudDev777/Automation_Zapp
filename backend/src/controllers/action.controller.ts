import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prismaClient } from "../db";

export const getAvailableAction = async (req: Request, res: Response) => {
  
  const availableActions = await prismaClient.availableAction.findMany({});

  res.status(StatusCodes.OK).json({ availableActions });
};
