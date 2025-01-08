import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UnauthenticatedError } from "../errors";

import { prismaClient } from "../db";

export const createZap = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "Zap created" });
};

export const getAllZaps = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "Get all zaps" });
};

export const getSingleZap = async (req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ msg: "get a single zap" });
};
