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
      style={{ width: size, height: size * 1.35 }}
    >
      {/* magical outer glow */}
      <div
        aria-hidden
        className={`absolute inset-[-25%] rounded-full blur-3xl ${liquid ? "animate-orb-pulse" : "animate-orb-glow"}`}
        style={{
          background: `radial-gradient(circle at 50% 55%, ${c1} 0%, ${c2} 35%, ${c3} 60%, transparent 75%)`,
          opacity: 0.7,
        }}
      />

      {/* the glass itself */}
      <svg
        viewBox="0 0 200 270"
        width={size}
        height={size * 1.35}
        className="relative drop-shadow-[0_20px_40px_rgba(180,120,220,0.35)]"
      >
        <defs>
          {/* liquid gradient */}
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="50%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <radialGradient id="liquidGlow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* coupe glass bowl mask — liquid clips inside */}
          <clipPath id="bowlClip">
            <path d="M28,40 C28,120 60,165 100,165 C140,165 172,120 172,40 Z" />
          </clipPath>

          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        {/* stem + base */}
        <rect x="97" y="165" width="6" height="65" rx="3" fill="url(#liquidGrad)" opacity="0.25" />
        <ellipse cx="100" cy="235" rx="42" ry="6" fill="url(#liquidGrad)" opacity="0.35" />
        <ellipse cx="100" cy="234" rx="42" ry="5" fill="none" stroke={c2} strokeOpacity="0.5" strokeWidth="1.5" />

        {/* glass outline */}
        <path
          d="M28,40 C28,120 60,165 100,165 C140,165 172,120 172,40 Z"
          fill="rgba(255,255,255,0.08)"
          stroke={c2}
          strokeOpacity="0.55"
          strokeWidth="2"
        />

        {/* liquid inside — fills up in liquid mode, sits high & animates in idle */}
        <g clipPath="url(#bowlClip)">
          {/* body of liquid */}
          <rect
            x="0"
            width="200"
            fill="url(#liquidGrad)"
            className={liquid ? "animate-liquid-fill" : ""}
            y={liquid ? 165 : 55}
            height={liquid ? 0 : 110}
          />
          {/* wave overlay */}
          <path
            d="M-20,60 Q30,45 80,60 T180,60 T280,60 V200 H-20 Z"
            fill="url(#liquidGrad)"
            className="animate-liquid-wave"
            opacity="0.9"
          />
          {/* second wave for depth */}
          <path
            d="M-20,70 Q30,58 80,70 T180,70 T280,70 V200 H-20 Z"
            fill={c2}
            opacity="0.55"
            className="animate-liquid-wave-2"
            filter="url(#soften)"
          />
          {/* magical shimmer inside */}
          <ellipse cx="80" cy="90" rx="70" ry="30" fill="url(#liquidGlow)" />
          {/* sparkles */}
          <circle cx="70" cy="100" r="1.6" fill="#ffffff" className="animate-sparkle" />
          <circle cx="120" cy="130" r="1.2" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "0.6s" }} />
          <circle cx="140" cy="85" r="1.4" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "1.2s" }} />
          <circle cx="55" cy="140" r="1" fill="#ffffff" className="animate-sparkle" style={{ animationDelay: "0.3s" }} />
        </g>

        {/* rim highlight on top of glass */}
        <path
          d="M28,40 C28,120 60,165 100,165 C140,165 172,120 172,40"
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="1.2"
        />
        <ellipse cx="100" cy="40" rx="72" ry="7" fill="none" stroke={c2} strokeOpacity="0.6" strokeWidth="2" />
        <ellipse cx="100" cy="40" rx="72" ry="7" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

        {/* soft glass sheen */}
        <path
          d="M45,50 C45,110 65,150 90,158"
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={pulsing || liquid ? 0.9 : 0.65}
        />

        {/* floating bubbles when loading */}
        {liquid && (
          <g>
            <circle cx="70" cy="150" r="3" fill="#ffffff" opacity="0.75" className="animate-bubble" />
            <circle cx="110" cy="155" r="2" fill="#ffffff" opacity="0.7" className="animate-bubble" style={{ animationDelay: "0.8s" }} />
            <circle cx="130" cy="150" r="2.5" fill="#ffffff" opacity="0.7" className="animate-bubble" style={{ animationDelay: "1.4s" }} />
            <circle cx="85" cy="155" r="1.6" fill="#ffffff" opacity="0.65" className="animate-bubble" style={{ animationDelay: "0.4s" }} />
          </g>
        )}
      </svg>
    </div>
  );
}
