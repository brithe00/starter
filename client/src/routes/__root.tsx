import {
  createRootRouteWithContext,
  Outlet,
  // Link, // Link is no longer used directly here
} from "@tanstack/react-router";
import { RouterContext } from "../router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainAppLayout } from '@/components/layouts/MainAppLayout'; // New import

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async ({ context }) => {
    // Define the query key for session data.
    // In a larger application, this might be imported from a shared constants file.
    const sessionQueryKey = ['auth', 'session'];

    try {
      // Use ensureQueryData to fetch the session data if it's not already cached,
      // or return the cached data if it is.
      // The 'auth' and 'queryClient' are available on the context as defined in router.tsx.
      const sessionData = await context.queryClient.ensureQueryData({
        queryKey: sessionQueryKey,
        queryFn: async () => {
          try {
            // Attempt to get the current session using the auth client.
            const session = await context.auth.getSession();
            return session;
          } catch (error) {
            // If getSession() fails (e.g., user not authenticated, network error),
            // log the error and return null to indicate no active session.
            console.error("Root loader - Failed to fetch session in queryFn:", error);
            return null;
          }
        },
      });
      return sessionData;
    } catch (error) {
      // This catch block handles errors from ensureQueryData itself, which is less common
      // for this setup but good practice to include.
      console.error("Root loader - Error in ensureQueryData:", error);
      // Return null if ensureQueryData fails, ensuring the app can still load.
      return null;
    }
  },
  component: () => (
    <> {/* Use a fragment as DevTools are outside MainAppLayout at the same level */}
      <MainAppLayout /> {/* This now renders the navbar and its own Outlet for routes */}
      {/* Outlet is no longer needed here as MainAppLayout has its own */}
      <TanStackRouterDevtools initialIsOpen={false} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
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
