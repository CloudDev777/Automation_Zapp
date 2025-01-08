import { NextFunction, Router, Request, Response } from "express";
import { authenticateUser } from "../middlewares/authentication";

const router = Router();

import { getAvailableAction } from "../controllers/action.controller";

router.route("/available").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    getAvailableAction(req, res)
);

export default router;
