import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../middlewares/authentication";
import { getDashboardCount } from "../controllers/dashboard.controller";

const router = Router();

router.route("/excutions").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>
    getDashboardCount(req, res)
);

export default router;
