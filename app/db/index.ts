import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import assert from "node:assert";
import * as schema from "./schema";

assert(process.env.DATABASE_URL_POOLED, "You need a DATABASE_URL_POOLED");

export const db = drizzle({
  client: neon(process.env.DATABASE_URL_POOLED),
  schema,
  casing: "snake_case",
});
