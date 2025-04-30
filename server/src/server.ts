import { serve } from "@hono/node-server";
import app from "./app";
import { env } from "./config/env";

const port = parseInt(env.PORT, 10);

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 Server running on port ${port}`);
