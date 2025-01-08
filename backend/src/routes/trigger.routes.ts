import { NextFunction, Router, Request, Response } from "express";
import { authenticateUser } from "../middlewares/authentication";

const router = Router();

import { getAvailableTrigger } from "../controllers/trigger.controller";

router.route("/available").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    getAvailableTrigger(req, res)
);

export default router;
