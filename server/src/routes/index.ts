import { Hono } from "hono";
import userRoutes from "./user.route";

const api = new Hono();

api.get("/health", (c) => c.json({ status: "ok" }));

api.route("/users", userRoutes);

export default api;
