import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";
import assert from "node:assert";
loadEnvConfig(process.cwd());

assert(process.env.DATABASE_URL, "You need a DATABASE_URL");

export default defineConfig({
  schema: "app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  casing: "snake_case",
});
