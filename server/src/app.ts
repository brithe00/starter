import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import apiRoutes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { env } from "./config/env";
import { auth } from "./lib/auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use("*", logger());
app.use("*", prettyJSON());

app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (session) {
    c.set("user", session.user);
    c.set("session", session.session);
  } else {
    c.set("user", null);
    c.set("session", null);
  }
  return next();
});

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.route("/api", apiRoutes);

app.get("/", (c) => c.json({ message: "API is running" }));

app.notFound((c) => c.json({ message: "Not Found" }, 404));

app.use("*", errorMiddleware);

export default app;
