import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z
    .string()
    .min(2, { message: "The name must contain at least 2 characters" })
    .optional(),
  password: z
    .string()
    .min(6, { message: "The password must contain at least 6 characters" }),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "The name must contain at least 2 characters" })
    .optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;
