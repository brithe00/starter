import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to our Blog!</h1>
      <p>Navigate to the Posts section to see all posts.</p>
    </div>
  ),
});
