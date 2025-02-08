import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";
import imageUploadMiddleware from "../middlewares/multerMiddleware";
const router = Router();

import {
  configureAction,
  createAvailableAction,
  deleteAvailableAction,
  getAvailableAction,
  updateAvailableAction,
} from "../controllers/action.controller";
import { validateAvailableActionInputMiddleware } from "../middlewares/validationMiddleware";

router
  .route("/")
  .get(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    (req: Request, res: Response, next: NextFunction) =>
      getAvailableAction(req, res)
  )
  .post(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    imageUploadMiddleware.single("image"),
    validateAvailableActionInputMiddleware,
    (req: Request, res: Response, next: NextFunction) =>
      createAvailableAction(req, res)
  );

router
  .route("/:id")
  .delete(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    async (req: Request<{ id: string }>, res: Response) => {
      await deleteAvailableAction(req, res);
    }
  )
  .patch(
    (req: Request, res: Response, next: NextFunction) =>
      authenticateUser(req, res, next),
    authorizePermissions("admin"),
    imageUploadMiddleware.single("image"),
    validateAvailableActionInputMiddleware,
    async (req: Request<{ id: string }>, res: Response) => {
      await updateAvailableAction(req, res);
    }
  );

router.route("/:zapId/configure").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  async (req: Request, res: Response) => {
    await configureAction(req, res);
  }
);

export default router;
