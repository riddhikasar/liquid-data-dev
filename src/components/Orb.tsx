export function Orb({
  size = 280,
  palette,
  pulsing = false,
  liquid = false,
}: {
  size?: number;
  palette?: [string, string, string];
  pulsing?: boolean;
  liquid?: boolean;
}) {
  const [c1, c2, c3] = palette ?? ["#ffd6a5", "#ff8fab", "#c39bff"];
  const bg = `radial-gradient(circle at 32% 30%, ${c1} 0%, ${c2} 45%, ${c3} 90%)`;

  return (
    <div
      className="relative flex items-center justify-center animate-float"
      style={{ width: size, height: size }}
    >
      {/* soft outer glow ring — always breathing */}
      <div
        aria-hidden
        className="absolute inset-[-14%] rounded-full blur-3xl opacity-70 animate-orb-glow"
        style={{ background: `radial-gradient(circle, ${c2}, transparent 65%)` }}
      />

      {/* main orb */}
      <div
        className={`orb w-full h-full ${pulsing || liquid ? "animate-orb-pulse" : "animate-orb-breath"}`}
        style={{ background: bg }}
      />

      {/* liquid blobs — only during processing. They rise & merge into orb shape. */}
      {liquid && (
        <div
          aria-hidden
          className="absolute inset-0 rounded-full overflow-hidden mix-blend-overlay"
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 62%, transparent 66%)",
            maskImage: "radial-gradient(circle, black 62%, transparent 66%)",
          }}
        >
          <div
            className="absolute -inset-1/4 animate-liquid-swirl"
            style={{
              background: `radial-gradient(closest-side at 30% 70%, ${c1} 0%, transparent 55%),
                           radial-gradient(closest-side at 70% 60%, ${c2} 0%, transparent 55%),
                           radial-gradient(closest-side at 50% 30%, ${c3} 0%, transparent 55%)`,
              filter: "blur(14px) contrast(1.15)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-full animate-liquid-rise"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${c2} 55%, ${c3} 100%)`,
              filter: "blur(10px)",
              opacity: 0.85,
            }}
          />
        </div>
      )}

      {/* highlight */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 35% 28%, rgba(255,255,255,0.65) 0%, transparent 26%)",
        }}
      />
    </div>
  );
}
