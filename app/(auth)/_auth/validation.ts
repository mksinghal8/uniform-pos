import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export const signInSchema = z.object({
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Only letters, numbers, - and _ allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type FormState =
  | {
    errors?: {
      name?: string[];
      username?: string[];
      password?: string[];
    };
    message?: string;
  }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  role: string
  expiresAt: Date;
};

export type SignUpValues = z.infer<typeof signUpSchema>;