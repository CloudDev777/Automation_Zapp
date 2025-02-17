import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";

const router = Router();

import {
  createZap,
  deleteZap,
  getAllZaps,
  getSingleZap,
  publishZap,
  toggleZap,
} from "../controllers/zap.controller";

router.route("/").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => createZap(req, res)
);

router.route("/").get(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => getAllZaps(req, res)
);

router
  .route("/:zapId")
  .get(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    (req: Request, res: Response, next: NextFunction) => getSingleZap(req, res)
  )
  .delete(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    (req: Request, res: Response, next: NextFunction) => deleteZap(req, res)
  );

router.route("/:zapId/publish").patch(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => publishZap(req, res)
);

router.route("/:zapId/toggle").patch(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => toggleZap(req, res)
);

export default router;
