import { useId } from "react";

type Props = {
  body: "suv" | "sedan";
  color?: string;
  /** Spin the wheels and run the road lines, used in the hero */
  moving?: boolean;
  className?: string;
};

const shapes = {
  suv: {
    body: "M18 120 L18 92 Q20 80 40 76 L96 67 L128 30 Q135 24 147 24 L290 24 Q303 24 311 32 L340 70 L366 76 Q382 80 382 95 L382 120 Z",
    glass: [
      "M138 34 L111 66 L204 66 L204 33 L143 33 Q140 33 138 34 Z",
      "M212 33 L212 66 L325 66 L303 36 Q300 33 294 33 Z",
    ],
    wheels: [102, 306],
    beltline: "M40 82 L366 82",
  },
  sedan: {
    body: "M12 120 L14 99 Q18 87 44 82 L122 72 L172 45 Q183 39 198 39 L262 39 Q280 39 294 48 L332 75 L372 83 Q388 87 388 101 L388 120 Z",
    glass: [
      "M184 49 L146 71 L224 71 L224 47 L192 47 Q187 47 184 49 Z",
      "M232 47 L232 71 L318 71 L290 51 Q284 47 274 47 Z",
    ],
    wheels: [98, 312],
    beltline: "M44 88 L372 88",
  },
} as const;

export default function CarArt({ body, color = "#1f9a47", moving = false, className }: Props) {
  const id = useId();
  const shape = shapes[body];

  return (
    <svg viewBox="0 0 400 160" className={className} role="img" aria-label={`${body === "suv" ? "SUV" : "Saloon"} illustration`}>
      <defs>
        <linearGradient id={`${id}-paint`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cfe6da" />
          <stop offset="1" stopColor="#3d5247" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="146" rx="190" ry="9" fill={`url(#${id}-shadow)`} />

      {moving && (
        <path
          d="M0 152 H400"
          stroke="#3bb561"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="24 24"
          className="animate-dash"
        />
      )}

      <path d={shape.body} fill={color} />
      <path d={shape.body} fill={`url(#${id}-paint)`} />
      {shape.glass.map((d) => (
        <path key={d} d={d} fill={`url(#${id}-glass)`} opacity="0.92" />
      ))}
      <path d={shape.beltline} stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.2" fill="none" />

      {/* head and tail lights */}
      <rect x="20" y="88" width="16" height="6" rx="3" fill="#f4fff7" />
      <rect x="368" y="90" width="12" height="6" rx="3" fill="#e5484d" />

      {shape.wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="120" r="30" fill="#060907" />
          <g
            className={moving ? "animate-spin-slow" : undefined}
            style={{ transformOrigin: `${cx}px 120px`, animationDuration: moving ? "1.6s" : undefined }}
          >
            <circle cx={cx} cy="120" r="25" fill="#15191a" stroke="#2b3133" strokeWidth="3" />
            <circle cx={cx} cy="120" r="15" fill="#c9d1d3" />
            {[0, 60, 120].map((angle) => (
              <rect
                key={angle}
                x={cx - 15}
                y="118.2"
                width="30"
                height="3.6"
                fill="#5c6669"
                transform={`rotate(${angle} ${cx} 120)`}
              />
            ))}
            <circle cx={cx} cy="120" r="4.5" fill="#1b2022" />
          </g>
        </g>
      ))}
    </svg>
  );
}
