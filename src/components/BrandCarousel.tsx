import {
  siAstonmartin,
  siAudi,
  siBentley,
  siBmw,
  siBugatti,
  siFerrari,
  siLamborghini,
  siMaserati,
  siMclaren,
  siPorsche,
  siRollsroyce,
} from "simple-icons";
import Reveal from "./Reveal";

type Brand = {
  name: string;
  /** SVG path of the brand mark, when one is available */
  path?: string;
  /** Or an official logo file placed in /public/brands, for example "/brands/mercedes.svg" */
  file?: string;
};

const brands: Brand[] = [
  { name: "Range Rover" },
  { name: "Mercedes-Benz" },
  { name: "Rolls-Royce", path: siRollsroyce.path },
  { name: "Bentley", path: siBentley.path },
  { name: "Land Rover" },
  { name: "Porsche", path: siPorsche.path },
  { name: "Maybach" },
  { name: "Lamborghini", path: siLamborghini.path },
  { name: "Ferrari", path: siFerrari.path },
  { name: "Maserati", path: siMaserati.path },
  { name: "Aston Martin", path: siAstonmartin.path },
  { name: "McLaren", path: siMclaren.path },
  { name: "BMW", path: siBmw.path },
  { name: "Audi", path: siAudi.path },
  { name: "Bugatti", path: siBugatti.path },
];

function Tile({ brand, hidden }: { brand: Brand; hidden: boolean }) {
  return (
    <li
      aria-hidden={hidden}
      className="group mr-5 flex size-40 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl bg-white px-3 text-ink/70 shadow-sm ring-1 ring-ink/5 transition duration-300 hover:-translate-y-1.5 hover:text-brand-700 hover:shadow-xl sm:size-44"
    >
      {brand.file ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={brand.file} alt="" loading="lazy" className="h-14 w-auto max-w-[70%] object-contain" />
      ) : brand.path ? (
        <svg viewBox="0 0 24 24" className="size-14 fill-current transition-transform duration-300 group-hover:scale-110" aria-hidden>
          <path d={brand.path} />
        </svg>
      ) : (
        <span className="grid h-14 place-items-center text-center font-display text-lg leading-tight font-semibold tracking-[0.14em] uppercase transition-transform duration-300 group-hover:scale-105">
          {brand.name}
        </span>
      )}
      {(brand.path || brand.file) && <span className="text-xs font-semibold tracking-[0.16em] uppercase">{brand.name}</span>}
    </li>
  );
}

export default function BrandCarousel() {
  return (
    <section aria-labelledby="brands-title" className="overflow-hidden bg-mist py-16">
      <Reveal className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <p className="inline-flex items-center gap-4 text-sm font-medium text-ink/70">
          <span className="h-px w-12 bg-ink/40" /> Brands we look after
        </p>
        <h2 id="brands-title" className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Trusted with the finest cars on the road
        </h2>
      </Reveal>

      <div className="group/track mt-10 flex [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 animate-marquee-full py-3 group-hover/track:[animation-play-state:paused]"
          >
            {brands.map((brand) => (
              <Tile key={brand.name} brand={brand} hidden={copy === 1} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
