"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, MessageCircle, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Reveal from "./Reveal";
import { SectionHeading } from "./Sections";
import { cars, partCategories, parts, type PartCategory } from "@/lib/data";
import { mailto, site, whatsapp } from "@/lib/site";

function GroupTitle({ id, title, text }: { id: string; title: string; text: string }) {
  return (
    <Reveal className="flex flex-col gap-2 border-b border-ink/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
      <h3 id={id} className="flex items-center gap-4 font-display text-xl font-semibold tracking-[0.08em] uppercase sm:text-2xl">
        <span className="h-8 w-1.5 rounded-full bg-brand-500" />
        {title}
      </h3>
      <p className="max-w-md text-ink/60 sm:text-right">{text}</p>
    </Reveal>
  );
}

export default function Marketplace() {
  const [selectedCar, setSelectedCar] = useState<string>(cars[0].id);
  const [category, setCategory] = useState<PartCategory>(partCategories[0].name);
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const visibleParts = parts.filter((p) => p.category === category);
  const items = parts.filter((p) => basket[p.id]);
  const count = items.reduce((sum, p) => sum + basket[p.id], 0);

  const change = (id: string, delta: number) =>
    setBasket((prev) => {
      const next = { ...prev };
      const qty = Math.min(99, (next[id] ?? 0) + delta);
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const enquiryText = `Hello ${site.name},\n\nI would like the price and availability of these items:\n\n${items
    .map((p) => `- ${p.name} x ${basket[p.id]}`)
    .join("\n")}\n\nMy car (make, model, year):\nMy name:\n`;

  return (
    <section id="marketplace" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Buy from us"
          title="MARKET-PLACE"
          text="Quality cars, genuine parts and oils, all checked by the same workshop that repairs them."
        />

        {/* Cars available for sale */}
        <div className="mt-16 scroll-mt-24" id="cars">
          <GroupTitle
            id="cars-title"
            title="Cars Available For Sale"
            text="Select a car to see it, then enquire for the price and a viewing."
          />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-labelledby="cars-title">
            {cars.map((car, i) => {
              const selected = selectedCar === car.id;
              const name = `${car.make} ${car.model}`;
              return (
                <Reveal key={car.id} delay={(i % 3) * 0.08}>
                  <li
                    className={`group relative flex h-full list-none flex-col overflow-hidden rounded-3xl border-2 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/10 ${
                      selected ? "border-brand-500 shadow-xl shadow-brand-900/10" : "border-ink/10"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedCar(car.id)}
                      aria-pressed={selected}
                      aria-label={`Select ${name}`}
                      className="relative block aspect-[4/3] w-full overflow-hidden"
                    >
                      <Image
                        src={car.image}
                        alt={name}
                        fill
                        sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
                      <span className="absolute bottom-4 left-5 text-left">
                        <span className="block text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">{car.make}</span>
                        <span className="block font-display text-2xl font-semibold text-white">{name}</span>
                      </span>
                      <span
                        className={`absolute top-4 right-4 grid size-8 place-items-center rounded-full border-2 transition ${
                          selected ? "border-brand-500 bg-brand-500 text-white" : "border-white/80 bg-ink/30 text-transparent"
                        }`}
                        aria-hidden
                      >
                        <Check className="size-4" strokeWidth={3} />
                      </span>
                    </button>
                    <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-5">
                      <div>
                        <p className="font-display font-semibold">{car.price ?? "Price on request"}</p>
                        <p className="mt-0.5 text-sm text-ink/60">{car.highlights.join(" · ")}</p>
                      </div>
                      <a
                        href={whatsapp(
                          `Hello ${site.name}, I am interested in the ${name} on your website. Please send me the price, year, mileage and viewing details.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${
                          selected ? "bg-brand-600 hover:bg-brand-700" : "bg-ink hover:bg-brand-600"
                        }`}
                      >
                        Enquire Now <ArrowUpRight className="size-4" />
                      </a>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* Car parts and oils */}
        <div className="mt-20 scroll-mt-24" id="parts">
          <GroupTitle
            id="parts-title"
            title="Car Parts & Oils"
            text="Select a category to see what is available, then add items to your enquiry list."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" role="group" aria-labelledby="parts-title">
            {partCategories.map((c, i) => {
              const selected = category === c.name;
              return (
                <Reveal key={c.name} delay={i * 0.07}>
                  <button
                    type="button"
                    onClick={() => setCategory(c.name)}
                    aria-pressed={selected}
                    className={`group relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border-2 text-left transition duration-300 hover:-translate-y-1.5 sm:aspect-[4/3] lg:aspect-[4/5] ${
                      selected ? "border-brand-500 shadow-2xl shadow-brand-900/20" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 300px, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span
                      className={`absolute inset-0 transition-colors duration-300 ${
                        selected ? "bg-gradient-to-t from-brand-900/95 via-brand-900/40 to-transparent" : "bg-gradient-to-t from-ink/90 via-ink/30 to-transparent"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`absolute top-3 right-3 grid size-8 place-items-center rounded-full border-2 transition ${
                        selected ? "border-brand-400 bg-brand-500 text-white" : "border-white/80 bg-ink/30 text-transparent"
                      }`}
                      aria-hidden
                    >
                      <Check className="size-4" strokeWidth={3} />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <span className="block font-display text-lg font-semibold tracking-wide text-white uppercase sm:text-xl">
                        {c.name}
                      </span>
                      <span className="mt-1 hidden text-sm leading-snug text-white/75 sm:block">{c.blurb}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <ul className="mt-6 grid gap-4 md:grid-cols-2" aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleParts.map((part) => {
                const qty = basket[part.id] ?? 0;
                return (
                  <motion.li
                    key={part.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-4 rounded-3xl bg-mist p-6 ring-1 ring-ink/5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <h4 className="font-display text-lg font-semibold">{part.name}</h4>
                      <p className="mt-0.5 text-sm font-medium text-brand-700">Fits: {part.fits}</p>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{part.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="font-display text-sm font-semibold whitespace-nowrap">{part.price ?? "Price on request"}</p>
                      <button
                        type="button"
                        onClick={() => change(part.id, 1)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                          qty ? "bg-brand-100 text-brand-800 hover:bg-brand-200" : "bg-ink text-white hover:bg-brand-600"
                        }`}
                      >
                        {qty ? <Check className="size-4" /> : <Plus className="size-4" />}
                        {qty ? `Added (${qty})` : "Add to enquiry"}
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-ink p-7 text-center text-white sm:flex-row sm:text-left">
            <div>
              <h4 className="font-display text-lg font-semibold">Need something that is not listed?</h4>
              <p className="mt-1 text-white/65">We stock and source many more parts for luxury and exotic cars.</p>
            </div>
            <a
              href={whatsapp(`Hello ${site.name}, I am looking for this part:\n\nMy car (make, model, year):`)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-brand-500 px-6 py-3 font-semibold text-white transition hover:bg-brand-400"
            >
              Request a part
            </a>
          </div>
        </div>
      </div>

      {/* Floating enquiry list button */}
      <AnimatePresence>
        {count > 0 && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3.5 font-semibold text-white shadow-2xl shadow-ink/40 ring-1 ring-white/15 hover:bg-brand-700"
          >
            <ShoppingBag className="size-5" />
            Enquiry list
            <span className="grid min-w-6 place-items-center rounded-full bg-brand-500 px-1.5 text-sm">{count}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm"
              aria-hidden
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Your enquiry list"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <h3 className="font-display text-xl font-semibold">Your enquiry list</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close enquiry list"
                  className="grid size-10 place-items-center rounded-full hover:bg-mist"
                >
                  <X className="size-5" />
                </button>
              </div>

              <ul className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
                {items.length === 0 && <li className="py-10 text-center text-ink/60">Your list is empty.</li>}
                {items.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-ink/10 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{p.name}</p>
                      <p className="text-sm text-ink/60">{p.price ?? "Price on request"}</p>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-mist p-1">
                      <button
                        type="button"
                        onClick={() => change(p.id, -1)}
                        aria-label={`Reduce quantity of ${p.name}`}
                        className="grid size-8 place-items-center rounded-full bg-white font-semibold shadow-sm"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{basket[p.id]}</span>
                      <button
                        type="button"
                        onClick={() => change(p.id, 1)}
                        aria-label={`Increase quantity of ${p.name}`}
                        className="grid size-8 place-items-center rounded-full bg-white font-semibold shadow-sm"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => change(p.id, -99)}
                      aria-label={`Remove ${p.name}`}
                      className="grid size-9 place-items-center rounded-full text-ink/50 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-ink/10 px-6 py-5">
                <p className="text-sm leading-relaxed text-ink/60">
                  Send your list on WhatsApp or by email. We reply with prices and availability.
                </p>
                <a
                  href={items.length ? whatsapp(enquiryText) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!items.length}
                  className={`mt-4 flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold text-white transition ${
                    items.length ? "bg-brand-600 hover:bg-brand-700" : "pointer-events-none bg-ink/30"
                  }`}
                >
                  <MessageCircle className="size-4" /> Send on WhatsApp
                </a>
                <a
                  href={items.length ? mailto("Parts enquiry from the website", enquiryText) : undefined}
                  aria-disabled={!items.length}
                  className={`mt-3 flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold transition ${
                    items.length
                      ? "border-ink/20 text-ink hover:border-brand-600 hover:text-brand-700"
                      : "pointer-events-none border-ink/10 text-ink/30"
                  }`}
                >
                  <Send className="size-4" /> Send by email
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
