import { StatusCodes } from "http-status-codes";
import { prismaClient } from "../db";
import { BadRequestError, NotFoundError } from "../errors";
import { NewsletterInput } from "../types";
import { Request, Response } from "express";

export const createNewsletter = async (
  req: Request<{}, {}, NewsletterInput>,
  res: Response
) => {
  const exists = await prismaClient.newsletter.findFirst({
    where: { email: req.body.email },
  });

  if (exists) {
    throw new BadRequestError(
      `Newsletter with email: ${req.body.email} already exists!`
    );
  }

  await prismaClient.newsletter.create({
    data: {
      name: req.user!.name,
      email: req.body.email,
    },
  });

  res.status(StatusCodes.OK).json({ msg: "Newsletter created successfully" });
};
