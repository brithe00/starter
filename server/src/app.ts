import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import apiRoutes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = new Hono();

app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", cors());
app.use("*", errorMiddleware);

app.route("/api", apiRoutes);

app.get("/", (c) => c.json({ message: "API is running" }));

app.notFound((c) => c.json({ message: "Not Found" }, 404));

export default app;
