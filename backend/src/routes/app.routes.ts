import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";

import { validateAppInputMiddleware } from "../middlewares/validationMiddleware";
import imageUploadMiddleware from "../middlewares/multerMiddleware";

import {
  createApp,
  getAllApps,
  updateApp,
  deleteApp,
} from "../controllers/app.controller";

const router = Router();

router
  .route("/")
  .get(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    (req: Request, res: Response, next: NextFunction) => getAllApps(req, res)
  )
  .post(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    imageUploadMiddleware.single("image"),
    validateAppInputMiddleware,
    (req: Request, res: Response, next: NextFunction) => createApp(req, res)
  );

router
  .route("/:id")
  .delete(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    async (req: Request<{ id: string }>, res: Response) => {
      await deleteApp(req, res);
    }
  )
  .patch(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    imageUploadMiddleware.single("image"),
    validateAppInputMiddleware,
    async (req: Request<{ id: string }>, res: Response) => {
      await updateApp(req, res);
    }
  );

export default router;
