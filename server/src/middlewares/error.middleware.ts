import { Context, Next } from "hono";

export const errorMiddleware = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return c.json(
        {
          message: error.message || "An unknown error occurred",
        },
        {
          status: 500,
        }
      );
    }

    return c.json(
      {
        message: "An unknown error occurred",
      },
      {
        status: 500,
      }
    );
  }
};
