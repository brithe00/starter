import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes = new Hono();
const userController = new UserController();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

userRoutes.get("/", (c) => userController.getUsers(c));
userRoutes.get("/:id", zValidator("param", idParamSchema), (c) =>
  userController.getUserById(c)
);
userRoutes.post("/", zValidator("json", createUserSchema), (c) =>
  userController.createUser(c)
);
userRoutes.put(
  "/:id",
  zValidator("param", idParamSchema),
  zValidator("json", updateUserSchema),
  (c) => userController.updateUser(c)
);
userRoutes.delete("/:id", zValidator("param", idParamSchema), (c) =>
  userController.deleteUser(c)
);

export default userRoutes;
