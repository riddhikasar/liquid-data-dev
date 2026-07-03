import type { Recipe } from "./recipe.functions";

const KEY = "liquid_data_library_v1";
const CURRENT = "liquid_data_current_v1";

export function loadLibrary(): Recipe[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Recipe[];
  } catch { return []; }
}

export function saveToLibrary(r: Recipe) {
  const list = loadLibrary();
  if (!list.find((x) => x.id === r.id)) list.unshift(r);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 60)));
}

export function setCurrent(r: Recipe | null) {
  if (typeof window === "undefined") return;
  if (r) localStorage.setItem(CURRENT, JSON.stringify(r));
  else localStorage.removeItem(CURRENT);
}
export function getCurrent(): Recipe | null {
  if (typeof window === "undefined") return null;
  try { const v = localStorage.getItem(CURRENT); return v ? JSON.parse(v) : null; } catch { return null; }
}
