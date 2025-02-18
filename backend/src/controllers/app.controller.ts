import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { prismaClient } from "../db";
import { CreateAppInput } from "../types";
import { BadRequestError, InternalServerError, NotFoundError } from "../errors";
import { FirebaseImageHandler } from "../middlewares/firebaseUploader";

export const createApp = async (
  req: Request<{}, {}, CreateAppInput>,
  res: Response
) => {
  let { name, image, description } = req.body;

  const exists = await prismaClient.app.findFirst({
    where: { name },
  });

  if (exists) {
    throw new BadRequestError(`App with name: ${name} already exists!`);
  }

  if (req.file) {
    const res = await FirebaseImageHandler.uploadImage(req.file);
    if (!res) {
      throw new InternalServerError("Error uploading image");
    }
    image = res?.downloadURL;
  }

  const app = await prismaClient.app.create({
    data: {
      name,
      icon: image,
      description,
    },
  });

  res.status(StatusCodes.OK).json({ app });
};

export const getAllApps = async (req: Request, res: Response) => {
  const apps = await prismaClient.app.findMany({});
  res.status(StatusCodes.OK).json({ apps });
};

export const updateApp = async (
  req: Request<{ id: string }, {}, CreateAppInput>,
  res: Response
) => {
  const { id } = req.params;
  let { name, image } = req.body;
  const exists = await prismaClient.app.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(`App with id: ${id} does not exists!`);
  }

  if (req.file) {
    const res = await FirebaseImageHandler.updateImage({
      oldImageUrl: image || "",
      newImage: req.file,
    });
    if (!res) {
      throw new InternalServerError("Unable to update image.");
    }
    image = res.downloadURL;
  }

  const app = await prismaClient.app.update({
    where: {
      id,
    },
    data: {
      name,
      icon: image,
    },
  });

  res.status(StatusCodes.OK).json({ app });
};

export const deleteApp = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  const exists = await prismaClient.app.findFirst({
    where: { id },
  });

  if (!exists) {
    throw new NotFoundError(`App with id: ${id} does not exists!`);
  }

  await prismaClient.app.delete({
    where: {
      id,
    },
  });
  await FirebaseImageHandler.deleteImage(exists.icon!);

  res
    .status(StatusCodes.OK)
    .json({ msg: `App with id: ${id} is deleted successfully!` });
};
