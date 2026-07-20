import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/library/book/$slug/chapter/$chapterIndex")({
  component: ChapterLayout,
});

function ChapterLayout() {
  return <Outlet />;
}
