import type { Recipe } from "@/lib/recipe.functions";
import { pickDrinkImage } from "@/lib/drink-image";

function relLum(hex: string): number {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const conv = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * conv(r) + 0.7152 * conv(g) + 0.0722 * conv(b);
}

export function RecipeCard({ recipe, index }: { recipe: Recipe; index?: number }) {
  const [c1, c2, c3] = recipe.palette;
  const bg = `linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`;
  const drink = pickDrinkImage(recipe.palette);
  // average luminance of the gradient
  const avg = (relLum(c1) + relLum(c2) + relLum(c3)) / 3;
  const isDark = avg < 0.45;
  const textMain = isDark ? "text-white" : "text-slate-900";
  const textSoft = isDark ? "text-white/80" : "text-slate-900/75";
  const textBody = isDark ? "text-white/90" : "text-slate-900/90";
  const badge = isDark ? "text-white/70" : "text-slate-900/70";

  return (
    <div
      className="group relative overflow-hidden rounded-[28px] aspect-[4/5] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
      style={{ background: bg }}
    >
      <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{
        background: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.5), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.25), transparent 60%)"
      }} />

      <img
        src={drink}
        alt=""
        loading="lazy"
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-[10%] -bottom-[10%] right-[-30%] h-[120%] w-auto object-contain object-right drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.04]"
      />

      <div className={`absolute top-5 right-5 text-xs font-semibold tracking-wider z-10 ${badge}`}>
        {typeof index === "number" ? `#${String(index + 1).padStart(2, "0")}` : ""}
      </div>
      <div className={`relative flex flex-col h-full justify-between p-6 z-10 ${textMain}`}>
        <div>
          <h3 className="font-display text-2xl font-bold max-w-[58%]">{recipe.name}</h3>
          <p className={`text-sm mt-1 italic max-w-[55%] ${textSoft}`}>{recipe.tagline}</p>
        </div>
        <p className={`text-sm max-w-[55%] leading-snug ${textBody}`}>
          {recipe.description.length > 100 ? recipe.description.slice(0, 98) + "…" : recipe.description}
        </p>
      </div>
    </div>
  );
}
