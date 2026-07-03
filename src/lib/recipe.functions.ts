import { createServerFn } from "@tanstack/react-start";

export type Recipe = {
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  palette: [string, string, string];
  emoji: string;
  memory: string;
  id: string;
};

export const generateRecipe = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { memory?: string };
    if (!d?.memory || typeof d.memory !== "string" || d.memory.trim().length < 3) {
      throw new Error("Please describe your memory in a bit more detail.");
    }
    return { memory: d.memory.trim().slice(0, 2000) };
  })
  .handler(async ({ data }): Promise<Recipe> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const system = `You are a sensory mixologist that turns human memories into unique, poetic drink recipes.
Return ONLY compact JSON matching this shape:
{
  "name": "two-word evocative title (e.g. 'Golden Playground')",
  "tagline": "one short poetic phrase, under 14 words, describing the drink's soul",
  "description": "2-3 sentences describing taste, aroma, texture, using warm sensory language",
  "ingredients": ["4-6 short ingredient phrases with vibe, e.g. 'sun-warmed lemon soda'"],
  "palette": ["#hex1","#hex2","#hex3"],
  "emoji": "one drink or fruit emoji",
  "memory": "echo back the user memory verbatim"
}
Colors should evoke the memory's mood. No prose outside JSON.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Memory: ${data.memory}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      if (res.status === 429) throw new Error("Too many requests — please wait a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits.");
      throw new Error(`AI error: ${t.slice(0, 200)}`);
    }

    const json = (await res.json()) as { choices: Array<{ message: { content: string } }> };
    const raw = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(raw) as Omit<Recipe, "id" | "memory"> & { memory?: string };

    return {
      id: crypto.randomUUID(),
      name: parsed.name,
      tagline: parsed.tagline,
      description: parsed.description,
      ingredients: parsed.ingredients ?? [],
      palette: (parsed.palette?.slice(0, 3) as [string, string, string]) ?? ["#ffd6a5", "#ff8fab", "#c39bff"],
      emoji: parsed.emoji ?? "🍹",
      memory: data.memory,
    };
  });
