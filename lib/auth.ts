import "server-only";
import bcrypt from "bcryptjs";
import { db } from "@/app/db";
import { sessions, users } from "@/app/db/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => bcrypt.compare(password, hashedPassword);

const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
const authSession = "auth_session";

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + sevenDaysMs);

  const [{ id }] = await db
    .insert(sessions)
    .values({ userId, expiresAt })
    .returning({ id: sessions.id });

  const cookieStore = await cookies();
  cookieStore.set({
    name: authSession,
    value: id,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
    sameSite: "lax",
  });
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(authSession)?.value;
  if (!sessionId || !z.uuid().safeParse(sessionId).success) return null;

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));
  if (!session) return null;

  if (session.expiresAt < new Date()) return null;

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      username: users.username,
    })
    .from(users)
    .where(eq(users.id, session.userId));
  return user ?? null;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(authSession)?.value;
  cookieStore.delete(authSession);
  if (!sessionId || !z.uuid().safeParse(sessionId).success) return;
  await db.delete(sessions).where(eq(sessions.id, sessionId));
};
