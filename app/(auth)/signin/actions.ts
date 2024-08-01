'use server'

import { createSession } from "../_auth/session";
import { FormState, signInSchema } from "../_auth/validation";
import db from "@/prisma";
import bcrypt from "bcrypt";
import { isRedirectError } from "next/dist/client/components/redirect";
// @ts-ignore
export async function signIn(_currentState: FormState, formData: FormData): Promise<FormState> {
  
  try {
    const validationResult = signInSchema.safeParse({
      username: formData.get('username'),
      password: formData.get('password')

    });

    if (!validationResult.success) {
      console.log("Validation has failed")
      return {
        errors: validationResult.error.flatten().fieldErrors
      }
    }

    const { username, password } = validationResult.data;

    const existingUser = await db.user.findFirst({
      where: {
        userName: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (!existingUser || !existingUser.hashedPassword) {
      return {
        message: "Incorrect username or password",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.hashedPassword);

    if (!isPasswordValid) {
      return {
        message: "Incorrect username or password"
      }

    }

    const session = await createSession(existingUser.id, existingUser.role);

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      message: "Something went wrong. Please try again.",
    };
  }
}