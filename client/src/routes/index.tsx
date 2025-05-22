import { authClient } from "@/lib/auth-client";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
// It's good practice to define query keys in a constants file, but for this task, we'll define it here.
const sessionQueryKey = ["auth", "session"];
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const homeSearchSchema = z.object({
  returnTo: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(homeSearchSchema), // Keep existing validateSearch
  loader: async (loaderContext) => {
    const queryClient = loaderContext.context.queryClient;
    const auth = loaderContext.context.auth;

    return queryClient.ensureQueryData({
      queryKey: sessionQueryKey,
      queryFn: async () => {
        try {
          // Assuming getSession is the correct promise-based method from authClient
          const sessionData = await auth.getSession();
          return sessionData;
        } catch (err) {
          console.error("Failed to fetch session in loader:", err);
          // Return null or handle as appropriate for your auth library when no session exists
          return null;
        }
      },
    });
  },
  component: HomeComponent, // Keep existing component
});

function HomeComponent() {
  const sessionData = Route.useLoaderData(); // Use data from loader
  const search = useSearch({ from: "/" });

  // Note: Tanstack Query's useQuery also provides isPending, isError, error states
  // which could be used for a more granular UI. For this step, we'll rely on
  // sessionData being null or having data, as returned by the loader.

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Welcome to our Blog!</h1>
      {/* 
        The loader ensures data is available or null if fetch failed/no session.
        A more robust solution might involve Tanstack Query's useQuery here
        to handle loading/error states if not using `defer` or `useSuspenseQuery`.
        However, since `ensureQueryData` in the loader would have already fetched
        or thrown, we can directly check sessionData.
        If `sessionData` could be undefined during loading (e.g. using `defer`),
        a loading check would be needed here.
      */}
      {!sessionData ? ( // Check if sessionData is null or undefined (if error/no session)
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please sign in to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={async () =>
                // Assuming authClient is still desired for initiating sign-in
                // The loader context provides `auth` for data fetching,
                // but UI actions might still use the imported authClient directly.
                await authClient.signIn.social({
                  provider: "discord",
                  callbackURL:
                    import.meta.env.VITE_CLIENT_URL +
                    (search.returnTo || "/dashboard"),
                })
              }
              className="w-full sm:w-auto"
            >
              Sign in with Discord
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={sessionData.user.image || undefined} // Use sessionData
                    alt={sessionData.user.name || "User"} // Use sessionData
                  />
                  <AvatarFallback>
                    {sessionData.user.name // Use sessionData
                      ? sessionData.user.name.substring(0, 2).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{sessionData.user.name || "User"}</CardTitle> {/* Use sessionData */}
                  <CardDescription>
                    {sessionData.user.email || "No email"} {/* Use sessionData */}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                // Assuming authClient is still used for sign-out action
                onClick={() => authClient.signOut()}
              >
                Sign out
              </Button>
            </div>
            {sessionData.user.emailVerified && ( // Use sessionData
              <Badge
                variant="outline"
                className="ml-14 bg-green-50 text-green-700 border-green-200"
              >
                Email verified
              </Badge>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="pt-5">
            <h3 className="text-sm font-medium mb-3">Session Details</h3>
            <div className="bg-muted p-3 rounded-md overflow-auto max-h-[300px]">
              <pre className="text-xs text-muted-foreground">
                {JSON.stringify(sessionData, null, 2)} {/* Use sessionData */}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Session expires:{" "}
            {new Date(sessionData.session.expiresAt).toLocaleString()} {/* Use sessionData */}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
