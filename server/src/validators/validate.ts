import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const validate = {
  body: <T extends z.ZodTypeAny>(schema: T) => zValidator("json", schema),
  params: <T extends z.ZodTypeAny>(schema: T) => zValidator("param", schema),
  query: <T extends z.ZodTypeAny>(schema: T) => zValidator("query", schema),
};
