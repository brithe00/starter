import { Context } from "hono";
import { UserService } from "../services/user.service";
import {
  UserResponse,
  CreateUserInput,
  UpdateUserInput,
} from "../schemas/user.schema";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  /**
   * Get all users
   */
  async getUsers(c: Context): Promise<Response> {
    const users = await this.userService.getUsers();
    return c.json(users as UserResponse[]);
  }

  /**
   * Get user by ID
   */
  async getUserById(c: Context): Promise<Response> {
    const { id } = c.req.valid("param") as { id: string };
    const user = await this.userService.getUserById(id);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user as UserResponse);
  }

  /**
   * Create a new user
   */
  async createUser(c: Context): Promise<Response> {
    const data = c.req.valid("json") as CreateUserInput;
    const user = await this.userService.createUser(data);
    return c.json(user as UserResponse, 201);
  }

  /**
   * Update an existing user
   */
  async updateUser(c: Context): Promise<Response> {
    const { id } = c.req.valid("param") as { id: string };
    const data = c.req.valid("json") as UpdateUserInput;
    const user = await this.userService.updateUser(id, data);
    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json(user as UserResponse);
  }

  /**
   * Delete a user
   */
  async deleteUser(c: Context): Promise<Response> {
    const { id } = c.req.valid("param") as { id: string };
    const success = await this.userService.deleteUser(id);
    if (!success) {
      return c.json({ message: "User not found" }, 404);
    }
    return c.json({ message: "User deleted" });
  }
}
