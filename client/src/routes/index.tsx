import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const session = authClient.useSession();

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Welcome to our Blog!</h1>

      {session.isPending ? (
        <Card className="w-full">
          <CardContent className="pt-6 flex justify-center items-center h-40">
            <div className="animate-pulse">Loading session...</div>
          </CardContent>
        </Card>
      ) : !session.data ? (
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
                await authClient.signIn.social({
                  provider: "discord",
                  callbackURL: import.meta.env.VITE_CLIENT_URL,
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
                    src={session.data.user.image || undefined}
                    alt={session.data.user.name || "User"}
                  />
                  <AvatarFallback>
                    {session.data.user.name
                      ? session.data.user.name.substring(0, 2).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{session.data.user.name || "User"}</CardTitle>
                  <CardDescription>
                    {session.data.user.email || "No email"}
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => authClient.signOut()}
              >
                Sign out
              </Button>
            </div>
            {session.data.user.emailVerified && (
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
                {JSON.stringify(session.data, null, 2)}
              </pre>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Session expires:{" "}
            {new Date(session.data?.session.expiresAt).toLocaleString()}
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
