"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  CircleDot,
  CircleGauge,
  Filter,
  Lightbulb,
  MessageCircle,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { SectionHeading } from "./Sections";
import { parts, type PartCategory } from "@/lib/data";
import { mailto, site, whatsapp } from "@/lib/site";

const categoryIcons: Record<PartCategory, LucideIcon> = {
  Filters: Filter,
  Transmission: CircleGauge,
  Lighting: Lightbulb,
  Emblems: Sparkles,
  "Wheel Accessories": CircleDot,
};

const categories = ["All", ...Array.from(new Set(parts.map((p) => p.category)))] as const;

export default function Marketplace() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [basket, setBasket] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return parts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (q === "" || `${p.name} ${p.fits} ${p.category}`.toLowerCase().includes(q)),
    );
  }, [category, query]);

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

  const enquiryText = `Hello ${site.name},\n\nI would like the price and availability of these parts:\n\n${items
    .map((p) => `- ${p.name} x ${basket[p.id]}`)
    .join("\n")}\n\nMy car (make, model, year):\nMy name:\n`;
  const enquiryLink = mailto("Parts enquiry from the website", enquiryText);
  const enquiryWhatsapp = whatsapp(enquiryText);

  return (
    <section id="marketplace" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Parts marketplace"
          title="Genuine parts and accessories, ready when you need them"
          text="Browse what we have in stock, add what you need to your enquiry list and send it to us. We confirm the price and the right fit for your car."
        />

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter parts by category">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === c ? "bg-ink text-white" : "bg-mist text-ink/70 hover:bg-brand-50 hover:text-brand-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="relative block w-full lg:w-80">
            <span className="sr-only">Search parts</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              maxLength={60}
              placeholder="Search parts, for example oil filter"
              className="w-full rounded-full border border-ink/15 bg-white py-2.5 pr-4 pl-11 text-sm outline-none placeholder:text-ink/40 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15"
            />
          </label>
        </div>

        <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((part) => {
              const Icon = categoryIcons[part.category];
              const qty = basket[part.id] ?? 0;
              return (
                <motion.li
                  key={part.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand-900/10"
                >
                  <div className="relative grid aspect-[16/10] place-items-center overflow-hidden bg-gradient-to-br from-ink via-brand-900 to-brand-700">
                    <div className="bg-grid absolute inset-0" aria-hidden />
                    {part.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={part.image} alt={part.name} loading="lazy" className="relative size-full object-cover" />
                    ) : (
                      <span className="relative grid size-24 place-items-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        <Icon className="size-10" strokeWidth={1.5} />
                      </span>
                    )}
                    <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ink">
                      {part.category}
                    </span>
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                      <span className="size-1.5 rounded-full bg-white" /> In stock
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-semibold">{part.name}</h3>
                    <p className="mt-1 text-sm font-medium text-brand-700">Fits: {part.fits}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/65">{part.description}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <p className="font-display font-semibold">{part.price ?? "Price on request"}</p>
                      <button
                        type="button"
                        onClick={() => change(part.id, 1)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                          qty ? "bg-brand-50 text-brand-700 hover:bg-brand-100" : "bg-ink text-white hover:bg-brand-600"
                        }`}
                      >
                        {qty ? <Check className="size-4" /> : <Plus className="size-4" />}
                        {qty ? `Added (${qty})` : "Add to enquiry"}
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <p className="mt-10 rounded-3xl bg-mist p-10 text-center text-ink/65">
            We could not find that part in the list. Send us a message below and we will source it for you.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-mist p-7 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="font-display text-lg font-semibold">Need a part that is not listed?</h3>
            <p className="mt-1 text-ink/65">We stock and source many more parts for luxury and exotic cars.</p>
          </div>
          <a
            href={mailto("Part request", `Hello ${site.name},\n\nI am looking for this part:\n\nMy car (make, model, year):\nMy name:\nMy phone number:\n`)}
            className="shrink-0 rounded-full bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
          >
            Request a part
          </a>
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
              aria-label="Your parts enquiry list"
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
                  href={items.length ? enquiryWhatsapp : undefined}
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
                  href={items.length ? enquiryLink : undefined}
                  aria-disabled={!items.length}
                  className={`mt-3 flex items-center justify-center gap-2 rounded-full border px-6 py-3 font-semibold transition ${
                    items.length ? "border-ink/20 text-ink hover:border-brand-600 hover:text-brand-700" : "pointer-events-none border-ink/10 text-ink/30"
                  }`}
                >
                  <Send className="size-4" /> Send enquiry by email
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
