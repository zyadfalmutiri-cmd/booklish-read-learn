import { Link } from "@tanstack/react-router";
import { Moon, Sun, BookOpen } from "lucide-react";
import { useSettings } from "./theme";

export function Header() {
  const [settings, setSettings, hydrated] = useSettings();
  const toggle = () =>
    setSettings({ ...settings, theme: settings.theme === "dark" ? "light" : "dark" });

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-2 px-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight">
          <BookOpen className="h-5 w-5 text-primary" />
          <span>Booklish</span>
        </Link>
        <nav className="ml-2 flex flex-1 items-center gap-1 text-sm sm:gap-4 sm:text-[15px]">
          <NavItem to="/library">Library</NavItem>
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/vocab">Vocab</NavItem>
        </nav>
        <button
          aria-label="Toggle theme"
          onClick={toggle}
          className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
        >
          {hydrated && settings.theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      activeProps={{ className: "rounded-md px-2 py-1.5 text-foreground bg-muted" }}
    >
      {children}
    </Link>
  );
}
