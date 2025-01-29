import { NextFunction, Router, Request, Response } from "express";
import {
  authenticateUser,
  authorizePermissions,
} from "../middlewares/authentication";
import imageUploadMiddleware from "../middlewares/multerMiddleware";
const router = Router();

import {
  createAvailableAction,
  deleteAvailableAction,
  getAvailableAction,
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

router.route("/:id").delete(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  authorizePermissions("admin"),
  async (req: Request<{ id: string }>, res: Response) => {
    await deleteAvailableAction(req, res);
  }
);

export default router;
