import type { ReactNode } from "react";
import type { Service } from "@/lib/data";

/*
 * Custom two tone automotive icons. Lines use the current text colour and
 * the soft fills use the same colour at low opacity.
 */
const tone = { fill: "currentColor", fillOpacity: 0.22, stroke: "none" } as const;

const icons: Record<Service["icon"], ReactNode> = {
  // Scan tool showing a live signal
  diagnostics: (
    <>
      <rect x="3" y="4.5" width="18" height="12" rx="2.2" {...tone} />
      <rect x="3" y="4.5" width="18" height="12" rx="2.2" />
      <path d="M6.5 11h2.2l1.4-3 2.4 6 1.5-3h3.5" />
      <path d="M8 20h8M12 16.5V20" />
    </>
  ),
  // Engine block
  engine: (
    <>
      <path d="M6.5 9.5h2.2L10 8h5.2l1.5 1.5h2v2.3h1.8v5H18.7v1.9h-2.9L14.4 20H9.6l-1.4-1.3H6.5z" {...tone} />
      <path d="M6.5 9.5h2.2L10 8h5.2l1.5 1.5h2v2.3h1.8v5H18.7v1.9h-2.9L14.4 20H9.6l-1.4-1.3H6.5z" />
      <path d="M10 5h5.5M12.7 5v3M6.5 14H3.5M3.5 11.5v5" />
    </>
  ),
  // Gear lever pattern
  transmission: (
    <>
      <circle cx="6" cy="5" r="2" {...tone} />
      <circle cx="12" cy="5" r="2" {...tone} />
      <circle cx="18" cy="5" r="2" {...tone} />
      <circle cx="6" cy="19" r="2" {...tone} />
      <circle cx="12" cy="19" r="2" {...tone} />
      <circle cx="6" cy="5" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M6 7v10M12 7v10M18 7v5H6" />
    </>
  ),
  // Coil spring and damper
  suspension: (
    <>
      <rect x="6" y="2.8" width="12" height="2.6" rx="1.3" {...tone} />
      <rect x="6" y="18.6" width="12" height="2.6" rx="1.3" {...tone} />
      <rect x="6" y="2.8" width="12" height="2.6" rx="1.3" />
      <rect x="6" y="18.6" width="12" height="2.6" rx="1.3" />
      <path d="M16.5 5.4l-9 2.6 9 2.7-9 2.6 9 2.7-9 2.6" />
    </>
  ),
  // Battery with a charge bolt
  electrical: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2.2" {...tone} />
      <rect x="3" y="7.5" width="18" height="12" rx="2.2" />
      <path d="M7 7.5V5.2M17 7.5V5.2M5.8 5.2h2.4M15.8 5.2h2.4" />
      <path d="M12.8 10.2l-2.6 3.4h3.6l-2.6 3.4" />
    </>
  ),
  // Brake disc and caliper
  brakes: (
    <>
      <circle cx="12" cy="12" r="8.5" {...tone} />
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 6.4v.01M12 17.6v.01M6.4 12h.01M17.6 12h.01" strokeWidth="2.2" />
      <path d="M15.2 3.1a9.5 9.5 0 0 1 5.7 5.7" strokeWidth="3.4" />
    </>
  ),
  // Cool air from a vent
  ac: (
    <>
      <circle cx="12" cy="12" r="3.2" {...tone} />
      <path d="M12 2.5v19M3.8 7.2l16.4 9.6M20.2 7.2L3.8 16.8" />
      <path d="M9.6 3.9L12 6l2.4-2.1M9.6 20.1L12 18l2.4 2.1M3.9 10.6l3-.9-.7-3.1M20.1 13.4l-3 .9.7 3.1M20.1 10.6l-3-.9.7-3.1M3.9 13.4l3 .9-.7 3.1" />
    </>
  ),
  // Spanner over a service tick
  service: (
    <>
      <path d="M14.2 3.2a5 5 0 0 0-4.6 6.9l-6 6a2.2 2.2 0 0 0 3.1 3.1l6-6a5 5 0 0 0 6.9-4.6l-3 3-2.6-.7-.7-2.6z" {...tone} />
      <path d="M14.2 3.2a5 5 0 0 0-4.6 6.9l-6 6a2.2 2.2 0 0 0 3.1 3.1l6-6a5 5 0 0 0 6.9-4.6l-3 3-2.6-.7-.7-2.6z" />
      <path d="M15.5 18.5l1.8 1.8 3.4-3.6" />
    </>
  ),
};

export default function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {icons[name]}
    </svg>
  );
}
