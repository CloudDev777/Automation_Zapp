import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../middlewares/authentication";
import { getConnections, oAuthCallback, oAuthGmail } from "../controllers/oauth.controller";

const router = Router();

router.get(
  "/gmail",
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => oAuthGmail(req, res)
);

router.get(
  "/callback",
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => oAuthCallback(req, res)
);

router.get(
  "/connections",
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getConnections(req, res)
);

export default router;
