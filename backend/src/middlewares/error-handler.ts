import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError {
  statusCode: number;
  msg: string;
}

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let customError: CustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };

  // Handle validation errors
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message)
      .join(",");
    customError.statusCode = 400;
  }


  // Handle cast errors (e.g., invalid ObjectId)
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }

  if (err instanceof PrismaClientKnownRequestError && err.code === "P2003") {
    customError.msg = `Cannot delete ${err?.meta?.modelName} because it is referenced in another record.`;
    customError.statusCode = 400;
  }

  // Send the error response
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
