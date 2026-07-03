import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Sparkles, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { TopNav } from "@/components/TopNav";
import { Orb } from "@/components/Orb";
import { RecipeCard } from "@/components/RecipeCard";
import { loadLibrary } from "@/lib/library-store";
import type { Recipe } from "@/lib/recipe.functions";

export const Route = createFileRoute("/")({ component: Index });

const SAMPLES: Recipe[] = [
  { id: "s1", name: "Crisp Skyline", tagline: "A new city, mingled with independence.", description: "Bright green apple crackle over crushed mint and a whisper of cold rain.", ingredients: [], palette: ["#c8e6a0", "#8fd48a", "#4fa87a"], emoji: "🍏", memory: "" },
  { id: "s2", name: "Starlight Tears", tagline: "Lonesome angst wrapped in comforting growth.", description: "Deep blueberry meets vanilla cream, finished with a sparkle of citrus.", ingredients: [], palette: ["#a6c8ff", "#6a8fe0", "#3b4a9e"], emoji: "⭐", memory: "" },
  { id: "s3", name: "Golden Playground", tagline: "Childhood playgrounds, summer friends, sweet nostalgia.", description: "Bright ripe citrus and sugar open into strawberry popsicle sweetness.", ingredients: [], palette: ["#ffd68a", "#ff9a76", "#f26d5b"], emoji: "🍅", memory: "" },
  { id: "s4", name: "Blushing Love", tagline: "New love, stolen glances, soft smiles.", description: "Rose-pink strawberry and lychee with a hush of pomegranate fizz.", ingredients: [], palette: ["#ffb3c1", "#ff6b8a", "#e63959"], emoji: "🍓", memory: "" },
  { id: "s5", name: "Bright Awards", tagline: "Unrivaled victory, mingled with gratitude.", description: "Golden pineapple and honey lifted by sparkling ginger.", ingredients: [], palette: ["#ffe27a", "#f5b400", "#d18700"], emoji: "🍋", memory: "" },
  { id: "s6", name: "Quiet Embroidery", tagline: "Grandma's stories, fond memories, old adventures.", description: "Warm chai spice, brown sugar, and toasted almond milk.", ingredients: [], palette: ["#e8c68a", "#c99a5a", "#8f5f2e"], emoji: "🧋", memory: "" },
];

function Index() {
  const [library, setLibrary] = useState<Recipe[]>([]);
  useEffect(() => { setLibrary(loadLibrary()); }, []);
  const cards = library.length >= 6 ? library.slice(0, 6) : [...library, ...SAMPLES].slice(0, 6);

  return (
    <div className="min-h-screen pb-24">
      <TopNav />

      {/* HERO */}
      <section className="pt-24 pb-16 px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-border px-4 py-1.5 text-xs font-medium text-primary animate-fade-up">
          <Sparkles className="h-3.5 w-3.5" /> Conversational Generative AI
        </div>
        <h1 className="mt-6 text-6xl md:text-7xl font-bold animate-fade-up" style={{ animationDelay: "0.05s" }}>Liquid Data</h1>
        <p className="mt-3 text-muted-foreground max-w-md animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Turning memories into tangible experiences.
        </p>
        <div className="mt-8 flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <Link to="/create" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium">
            Start Your Journey <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="btn-ghost-pill rounded-full px-6 py-3 font-medium">Watch Demo</button>
        </div>

        {/* Hero orb cluster */}
        <div className="mt-14 flex items-end gap-4 md:gap-8 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <Orb size={140} palette={["#ffd6a5", "#ff8fab", "#c39bff"]} />
          <Orb size={200} palette={["#ffe27a", "#ff9ec4", "#ff6b8a"]} pulsing />
          <Orb size={160} palette={["#c6f6d5", "#f6e05e", "#ff8fab"]} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 max-w-5xl mx-auto pt-8">
        <h2 className="text-4xl font-bold text-center">How it Works</h2>
        <p className="text-center text-muted-foreground mt-2">Three simple steps to making memories tangible</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: MessageCircle, color: "#4b7bff", title: "Share", body: "Share your memories, experiences, and moments that matter to you." },
            { icon: FileText, color: "#a855f7", title: "Transform", body: "Our AI processes your stories into rich, multi-dimensional recipes." },
            { icon: Sparkles, color: "#ec4899", title: "Experience", body: "Receive a unique drink recipe that captures the essence of your memory." },
          ].map((s, i) => (
            <div key={s.title} className="rounded-3xl bg-white/70 backdrop-blur border border-border p-6 shadow-sm animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="h-11 w-11 rounded-xl flex items-center justify-center text-white" style={{ background: s.color }}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MEMORY RECIPES */}
      <section className="px-6 max-w-6xl mx-auto pt-20">
        <h2 className="text-4xl font-bold text-center">Memory Recipes</h2>
        <p className="text-center text-muted-foreground mt-2">
          Each memory translates into a unique recipe. Revisit them later, or create new ones.
        </p>
        <div className="mt-8 rounded-[32px] bg-white/60 backdrop-blur border border-border p-6 md:p-8 shadow-sm relative">
          <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 text-xs text-primary bg-white rounded-full px-3 py-1 border border-border">
            <Sparkles className="h-3 w-3" /> AI Generated
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {cards.map((r, i) => (
              <div key={r.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <RecipeCard recipe={r} index={i} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center gap-3">
          <Link to="/create" className="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium">
            Taste your memories <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="btn-ghost-pill rounded-full px-6 py-3 font-medium">Watch Demo</button>
        </div>
      </section>
    </div>
  );
}
