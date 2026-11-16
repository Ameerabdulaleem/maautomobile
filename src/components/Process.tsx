"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarCheck, ClipboardCheck, Cog, ScanSearch, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { steps } from "@/lib/data";

const icons = [CalendarCheck, ScanSearch, Wrench, ClipboardCheck];
const INTERVAL = 4500;

export default function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % steps.length), INTERVAL);
    return () => clearInterval(timer);
  }, [paused, reduce]);

  const Icon = icons[active];

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 text-white">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute inset-y-0 left-[18%] w-[28%] -skew-x-[24deg] bg-gradient-to-b from-white/[0.06] to-transparent"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <Reveal from="left">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-400 uppercase">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Our working process</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/65">
            A clear process, so you always know what is happening with your car and what it will cost.
          </p>

          <ol
            className="mt-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.title} className="border-b border-white/10 last:border-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="relative flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className={`shrink-0 transition-colors ${isActive ? "text-brand-400" : "text-white/40"}`}>
                      {isActive ? <ArrowRight className="size-5" /> : <ArrowDown className="size-5" />}
                    </span>
                    <span className="relative flex-1 overflow-hidden rounded-md px-3 py-2">
                      {isActive && (
                        <motion.span
                          layoutId="process-highlight"
                          className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-600/0"
                          transition={{ type: "spring", stiffness: 260, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative font-display text-lg font-medium transition-colors ${
                          isActive ? "text-white" : "text-white/55"
                        }`}
                      >
                        <span className="mr-3 text-sm text-white/50">0{i + 1}</span>
                        {step.title}
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden pl-12 leading-relaxed text-white/65"
                      >
                        <span className="block pb-5">{step.text}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal from="right" className="relative mx-auto grid aspect-square w-full max-w-md place-items-center">
          <div className="absolute inset-8 rounded-full bg-brand-500/25 blur-3xl" aria-hidden />
          <Cog className="absolute size-full animate-spin-slow text-white/[0.07]" strokeWidth={0.6} aria-hidden />
          <Cog
            className="absolute right-2 bottom-4 size-28 animate-spin-slow text-brand-500/40 [animation-direction:reverse]"
            strokeWidth={1}
            aria-hidden
          />
          <div className="relative grid size-56 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-brand-600 to-brand-900 shadow-2xl shadow-brand-900/60">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <Icon className="size-16" strokeWidth={1.4} />
                <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">Step 0{active + 1}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
