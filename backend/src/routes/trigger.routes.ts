import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";

const router = Router();

import {
  createAvailableTrigger,
  deleteAvailableTrigger,
  getAvailableTrigger,
} from "../controllers/trigger.controller";
import { validateAvailableActionInputMiddleware } from "../middlewares/validationMiddleware";

router
  .route("/")
  .get(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    (req: Request, res: Response, next: NextFunction) =>
      getAvailableTrigger(req, res)
  )
  .post(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    validateAvailableActionInputMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      createAvailableTrigger(req, res)
  );

router.route("/:id").delete(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  authorizePermissions("admin"),
  async (req: Request<{ id: string }>, res: Response) => {
    await deleteAvailableTrigger(req, res);
  }
);

export default router;
