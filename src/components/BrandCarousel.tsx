import Image from "next/image";
import Reveal from "./Reveal";

type Brand = { name: string; file: string; width: number; height: number };

/* Logo files live in /public/brands. To add a brand, drop its logo there and add a line below. */
const rowOne: Brand[] = [
  { name: "Mercedes-Benz", file: "mercedes-benz", width: 243, height: 240 },
  { name: "Land Rover", file: "land-rover", width: 360, height: 189 },
  { name: "Rolls-Royce", file: "rolls-royce", width: 139, height: 240 },
  { name: "Bentley", file: "bentley", width: 360, height: 113 },
  { name: "Porsche", file: "porsche", width: 193, height: 240 },
  { name: "Maybach", file: "maybach", width: 319, height: 240 },
  { name: "Lamborghini", file: "lamborghini", width: 210, height: 240 },
  { name: "Ferrari", file: "ferrari", width: 128, height: 240 },
  { name: "Jaguar", file: "jaguar", width: 360, height: 184 },
];

const rowTwo: Brand[] = [
  { name: "BMW", file: "bmw", width: 240, height: 240 },
  { name: "Aston Martin", file: "aston-martin", width: 360, height: 82 },
  { name: "Audi", file: "audi", width: 360, height: 125 },
  { name: "Maserati", file: "maserati", width: 163, height: 240 },
  { name: "McLaren", file: "mclaren", width: 360, height: 55 },
  { name: "Lexus", file: "lexus", width: 336, height: 240 },
  { name: "Bugatti", file: "bugatti", width: 360, height: 183 },
  { name: "Toyota", file: "toyota", width: 360, height: 234 },
];

function Tile({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  return (
    <li
      aria-hidden={hidden}
      className="group/tile relative mr-5 flex h-36 w-48 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-white px-6 shadow-[0_10px_30px_-18px_rgba(10,15,12,0.35)] ring-1 ring-ink/5 transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_40px_-18px_rgba(21,124,56,0.45)] hover:ring-brand-500/40 sm:h-40 sm:w-52"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-500 group-hover/tile:scale-x-100"
      />
      <span className="flex h-16 w-full items-center justify-center sm:h-[4.5rem]">
        <Image
          src={`/brands/${brand.file}.webp`}
          alt={hidden ? "" : `${brand.name} logo`}
          width={brand.width}
          height={brand.height}
          sizes="160px"
          className="max-h-full w-auto max-w-[8.5rem] object-contain transition-transform duration-500 group-hover/tile:scale-110"
        />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.2em] text-ink/55 uppercase transition-colors group-hover/tile:text-brand-700">
        {brand.name}
      </span>
    </li>
  );
}

function Row({ brands, reverse = false }: { brands: Brand[]; reverse?: boolean }) {
  return (
    <div className="group/track flex [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      {[0, 1, 2].map((copy) => (
        <ul
          key={copy}
          className={`flex shrink-0 py-4 group-hover/track:[animation-play-state:paused] ${
            reverse ? "animate-marquee-reverse" : "animate-marquee-full"
          }`}
        >
          {brands.map((brand) => (
            <Tile key={brand.name} brand={brand} hidden={copy > 0} />
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function BrandCarousel() {
  return (
    <section aria-labelledby="brands-title" className="relative overflow-hidden bg-mist pt-6 pb-16">
      <div aria-hidden className="absolute top-1/2 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-[110px]" />
      <Reveal className="relative mx-auto max-w-7xl px-5 text-center lg:px-8">
        <p className="inline-flex items-center gap-4 text-sm font-medium text-ink/70">
          <span className="h-px w-12 bg-ink/40" /> Brands we look after <span className="h-px w-12 bg-ink/40" />
        </p>
        <h2 id="brands-title" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Trusted with the finest cars on the road
        </h2>
      </Reveal>

      <div className="relative mt-8">
        <Row brands={rowOne} />
        <Row brands={rowTwo} reverse />
      </div>
    </section>
  );
}
