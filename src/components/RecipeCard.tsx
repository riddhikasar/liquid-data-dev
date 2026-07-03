import type { Recipe } from "@/lib/recipe.functions";
import { pickDrinkImage } from "@/lib/drink-image";

export function RecipeCard({ recipe, index }: { recipe: Recipe; index?: number }) {
  const [c1, c2, c3] = recipe.palette;
  const bg = `linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
  const drink = pickDrinkImage(recipe.palette);
  return (
    <div
      className="group relative overflow-hidden rounded-[28px] aspect-[4/5] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
      style={{ background: bg }}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{
        background: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.25), transparent 60%)"
      }} />

      {/* Full-bleed drink illustration — fills card top→bottom, anchored far right */}
      <img
        src={drink}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-2 -bottom-2 right-[-22%] h-[calc(100%+16px)] w-auto object-contain object-right drop-shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.04] mix-blend-luminosity opacity-95"
      />
      <img
        src={drink}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-2 -bottom-2 right-[-22%] h-[calc(100%+16px)] w-auto object-contain object-right opacity-55 transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.04]"
      />

      <div className="absolute top-5 right-5 text-white/90 text-xs font-semibold tracking-wider drop-shadow z-10">
        {typeof index === "number" ? `#${String(index + 1).padStart(2, "0")}` : ""}
      </div>
      <div className="relative flex flex-col h-full justify-between text-white p-6 z-10">
        <div>
          <h3 className="font-display text-2xl font-bold drop-shadow-sm max-w-[65%]">{recipe.name}</h3>
          <p className="text-sm text-white/85 mt-1 italic max-w-[60%]">{recipe.tagline}</p>
        </div>
        <p className="text-sm text-white/95 max-w-[60%] leading-snug drop-shadow-sm">
          {recipe.description.length > 100 ? recipe.description.slice(0, 98) + "…" : recipe.description}
        </p>
      </div>
    </div>
  );
}
