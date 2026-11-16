"use server";

import { createSession, hashPassword } from "@/lib/auth";
import { ActionResponse } from "@/lib/types";
import { signUpSchema } from "@/lib/validations";
import { flattenError } from "zod";
import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { redirect } from "next/navigation";

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
