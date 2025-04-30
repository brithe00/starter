import { prisma } from "../prisma/client";
import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";

export class UserService {
  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return prisma.user.delete({
      where: { id },
    });
  }
}
