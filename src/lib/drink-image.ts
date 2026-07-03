import green from "@/assets/drink-green.png";
import blue from "@/assets/drink-blue.png";
import orange from "@/assets/drink-orange.png";
import pink from "@/assets/drink-pink.png";
import yellow from "@/assets/drink-yellow.png";
import amber from "@/assets/drink-amber.png";

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      case b: h = ((r - g) / d + 4); break;
    }
    h *= 60;
  }
  return { h, s, l };
}

export function pickDrinkImage(palette: [string, string, string]): string {
  try {
    const { h, s, l } = hexToHsl(palette[1] ?? palette[0]);
    if (s < 0.2) return amber;
    if (h < 20 || h >= 330) return pink;
    if (h < 45) return orange;
    if (h < 70) return yellow;
    if (h < 170) return green;
    if (h < 260) return blue;
    if (l < 0.55 && h < 40) return amber;
    return pink;
  } catch {
    return pink;
  }
}
