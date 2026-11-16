import {
  BadgeCheck,
  Check,
  HandCoins,
  PackageCheck,
  Quote,
  Wrench,
} from "lucide-react";
import Reveal from "./Reveal";
import ServiceIcon from "./ServiceIcon";
import { reasons, services } from "@/lib/data";
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
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-white p-7 transition duration-500 hover:-translate-y-2 hover:border-brand-500/40 hover:shadow-[0_30px_60px_-30px_rgba(21,124,56,0.45)]">
                {/* soft glow that fades in behind the icon */}
                <span
                  aria-hidden
                  className="absolute -top-16 -left-16 size-48 rounded-full bg-brand-400/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="absolute top-6 right-7 font-display text-4xl font-semibold text-ink/[0.06] transition-colors duration-500 group-hover:text-brand-500/25"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative block size-16">
                  {/* tilted layer behind the badge */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rotate-6 rounded-[1.35rem] bg-brand-200/70 transition-transform duration-500 group-hover:rotate-[14deg] group-hover:scale-105"
                  />
                  <span className="relative grid size-16 place-items-center rounded-[1.35rem] bg-gradient-to-br from-brand-400 via-brand-600 to-brand-900 text-white shadow-[0_14px_26px_-10px_rgba(21,124,56,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <span
                      aria-hidden
                      className="absolute inset-x-2 top-1.5 h-5 rounded-full bg-gradient-to-b from-white/30 to-transparent"
                    />
                    <ServiceIcon name={service.icon} className="relative size-8" />
                  </span>
                </span>

                <h3 className="relative mt-6 font-display text-lg font-semibold">{service.title}</h3>
                <p className="relative mt-2.5 text-[15px] leading-relaxed text-ink/65">{service.text}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-7 bottom-0 h-1 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-700 transition-transform duration-500 group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
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
                Muslim Abdulaleem, Founder and CEO
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
              {site.name} is built on more than 20 years of dedication to the art and science of automotive
              engineering. Founded by Muslim Abdulaleem, the company brings together extensive practical experience
              and formal engineering training.
            </p>
            <p>
              Over two decades, our founder has worked at every level of the profession, from precision mechanical
              repair to leading advanced diagnostics for a range of organisations. The result is a complete
              understanding of the modern vehicle, from core mechanical components to the most sophisticated
              electronic control systems.
            </p>
            <p>
              That experience is reinforced by a professional qualification in Mechanical Engineering, which provides
              the theoretical framework to engineer lasting solutions and not simply carry out repairs.
            </p>
            <p>
              Our reputation rests on resolving the complex faults that others could not. Today that expertise is
              delivered through a fully equipped facility, with the standards of care, transparency and precision that
              owners of premium vehicles expect anywhere in the world.
            </p>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: "20+", label: "Years of professional experience" },
              { value: "Engineer led", label: "Qualified in Mechanical Engineering" },
              { value: "Registered", label: `Incorporated company, RC ${site.rc}` },
            ].map((fact) => (
              <div key={fact.value} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <dt className="font-display text-2xl font-semibold text-brand-400">{fact.value}</dt>
                <dd className="mt-1 text-sm leading-snug text-white/65">{fact.label}</dd>
              </div>
            ))}
          </dl>

          <figure className="mt-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <Quote className="size-7 text-brand-400" />
            <blockquote className="mt-3 font-display text-xl leading-snug text-white">
              Practical mastery and engineering discipline, working together. We engineer solutions, not just repairs.
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">Muslim Abdulaleem, Founder and Chief Executive</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
