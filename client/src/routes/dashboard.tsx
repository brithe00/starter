import { createFileRoute } from "@tanstack/react-router";
import { authGuard } from "../router/guards/auth-guard";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: authGuard,
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>;
}
