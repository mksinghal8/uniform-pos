'use server'

import { createSession } from "@/app/_auth/session";
import { FormState, signUpSchema } from "@/app/(auth)/_auth/validation";
import db from "@/prisma";
import bcrypt from "bcrypt";
// @ts-ignore
export async function signUp(_currentState: FormState, formData: FormData): Promise<FormState> {
  //1. Validate Fields
  console.log("Attemoting signup")
  const validationResult = signUpSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password')

  });
  console.log(validationResult)
  if (!validationResult.success) {
    console.log("Validation has failed")
    return {
      errors: validationResult.error.flatten().fieldErrors
    }
  }

  const { username, password } = validationResult.data;

  //2. Create User


  //If username already exists, return with message
  const existingUsername = await db.user.findFirst({
    where: {
      userName: {
        equals: username,
        mode: "insensitive",
      },
    },
  });

  if (existingUsername) {
    return {
      message: "Username already taken",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed pass: ", hashedPassword);

  const newUser = await db.user.create({
    data: {
      userName: username,
      hashedPassword: hashedPassword,
      name: username,
      role: 'sales'
    },
  })

  if (!newUser) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }

  //3. Create session
  const session = await createSession(newUser.id, newUser.role);



}