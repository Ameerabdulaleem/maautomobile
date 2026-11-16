import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import { navLinks, site } from "@/lib/site";

export function CallToAction() {
  return (
    <section className="bg-white px-5 pb-24 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 px-7 py-16 text-center text-white sm:px-16">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Warning light on? Strange noise? Bring it to the specialists.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            The sooner a fault is found, the less it costs to fix. Book your inspection today.
          </p>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand-800 shadow-xl transition hover:-translate-y-0.5"
          >
            Book a Service
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:px-8">
        <div>
          <span className="inline-block rounded-2xl bg-white px-4 py-3">
            <Image src="/logo.png" alt={`${site.name} logo`} width={1607} height={452} className="h-12 w-auto" />
          </span>
          <p className="mt-5 max-w-xs leading-relaxed text-white/60">
            Specialist repair, genuine parts and quality cars for owners of Range Rover, Mercedes-Benz, Rolls-Royce and
            other exotic cars.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-display font-semibold">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-white/60 transition hover:text-brand-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display font-semibold">We specialise in</h3>
          <ul className="mt-4 space-y-2.5 text-white/60">
            <li>Range Rover and Land Rover</li>
            <li>Mercedes-Benz and Maybach</li>
            <li>Rolls-Royce and Bentley</li>
            <li>Exotic and performance cars</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold">Visit or write to us</h3>
          <ul className="mt-4 space-y-4 text-white/60">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-400" />
              <address className="leading-relaxed not-italic">{site.address.full}</address>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand-400" />
              <a href={`tel:${site.phone.international}`} className="transition hover:text-brand-300">
                {site.phone.display}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-brand-400" />
              <a href={`mailto:${site.email}`} className="break-all transition hover:text-brand-300">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-white/50 sm:flex-row lg:px-8">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p>RC: {site.rc}</p>
        </div>
        <div className="mx-auto max-w-7xl px-5 pb-6 text-center text-xs text-white/35 sm:text-left lg:px-8">
          All vehicle brand names and logos are trademarks of their respective owners and are shown only to describe the
          cars we work on.
        </div>
      </div>
    </footer>
  );
}
