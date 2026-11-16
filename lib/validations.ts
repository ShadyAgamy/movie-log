import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),
  username: z
    .string()
    .trim()
    .toLowerCase()
    .min(4, "Username must be at least 4 characters")
    .max(25, "Username must be 25 characters or fewer")
    .regex(/^[a-z0-9_-]+$/, "Use only letters, numbers, - and _"),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be 72 characters or fewer"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email address")),
  password: z.string().trim().min(1, "Enter your password"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
