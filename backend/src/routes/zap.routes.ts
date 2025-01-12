import { NextFunction, Router, Request, Response } from "express";
import { authenticateUser } from "../middlewares/authentication";

const router = Router();

import {
  createZap,
  getAllZaps,
  getSingleZap,
} from "../controllers/zap.controller";

import { validateZapInputMiddleware } from "../middlewares/validationMiddleware";

router.route("/").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  validateZapInputMiddleware,
  (req: Request, res: Response, next: NextFunction) => createZap(req, res),
  getAllZaps
);

router.route("/").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getAllZaps(req, res),
  getAllZaps
);

router.route("/:zapId").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getSingleZap(req, res)
);

export default router;
