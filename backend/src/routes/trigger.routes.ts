import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";

const router = Router();

import {
  configureTrigger,
  createAvailableTrigger,
  deleteAvailableTrigger,
  getAvailableTrigger,
  updateAvailableTrigger,
} from "../controllers/trigger.controller";
import { validateAvailableActionInputMiddleware } from "../middlewares/validationMiddleware";
import imageUploadMiddleware from "../middlewares/multerMiddleware";

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
    imageUploadMiddleware.single("image"),
    validateAvailableActionInputMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      createAvailableTrigger(req, res)
  );

router
  .route("/:id")
  .delete(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    async (req: Request<{ id: string }>, res: Response) => {
      await deleteAvailableTrigger(req, res);
    }
  )
  .patch(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    imageUploadMiddleware.single("image"),
    validateAvailableActionInputMiddleware,
    async (req: Request<{ id: string }>, res: Response) => {
      await updateAvailableTrigger(req, res);
    }
  );

router.route("/:zapId/configure").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  async (req: Request<{ zapId: string }>, res: Response) => {
    await configureTrigger(req, res);
  }
);

export default router;
