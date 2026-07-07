import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { loadLibrary } from "@/lib/library-store";
import type { Recipe } from "@/lib/recipe.functions";


export const Route = createFileRoute("/library")({ component: Library });

function Library() {
  const [list, setList] = useState<Recipe[]>([]);
  useEffect(() => { setList(loadLibrary()); }, []);

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 max-w-6xl mx-auto">
      <TopNav />
      <h1 className="text-4xl md:text-5xl font-semibold text-center">Your Library</h1>
      <p className="text-muted-foreground mt-2 text-center">Every memory you've turned into a drink.</p>

      {list.length === 0 ? (
        <div className="mt-16 rounded-[32px] bg-white/70 backdrop-blur border border-border p-12 text-center">
          <p className="text-muted-foreground">No recipes yet. Turn your first memory into a drink.</p>
          <Link to="/create" className="btn-primary inline-flex mt-6 rounded-full px-6 py-3 font-medium">Create a recipe</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <RecipeCard recipe={r} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
