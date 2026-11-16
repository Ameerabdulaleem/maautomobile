"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { whatsapp } from "@/lib/site";

const slides = [
  {
    lead: "Drive With Certainty:",
    before: "Trusted ",
    accent: "Range Rover",
    after: " Experts",
    sub: "Over 20 years of specialist repairs and advanced diagnostics.",
    image: "/hero/range-rover.jpg",
    alt: "Black Range Rover Sport driving through a city street",
    position: "object-[50%_62%]",
  },
  {
    lead: "Fix It Right The First Time:",
    before: "",
    accent: "Mercedes-Benz",
    after: " Care Made Easy",
    sub: "Your car deserves more than trial and error mechanics.",
    image: "/hero/mercedes-s-class.jpg",
    alt: "Black Mercedes-Benz S-Class saloon",
    position: "object-[50%_58%]",
  },
  {
    lead: "Steer With Confidence:",
    before: "",
    accent: "Rolls-Royce",
    after: " And Exotic Car Specialists",
    sub: "Skilled hands, genuine parts and honest advice, all under one roof.",
    image: "/hero/rolls-royce-ghost.jpg",
    alt: "White Rolls-Royce Ghost parked in a city lane",
    position: "object-[50%_70%]",
  },
] as const;

const INTERVAL = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((step: number) => setIndex((i) => (i + step + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(timer);
  }, [paused, reduce, go, index]);

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative overflow-hidden bg-gradient-to-b from-[#e9eeea] to-mist pt-18"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 pt-9 lg:px-8 lg:pt-11">
        {/* Every headline sits in the same grid cell, so the height never jumps between slides */}
        <div className="grid">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <motion.div
                key={slide.accent}
                aria-hidden={!active}
                initial={false}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
                transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
                className={`col-start-1 row-start-1 ${active ? "" : "pointer-events-none"}`}
              >
                <h1 className="max-w-4xl font-display text-4xl leading-[1.12] font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
                  {slide.lead}
                  <br />
                  {slide.before}
                  <span className="text-brand-600">{slide.accent}</span>
                  {slide.after}
                </h1>
                <p className="mt-5 text-lg text-ink/65">{slide.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href={whatsapp("Hello, I would like to speak with a service advisor about my car.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            Chat With Service Advisor
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="font-semibold text-ink underline decoration-brand-500 decoration-2 underline-offset-8 transition hover:text-brand-700"
          >
            Book An Inspection
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[92rem] px-3 pb-10 sm:px-5">
        <div className="relative h-[19rem] overflow-hidden rounded-[2rem] bg-ink shadow-2xl shadow-ink/25 sm:h-[26rem] lg:h-[33rem]">
          {slides.map((slide, i) => {
            const active = i === index;
            return (
              <motion.div
                key={slide.image}
                aria-hidden={!active}
                initial={false}
                animate={{ opacity: active ? 1 : 0, scale: active && !reduce ? 1.08 : 1 }}
                transition={{ opacity: { duration: 1 }, scale: { duration: active ? 7 : 1, ease: "linear" } }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1500px) 1450px, 100vw"
                  className={`object-cover ${slide.position}`}
                />
              </motion.div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" aria-hidden />

          <div className="absolute bottom-5 left-5 flex items-center gap-4 text-white sm:right-8 sm:bottom-7 sm:left-auto">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="grid size-10 place-items-center rounded-full border border-white/40 backdrop-blur transition hover:bg-white hover:text-ink"
            >
              <ArrowLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2.5">
              {slides.map((slide, i) => (
                <button
                  key={slide.accent}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show slide ${i + 1}: ${slide.accent}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-brand-400" : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="grid size-10 place-items-center rounded-full border border-white/40 backdrop-blur transition hover:bg-white hover:text-ink"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
