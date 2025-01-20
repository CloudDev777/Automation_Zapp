import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";

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
  authorizePermissions("admin"),
  validateZapInputMiddleware,
  (req: Request, res: Response, next: NextFunction) => createZap(req, res)
);

router.route("/").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getAllZaps(req, res)
);

router.route("/:zapId").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getSingleZap(req, res)
);

export default router;
