import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { getCurrent, saveToLibrary, setCurrent } from "@/lib/library-store";
import { pickDrinkImage } from "@/lib/drink-image";
import type { Recipe } from "@/lib/recipe.functions";

export const Route = createFileRoute("/recipe")({ component: RecipePage });

function RecipePage() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const r = getCurrent();
    if (!r) { navigate({ to: "/create" }); return; }
    setRecipe(r);
  }, [navigate]);

  if (!recipe) return <div className="min-h-screen" />;
  const [c1, c2, c3] = recipe.palette;
  const bg = `linear-gradient(135deg, ${c1} 0%, ${c2} 50%, ${c3} 100%)`;

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 max-w-5xl mx-auto">
      <TopNav />
      <h1 className="text-4xl md:text-5xl font-bold animate-fade-up">Your Memory Has Been Transformed</h1>

      <div className="mt-10 relative rounded-[32px] overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.3)] animate-fade-up" style={{ animationDelay: "0.15s", background: bg }}>
        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
          background: "radial-gradient(ellipse at 75% 25%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.2), transparent 60%)"
        }} />
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-6 p-8 md:p-12 text-white">
          <div>
            <h2 className="font-display text-4xl font-bold drop-shadow">{recipe.name}</h2>
            <p className="mt-3 text-white/90 text-lg max-w-md">{recipe.tagline}</p>
            <p className="mt-6 text-white/95 leading-relaxed max-w-lg">{recipe.description}</p>

            {recipe.ingredients.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {recipe.ingredients.map((ing) => (
                  <li key={ing} className="text-xs px-3 py-1.5 rounded-full bg-white/25 backdrop-blur text-white/95 border border-white/30">{ing}</li>
                ))}
              </ul>
            )}

            <blockquote className="mt-8 italic text-white/90 max-w-lg border-l-2 border-white/40 pl-4">
              "{recipe.memory}"
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => { saveToLibrary(recipe); setSaved(true); }}
                className="btn-primary rounded-full px-6 py-3 font-medium"
              >Save to Library</button>
              <Link to="/create" onClick={() => setCurrent(null)} className="btn-ghost-pill rounded-full px-6 py-3 font-medium">Create Another</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center relative">
            <div aria-hidden className="absolute inset-0 blur-3xl opacity-60" style={{
              background: `radial-gradient(circle at 50% 50%, ${c1}, transparent 65%)`
            }} />
            <img
              src={pickDrinkImage(recipe.palette)}
              alt=""
              className="relative h-[380px] w-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] animate-float"
            />
          </div>
        </div>
      </div>

      {saved && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 animate-slide-fade px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative">
            <button onClick={() => setSaved(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            <h3 className="text-2xl font-bold">Saved To Library</h3>
            <p className="mt-2 text-muted-foreground">A recipe of your memory has been added to the collection.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/library" className="btn-ghost-pill rounded-full px-5 py-2.5 font-medium">Go to Library</Link>
              <Link to="/create" onClick={() => setCurrent(null)} className="btn-primary rounded-full px-5 py-2.5 font-medium">Create Another</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
