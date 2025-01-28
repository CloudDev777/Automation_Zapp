import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../middlewares/authentication";
import { createNewsletter } from "../controllers/newsletter.controller";
import { validateNewsletterInputMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.route("/").post(
  (req: Request, res: Response, next: NextFunction) =>
    authenticateUser(req, res, next),
  validateNewsletterInputMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    createNewsletter(req, res)
);

export default router;
