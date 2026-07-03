import { Link } from "@tanstack/react-router";
import { Home, BookOpen } from "lucide-react";

export function TopNav() {
  return (
    <div className="fixed top-4 left-4 right-4 z-40 flex justify-between pointer-events-none">
      <Link to="/" className="pointer-events-auto h-11 w-11 rounded-2xl bg-white/70 backdrop-blur border border-border flex items-center justify-center hover:bg-white transition shadow-sm" aria-label="Home">
        <Home className="h-5 w-5" />
      </Link>
      <Link to="/library" className="pointer-events-auto h-11 w-11 rounded-2xl bg-white/70 backdrop-blur border border-border flex items-center justify-center hover:bg-white transition shadow-sm" aria-label="Library">
        <BookOpen className="h-5 w-5" />
      </Link>
    </div>
  );
}
