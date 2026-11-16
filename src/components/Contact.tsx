"use client";

import { Building2, ExternalLink, Mail, MapPin, Navigation, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { services } from "@/lib/data";
import { mailto, osmEmbedUrl, site, whatsapp } from "@/lib/site";

const field =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none placeholder:text-ink/35 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15";

/** Removes control characters and trims the value to a safe length. */
const clean = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? "")
    .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Honeypot field. Real visitors never fill it in.
    if (clean(data.get("company"), 10)) return;

    const name = clean(data.get("name"), 80);
    const phone = clean(data.get("phone"), 30);
    const car = clean(data.get("car"), 80);
    const service = clean(data.get("service"), 60);
    const message = clean(data.get("message"), 1200);

    window.location.href = mailto(
      `Service booking: ${service || "General enquiry"}${car ? ` (${car})` : ""}`,
      `Hello ${site.name},\n\nName: ${name}\nPhone: ${phone}\nCar: ${car}\nService needed: ${service}\n\n${message}\n`,
    );
    setSent(true);
  };

  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <Reveal from="left">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-500 uppercase">Book a service</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let us take a look at your car
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/65">
            Tell us about your car and what you have noticed. We will get back to you to confirm a time, or you can
            simply drive in to the workshop.
          </p>

          <ul className="mt-9 space-y-5">
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <MapPin className="size-5" />
              </span>
              <div>
                <p className="font-display font-semibold">Workshop address</p>
                <address className="mt-0.5 leading-relaxed text-ink/65 not-italic">
                  {site.address.line1}, {site.address.line2},
                  <br />
                  {site.address.city}, {site.address.postalCode}, Nigeria
                </address>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
                >
                  <Navigation className="size-4" /> Get directions
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Phone className="size-5" />
              </span>
              <div>
                <p className="font-display font-semibold">Call or WhatsApp</p>
                <a href={`tel:${site.phone.international}`} className="mt-0.5 block text-ink/65 hover:text-brand-700">
                  {site.phone.display}
                </a>
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-semibold text-brand-700 hover:text-brand-600"
                >
                  Message on WhatsApp
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Mail className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold">Email</p>
                <a href={`mailto:${site.email}`} className="mt-0.5 block break-all text-ink/65 hover:text-brand-700">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <Building2 className="size-5" />
              </span>
              <div>
                <p className="font-display font-semibold">Registered company</p>
                <p className="mt-0.5 text-ink/65">
                  {site.name}, RC: {site.rc}
                </p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal from="right">
          <form
            onSubmit={onSubmit}
            className="rounded-[2rem] bg-mist p-7 shadow-sm ring-1 ring-ink/5 sm:p-10"
            aria-label="Service booking form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full name
                <input name="name" required maxLength={80} autoComplete="name" placeholder="Your name" className={field} />
              </label>
              <label className="block text-sm font-medium">
                Phone number
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={30}
                  pattern="[0-9+() \-]{7,30}"
                  title="Please enter a valid phone number"
                  autoComplete="tel"
                  placeholder="0800 000 0000"
                  className={field}
                />
              </label>
              <label className="block text-sm font-medium">
                Car make, model and year
                <input name="car" required maxLength={80} placeholder="Range Rover Sport 2019" className={field} />
              </label>
              <label className="block text-sm font-medium">
                Service needed
                <select name="service" required defaultValue="" className={field}>
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                  <option>Parts enquiry</option>
                  <option>Buying a car</option>
                  <option>Something else</option>
                </select>
              </label>
            </div>
            <label className="mt-5 block text-sm font-medium">
              What have you noticed?
              <textarea
                name="message"
                rows={4}
                maxLength={1200}
                placeholder="Describe the problem or what you need"
                className={`${field} resize-y`}
              />
            </label>

            {/* Honeypot, hidden from people and screen readers */}
            <div className="hidden" aria-hidden>
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              <Send className="size-4" /> Send booking request
            </button>
            <p className="mt-4 text-center text-sm text-ink/55" role="status">
              {sent
                ? "Your email app should now be open with your request. Press send there to complete the booking."
                : "This opens your email app with your details filled in, ready to send."}
            </p>
          </form>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
        <div className="rounded-[2rem] bg-ink p-3 shadow-xl sm:p-4">
          <div className="relative overflow-hidden rounded-[1.4rem]">
            <iframe
              title={`Map showing the ${site.name} workshop area in Mabushi, Abuja`}
              src={osmEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin"
              className="block h-[26rem] w-full border-0 bg-mist grayscale-[0.35]"
            />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-lg transition hover:bg-brand-600 hover:text-white"
            >
              Open in Maps <ExternalLink className="size-4" />
            </a>
            <div className="pointer-events-none absolute right-4 bottom-4 left-4 flex items-start gap-3 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:right-auto sm:max-w-sm">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed font-medium text-ink">{site.address.full}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
