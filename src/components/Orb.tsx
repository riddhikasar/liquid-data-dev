export function Orb({ size = 280, palette, pulsing = false }: { size?: number; palette?: [string, string, string]; pulsing?: boolean }) {
  const bg = palette
    ? `radial-gradient(circle at 30% 30%, ${palette[0]} 0%, ${palette[1]} 45%, ${palette[2]} 90%)`
    : undefined;
  return (
    <div className="relative flex items-center justify-center animate-float" style={{ width: size, height: size }}>
      <div
        className={`orb w-full h-full ${pulsing ? "animate-orb-pulse" : ""}`}
        style={bg ? { background: bg } : undefined}
      />
      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
        background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.6) 0%, transparent 25%)"
      }} />
    </div>
  );
}
