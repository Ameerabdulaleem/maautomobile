export const site = {
  name: "Muslim Aleem Automobile Ltd",
  shortName: "MA Automobile",
  rc: "7394953",
  email: "muslimaleemautomobile@gmail.com",
  phone: { display: "0803 096 2464", international: "+2348030962464", whatsapp: "2348030962464" },
  address: {
    line1: "No.6 Kez Udezue Street, Mabushi",
    line2: "After Artisan Palace",
    city: "Abuja FCT",
    postalCode: "90110",
    country: "NG",
    full: "No.6 Kez Udezue Street, Mabushi, After Artisan Palace, Abuja FCT, 90110, Nigeria",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("6 Kez Udezue Street, Mabushi, Abuja, Nigeria"),
  /*
   * Map centre for the OpenStreetMap embed (Mabushi district, Abuja).
   * For an exact pin on the workshop, open openstreetmap.org, right click the
   * workshop, choose "Show address", copy the two numbers here and set pin to true.
   */
  map: { lat: 9.0836, lon: 7.4446, pin: false },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://maautomobile.vercel.app"),
} as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "How It Works" },
  { href: "#marketplace", label: "Market-Place" },
  { href: "#cars", label: "Cars For Sale" },
  { href: "#parts", label: "Parts & Oils" },
  { href: "#founder", label: "Founder" },
  { href: "#contact", label: "Contact" },
] as const;

/** Builds a safe mailto link. Every dynamic value is URL encoded. */
export function mailto(subject: string, body: string): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** OpenStreetMap embed address for the workshop area. */
export function osmEmbedUrl(): string {
  const { lat, lon, pin } = site.map;
  const dLon = 0.009;
  const dLat = 0.005;
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((n) => n.toFixed(5)).join(",");
  const marker = pin ? `&marker=${lat.toFixed(5)},${lon.toFixed(5)}` : "";
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik${marker}`;
}

/** Builds a WhatsApp chat link with the message already typed in. */
export function whatsapp(message = `Hello ${site.name}, I would like to make an enquiry.`): string {
  return `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}
