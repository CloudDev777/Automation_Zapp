import { string, z } from "zod";
import { prismaClient } from "../db";

export interface TokenUser {
  name: string;
  userId: number;
  role: string;
  email: string;
  image?: string | null;
  company?: string | null;
}

// Updated Zod schemas for each validation set
export const validateRegisterInput = z.object({
  name: z.string({ required_error: "name is required" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" })
    .refine(
      async (email) => {
        const user = await prismaClient.user.findUnique({ where: { email } });
        return !user;
      },
      { message: "email already exists" }
    ),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

// Infer the TypeScript type for the `validateRegisterInput` schema
export type RegisterInput = z.infer<typeof validateRegisterInput>;

export const validateLoginInput = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" }),
  password: z.string({ required_error: "password is required" }),
});
export type LoginInput = z.infer<typeof validateLoginInput>;

export const validateUpdateUserInput = z.object({
  name: z.string({ required_error: "name is required" }),
  image: z.any().optional(),
  company: z.optional(z.string()),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" })
    .superRefine(async (email, ctx) => {
      const user = await prismaClient.user.findUnique({ where: { email } });
      const reqUserId = user?.id;
      if (user && user.id !== reqUserId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "email already exists",
        });
      }
    }),
});
export type UpdateUserInput = z.infer<typeof validateUpdateUserInput>;

export const validateUpdatePasswordInput = z.object({
  oldPassword: z.string({ required_error: "oldPassword is required" }),
  newPassword: z
    .string({ required_error: "newPassword is required" })
    .min(8, { message: "password must be at least 8 characters long" }),
});
export type UpdatePasswordInput = z.infer<typeof validateUpdatePasswordInput>;

export const validateNewsletterInput = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" }),
});
export type NewsletterInput = z.infer<typeof validateNewsletterInput>;

export const validateVerifyEmailInput = z.object({
  verificationToken: z.string({
    required_error: "verificationToken is required",
  }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" }),
});
export type VerifyEmailInput = z.infer<typeof validateVerifyEmailInput>;

export const validateForgotPasswordInput = z.object({
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" }),
});
export type ForgotPasswordInput = z.infer<typeof validateForgotPasswordInput>;

export const validateResetPasswordInput = z.object({
  token: z.string({ required_error: "token is required" }),
  newPassword: z
    .string({ required_error: "newPassword is required" })
    .min(8, { message: "password must be at least 8 characters long" }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "invalid email format" }),
});
export type ResetPasswordInput = z.infer<typeof validateResetPasswordInput>;

export const zapCreateSchema = z.object({
  availableTriggerId: z
    .string({
      required_error: "availableTriggerId is required.",
      invalid_type_error: "availableTriggerId must be a string.",
    })
    .min(1, "availableTriggerId is required.")
    .uuid("availableTriggerId must be a valid UUID."),
  triggerMetadata: z.any().optional(),
  zapName: z
    .string({
      required_error: "zapName is required.",
      invalid_type_error: "zapName must be a string.",
    })
    .min(1, "zapName is required."),
  actions: z
    .array(
      z.object(
        {
          availableActionId: z
            .string({
              required_error: "availableActionId is required.",
              invalid_type_error: "availableActionId must be a string.",
            })
            .min(1, "availableActionId is required.")
            .uuid("availableActionId must be a valid UUID."),
          actionMetadata: z.any().optional(),
        },
        {
          required_error: "Object of actions are required.",
          invalid_type_error: "action must be a valid object.",
        }
      ),
      {
        required_error: "Array of actions are required.",
        invalid_type_error: "actions must be a valid object.",
      }
    )
    .min(1, "Atleast 1 action is required."),
});

export type ZapCreateInput = z.infer<typeof zapCreateSchema>;

export const createAvailableActionSchema = z.object({
  id: z.string().optional(),
  appId: z
    .string({ required_error: "AppId is required" })
    .min(1, { message: "AppId is required" }),
  name: z
    .string({ required_error: "Action name is required" })
    .min(1, { message: "Action name is required" }),
  description: z
    .string({ required_error: "description is required" })
    .min(1, { message: "description is required" }),
});

export type CreateAvailableActionInput = z.infer<
  typeof createAvailableActionSchema
>;

export const createAvailableTriggerSchema = z.object({
  id: z.string().optional(),
  appId: z
    .string({ required_error: "AppId is required" })
    .min(1, { message: "AppId is required" }),
  name: z
    .string({ required_error: "Trigger name is required" })
    .min(1, { message: "Trigger name is required" }),
  description: z
    .string({ required_error: "description is required" })
    .min(1, { message: "description is required" }),
});

export type CreateAvailableTriggerInput = z.infer<
  typeof createAvailableTriggerSchema
>;

export const createAppSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: "App name is required" }),
  description: z.string().optional(),
  image: z.string().optional(),
});

export type CreateAppInput = z.infer<typeof createAppSchema>;
