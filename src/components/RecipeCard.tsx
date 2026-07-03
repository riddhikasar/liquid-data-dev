import type { Recipe } from "@/lib/recipe.functions";

export function RecipeCard({ recipe, index }: { recipe: Recipe; index?: number }) {
  const [c1, c2, c3] = recipe.palette;
  const bg = `linear-gradient(135deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
  return (
    <div
      className="relative overflow-hidden rounded-[28px] p-6 aspect-[4/5] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
      style={{ background: bg }}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{
        background: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.25), transparent 60%)"
      }} />
      <div className="absolute top-4 right-4 text-white/80 text-xs font-medium tracking-wider">
        {typeof index === "number" ? `#${String(index + 1).padStart(2, "0")}` : ""}
      </div>
      <div className="absolute bottom-24 right-4 text-6xl opacity-90 drop-shadow-lg">{recipe.emoji}</div>
      <div className="relative flex flex-col h-full justify-between text-white">
        <div>
          <h3 className="font-display text-2xl font-bold drop-shadow-sm">{recipe.name}</h3>
          <p className="text-sm text-white/85 mt-1 italic max-w-[80%]">{recipe.tagline}</p>
        </div>
        <p className="text-sm text-white/90 max-w-[75%] leading-snug">
          {recipe.description.length > 110 ? recipe.description.slice(0, 108) + "…" : recipe.description}
        </p>
      </div>
    </div>
  );
}
