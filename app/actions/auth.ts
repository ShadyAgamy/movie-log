"use server";

import {
  createSession,
  deleteSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { ActionResponse } from "@/lib/types";
import { signInSchema, signUpSchema } from "@/lib/validations";
import { flattenError } from "zod";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const signUp = async (
  _prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: flattenError(result.error).fieldErrors,
      inputs: {
        username: String(data.username ?? ""),
        email: String(data.email ?? ""),
      },
    };
  }

  const hashedPassword = await hashPassword(result.data.password);
  const { email, username } = result.data;

  const [user] = await db
    .insert(users)
    .values({ email, username, password: hashedPassword })
    .onConflictDoNothing()
    .returning({ id: users.id });

  if (!user) {
    return {
      success: false,
      message: "Email or username already exists",
      inputs: {
        username,
        email,
      },
    };
  }
  await createSession(user.id);
  redirect("/");
};

export const signIn = async (
  _prevState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = signInSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: flattenError(result.error).fieldErrors,
      inputs: {
        email: String(data.email ?? ""),
      },
    };
  }

  const { email, password } = result.data;

  const [user] = await db
    .select({
      password: users.password,
      id: users.id,
    })
    .from(users)
    .where(eq(users.email, email));

  if (!user || !(await verifyPassword(password, user.password))) {
    return {
      success: false,
      message: "Email or password is wrong",
      inputs: {
        email,
      },
    };
  }

  await createSession(user.id);
  redirect("/");
};

export const signOut = async () => {
  await deleteSession();
  redirect("/sign-in");
};
