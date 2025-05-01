import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("8000"),
  DATABASE_URL: z.string(),
  CORS_ORIGIN: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error("❌ Invalid environment variables:", result.error.format());
  throw new Error("Invalid environment variables");
}

export const env = result.data;
