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
                Founder and Lead Technician
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal from="right">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-400 uppercase">About the founder</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built on a passion for fine cars and honest work
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/70">
            <p>
              {site.name} was founded by Muslim Aleem, a technician whose love for luxury cars grew into a workshop
              dedicated to looking after them properly.
            </p>
            <p>
              He started the company with a simple belief, that owners of Range Rover, Mercedes-Benz and Rolls-Royce
              cars in Abuja should not have to gamble on who touches their vehicle. They deserve skilled hands, the
              right tools, genuine parts and the truth about what their car needs.
            </p>
            <p>
              That belief still guides every job in the workshop today, whether it is a quick service, a difficult
              electrical fault or helping a customer choose their next car.
            </p>
          </div>
          <figure className="mt-8 rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <Quote className="size-7 text-brand-400" />
            <blockquote className="mt-3 font-display text-xl leading-snug text-white">
              We treat every car as if it were our own, and every customer as someone we want to see again.
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/60">Muslim Aleem, Founder</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
