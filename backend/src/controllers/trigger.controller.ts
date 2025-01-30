import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

import { prismaClient } from "../db";
import { CreateAvailableTriggerInput } from "../types";
import { InternalServerError, NotFoundError } from "../errors";
import { FirebaseImageHandler } from "../middlewares/firebaseUploader";

export const createAvailableTrigger = async (
  req: Request<{}, {}, CreateAvailableTriggerInput>,
  res: Response
) => {
  let { name, image } = req.body;

  if (req.file) {
    const res = await FirebaseImageHandler.uploadImage(req.file);
    if (!res) {
      throw new InternalServerError("Error uploading image");
    }
    image = res?.downloadURL;
  }

  const trigger = await prismaClient.availableTrigger.create({
    data: {
      name,
      image,
    },
  });

  res.status(StatusCodes.OK).json({ trigger });
};

export const getAvailableTrigger = async (req: Request, res: Response) => {
  const availableTriggers = await prismaClient.availableTrigger.findMany({});
  res.status(StatusCodes.OK).json({ availableTriggers });
};

export const updateAvailableTrigger = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, image } = req.body;
  const exists = await prismaClient.availableTrigger.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(
      `Available Trigger with id: ${id} does not exists!`
    );
  }

  if (req.file) {
    const res = await FirebaseImageHandler.updateImage({
      oldImageUrl: image,
      newImage: req.file,
    });
    if (!res) {
      throw new InternalServerError("Unable to update image.");
    }
    image = res.downloadURL;
  }

  const availableTrigger = await prismaClient.availableTrigger.update({
    where: {
      id,
    },
    data: {
      name,
      image,
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
  await FirebaseImageHandler.deleteImage(exists.image!);

  res
    .status(StatusCodes.OK)
    .json({ msg: `Available Trigger with id: ${id} is deleted successfully!` });
};
