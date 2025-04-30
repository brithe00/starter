import {
  createRootRouteWithContext,
  Outlet,
  Link,
} from "@tanstack/react-router";
import { RouterContext } from "../router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div className="min-h-screen p-4 bg-gray-50">
      <nav className="mb-6 pb-4 border-b">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 [&.active]:font-bold"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <main className="container mx-auto">
        <Outlet />
      </main>

      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  ),
  errorComponent: ({ error }) => {
    return (
      <div className="p-6 bg-red-50 text-red-800 rounded-lg">
        <h1 className="text-xl font-bold mb-2">Error</h1>
        <p>{error.message}</p>
      </div>
    );
  },
});
