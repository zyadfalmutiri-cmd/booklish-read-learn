import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/library/book/$slug")({
  component: BookLayout,
});

function BookLayout() {
  return <Outlet />;
}
