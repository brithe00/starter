import { RouterContext } from "@/router";
import { redirect } from "@tanstack/react-router";

export function authGuard({ context }: { context: RouterContext }) {
  const { auth } = context;

  return auth.getSession().then(({ data: session, error }) => {
    if (!session || error) {
      throw redirect({
        to: "/",
        search: {
          returnTo: window.location.pathname + window.location.search,
        },
      });
    }

    return { session };
  });
}
