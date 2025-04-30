import { Context } from "hono";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(c: Context) {
    const users = await this.userService.getUsers();
    return c.json(users);
  }

  async getUserById(c: Context) {
    const { id } = c.req.param();
    const user = await this.userService.getUserById(id);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user);
  }

  async createUser(c: Context) {
    const data = c.req.valid("json");
    const user = await this.userService.createUser(data);
    return c.json(user);
  }

  async updateUser(c: Context) {
    const { id } = c.req.param();
    const data = c.req.valid("json");
    const user = await this.userService.updateUser(id, data);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user);
  }

  async deleteUser(c: Context) {
    const { id } = c.req.param();
    const success = await this.userService.deleteUser(id);
    if (!success) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "User deleted" });
  }
}
