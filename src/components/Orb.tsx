export function Orb({
  size = 240,
  palette,
  pulsing = false,
  liquid = false,
}: {
  size?: number;
  palette?: [string, string, string];
  pulsing?: boolean;
  liquid?: boolean;
}) {
  const [c1, c2, c3] = palette ?? ["#ffb3d9", "#c39bff", "#8ec5ff"];

  return (
    <div
      className="relative flex items-center justify-center animate-float"
      style={{ width: size, height: size }}
    >
      {/* soft magical glow behind glass */}
      <div
        aria-hidden
        className={`absolute inset-[-20%] rounded-full blur-3xl pointer-events-none ${liquid ? "animate-orb-pulse" : "animate-orb-glow"}`}
        style={{
          background: `radial-gradient(circle at 50% 55%, ${c1} 0%, ${c2} 40%, ${c3} 65%, transparent 78%)`,
          opacity: 0.55,
        }}
      />

      {/* top-down cocktail glass — rotates while loading */}
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className={`relative drop-shadow-[0_20px_40px_rgba(180,120,220,0.35)] ${liquid ? "animate-orb-spin" : ""}`}
      >
        <defs>
          <radialGradient id="drinkFill" cx="45%" cy="40%" r="70%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="55%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </radialGradient>
          <radialGradient id="drinkSheen" cx="35%" cy="30%" r="45%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rimGrad" cx="50%" cy="50%" r="50%">
            <stop offset="90%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </radialGradient>
          <clipPath id="drinkClip"><circle cx="100" cy="100" r="72" /></clipPath>
        </defs>

        {/* soft shadow ellipse under glass */}
        <ellipse cx="115" cy="115" rx="72" ry="70" fill={c3} opacity="0.18" />

        {/* outer rim ring */}
        <circle cx="100" cy="100" r="82" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="3" />
        <circle cx="100" cy="100" r="80" fill="none" stroke={c2} strokeOpacity="0.35" strokeWidth="1" />

        {/* the liquid */}
        <circle cx="100" cy="100" r="72" fill="url(#drinkFill)" />

        <g clipPath="url(#drinkClip)">
          {/* liquid highlight sheen */}
          <ellipse cx="78" cy="72" rx="46" ry="26" fill="url(#drinkSheen)" />

          {/* ice cube (rotated square) */}
          <g transform="translate(72 92) rotate(-18)">
            <rect x="-16" y="-16" width="32" height="32" rx="4" fill="#ffffff" opacity="0.55" />
            <rect x="-16" y="-16" width="32" height="32" rx="4" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.5" />
            <path d="M-10 -10 L10 10 M-10 10 L10 -10" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1" />
          </g>

          {/* citrus wheel — pink/magenta to match palette */}
          <g transform="translate(126 116)">
            <circle r="20" fill="#ffffff" opacity="0.9" />
            <circle r="16" fill={c1} opacity="0.85" />
            <g stroke="#ffffff" strokeOpacity="0.9" strokeWidth="1.2">
              <line x1="0" y1="-14" x2="0" y2="14" />
              <line x1="-14" y1="0" x2="14" y2="0" />
              <line x1="-10" y1="-10" x2="10" y2="10" />
              <line x1="-10" y1="10" x2="10" y2="-10" />
            </g>
            <circle r="3.5" fill="#ffffff" opacity="0.85" />
          </g>

          {/* mint leaves */}
          <g transform="translate(96 70)">
            <path d="M0 0 C -8 -10, -6 -22, 4 -26 C 10 -18, 8 -6, 0 0 Z" fill="#7dd3a1" />
            <path d="M0 0 C -8 -10, -6 -22, 4 -26" fill="none" stroke="#3f9b6b" strokeWidth="1" />
            <path d="M2 -2 C 12 -6, 22 0, 22 12 C 12 14, 4 8, 2 -2 Z" fill="#8ee0b0" />
          </g>

          {/* orange straw */}
          <g transform="translate(100 100) rotate(20)">
            <rect x="-4" y="-80" width="8" height="120" rx="3" fill="#f59e0b" />
            <rect x="-4" y="-80" width="8" height="120" rx="3" fill="url(#drinkSheen)" opacity="0.5" />
            <rect x="-4" y="-80" width="8" height="4" fill="#c2410c" />
          </g>

          {/* sparkles */}
          <circle cx="60" cy="130" r="1.6" fill="#ffffff" className="animate-sparkle" />
          <circle cx="150" cy="70" r="1.2" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "0.6s" }} />
          <circle cx="90" cy="150" r="1.4" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "1.2s" }} />
        </g>

        {/* glass rim highlight */}
        <circle cx="100" cy="100" r="72" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" />
        <circle cx="100" cy="100" r="72" fill="url(#rimGrad)" opacity={pulsing || liquid ? 0.9 : 0.7} />
      </svg>
    </div>
  );
}
