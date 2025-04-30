import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
import { z } from "zod";
import { validate } from "../validators/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";

const userRoutes = new Hono();
const userController = new UserController();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

userRoutes.get("/", (c) => userController.getUsers(c));
userRoutes.get("/:id", validate.params(idParamSchema), (c) =>
  userController.getUserById(c)
);
userRoutes.post("/", validate.body(createUserSchema), (c) =>
  userController.createUser(c)
);
userRoutes.put(
  "/:id",
  validate.params(idParamSchema),
  validate.body(updateUserSchema),
  (c) => userController.updateUser(c)
);
userRoutes.delete("/:id", validate.params(idParamSchema), (c) =>
  userController.deleteUser(c)
);

export default userRoutes;
