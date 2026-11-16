import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const body = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Sora({ variable: "--font-display", subsets: ["latin"], display: "swap" });

const description =
  "Specialist repair and servicing for Range Rover, Mercedes-Benz, Rolls-Royce and other exotic cars in Mabushi, Abuja. Genuine parts marketplace and quality cars for sale.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MA Automobile | Range Rover, Mercedes-Benz and Rolls-Royce Specialists in Abuja",
    template: "%s | MA Automobile",
  },
  description,
  keywords: [
    "Muslim Aleem Automobile",
    "MA Automobile",
    "Range Rover repair Abuja",
    "Mercedes-Benz repair Abuja",
    "Rolls-Royce repair Nigeria",
    "exotic car workshop Abuja",
    "car parts Abuja",
    "cars for sale Abuja",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: site.name,
    title: "MA Automobile | Luxury and Exotic Car Specialists in Abuja",
    description,
    images: [{ url: "/logo.png", width: 1607, height: 452, alt: `${site.name} logo` }],
  },
  twitter: { card: "summary_large_image", title: site.name, description, images: ["/logo.png"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0f0c",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  image: `${site.url}/logo.png`,
  email: site.email,
  identifier: `RC ${site.rc}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: "Abuja",
    addressRegion: "FCT",
    postalCode: site.address.postalCode,
    addressCountry: "NG",
  },
  areaServed: "Abuja",
  description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">
        {children}
        <script
          type="application/ld+json"
          // Static, trusted content. "<" is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
