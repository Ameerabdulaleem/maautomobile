import {
  BadgeCheck,
  CarFront,
  Check,
  CircleGauge,
  Cog,
  Disc3,
  HandCoins,
  PackageCheck,
  Quote,
  ScanSearch,
  Snowflake,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { reasons, services, type Service } from "@/lib/data";
import { site } from "@/lib/site";

export function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-[0.2em] text-brand-500 uppercase">{eyebrow}</p>
      <h2
        className={`mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/65" : "text-ink/65"}`}>{text}</p>}
    </Reveal>
  );
}

const serviceIcons: Record<Service["icon"], LucideIcon> = {
  diagnostics: ScanSearch,
  engine: Cog,
  transmission: CircleGauge,
  suspension: CarFront,
  electrical: Zap,
  brakes: Disc3,
  ac: Snowflake,
  service: Wrench,
};

export function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="What we do"
          title="Complete care for luxury and exotic cars"
          text="Whatever your car needs, from a routine service to a full engine rebuild, it is handled by people who know these machines."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 4) * 0.08}>
                <article className="group h-full rounded-3xl border border-ink/10 bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-900/10">
                  <span className="grid size-13 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">{service.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const reasonIcons = [Wrench, PackageCheck, HandCoins, BadgeCheck];

export function WhyUs() {
  return (
    <section id="why-us" className="bg-mist py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal from="left">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-500 uppercase">Why choose us</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Your car deserves a workshop that understands it
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/65">
            Luxury cars are complex, and guesswork gets expensive. We take the time to find the real fault, explain it
            honestly and repair it properly the first time.
          </p>
          <ul className="mt-8 space-y-3">
            {["Range Rover and Land Rover", "Mercedes-Benz and Maybach", "Rolls-Royce and Bentley", "Other exotic and performance cars"].map(
              (line) => (
                <li key={line} className="flex items-center gap-3 font-medium text-ink/85">
                  <span className="grid size-6 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ),
            )}
          </ul>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((reason, i) => {
            const Icon = reasonIcons[i];
            return (
              <Reveal key={reason.title} delay={i * 0.08} from="right">
                <div className="h-full rounded-3xl bg-white p-7 shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-1 hover:shadow-xl">
                  <Icon className="size-7 text-brand-600" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{reason.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{reason.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden bg-ink py-24 text-white">
      <div aria-hidden className="absolute top-1/2 left-[-8%] size-[34rem] -translate-y-1/2 rounded-full bg-brand-600/25 blur-[130px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <Reveal from="left">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-brand-500/40" aria-hidden />
            {/* Replace this block with a photo of the founder: <Image src="/founder.jpg" ... /> */}
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-brand-800 to-ink">
              <div className="bg-grid absolute inset-0" aria-hidden />
              <span className="relative font-display text-8xl font-semibold tracking-tight text-white/90">MA</span>
              <span className="absolute bottom-6 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-white/80 backdrop-blur">
                Muslim Abdulaleem, Founder
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal from="right">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-400 uppercase">Company overview</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A foundation of two decades of mastery
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/70">
            <p>
              {site.name} (RC: {site.rc}) is the result of over 20 years of unwavering dedication to the art and science
              of automotive engineering. Founded by Muslim Abdulaleem, the company combines deep practical experience
              with formal technical education.
            </p>
            <p>
              His journey began not in a classroom, but in the workshop as an apprentice. For more than two decades he
              has worked through every level of the trade, from hands on repairs to managing complex diagnostics for a
              variety of companies. That has given him a rare understanding of vehicles, from the simplest mechanical
              parts to the most complex computer systems.
            </p>
            <p>
              To strengthen that knowledge, he obtained a National Diploma in Mechanical Engineering from the Federal
              Polytechnic, Nasarawa. The theory behind the practice allows him to engineer solutions, not just perform
              repairs.
            </p>
            <p>
              Throughout his career he has been the solution when others have failed, quietly building a reputation for
              diagnosing and fixing problems that baffled larger, more established companies. Today that expertise has
              a proper home, a branded and well equipped workshop in Mabushi, Abuja.
            </p>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: "20+", label: "Years of hands on experience" },
              { value: "ND", label: "Mechanical Engineering, Federal Polytechnic Nasarawa" },
              { value: "RC", label: `${site.rc}, a registered company` },
            ].map((fact) => (
              <div key={fact.value} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <dt className="font-display text-3xl font-semibold text-brand-400">{fact.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-white/65">{fact.label}</dd>
              </div>
            ))}
          </dl>

          <figure className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <Quote className="size-7 text-brand-400" />
            <blockquote className="mt-3 font-display text-xl leading-snug text-white">
              Street smart experience and academic knowledge, together, are my signature strength. I engineer
              solutions, not just repairs.
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">Muslim Abdulaleem, Founder</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
