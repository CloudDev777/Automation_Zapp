import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { UnauthenticatedError } from "../errors";
import {
  createTokenUser,
  attachCookiesToResponse,
  comparePassword,
  hashPassword,
} from "../utils";

import { prismaClient } from "../db";
import { TokenUser, UpdatePasswordInput, UpdateUserInput } from "../types";
import { uploadFileToFirebase } from "../middlewares/firebaseUploader";

export const showCurrentUser = async (
  req: Request,
  res: Response<{ user: TokenUser | undefined }>
) => {
  res.status(StatusCodes.OK).json({ user: req?.user });
};

// Update user information
export const updateUser = async (
  req: Request<{}, {}, UpdateUserInput>,
  res: Response<{ user: TokenUser }>
) => {
  // Check if files are included in the request
  if (req.file) {
    // Format and upload screenshot to Firebase
    const fireBaseResponse = await uploadFileToFirebase(req.file);

    req.body.image = fireBaseResponse.downloadURL;
  }
  // Update the user with Prisma
  const user = await prismaClient.user.update({
    where: { id: Number(req.user?.userId) },
    data: req.body,
  });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser, refreshToken: "" });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

// Update user password
export const updateUserPassword = async (
  req: Request<{}, {}, UpdatePasswordInput>,
  res: Response<{ msg: string }>
) => {
  const { oldPassword, newPassword } = req.body;

  const user = await prismaClient.user.findUnique({
    where: { id: Number(req.user?.userId) },
  });

  if (!user) {
    throw new UnauthenticatedError("User not found");
  }

  // Check if the old password is correct
  const isPasswordCorrect = await comparePassword(oldPassword, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Hash the new password
  const hashedNewPassword = await hashPassword(newPassword);

  // Update the password with Prisma
  await prismaClient.user.update({
    where: { id: Number(req.user?.userId) },
    data: { password: hashedNewPassword },
  });

  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated." });
};
