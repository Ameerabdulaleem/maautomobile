"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck, Wrench } from "lucide-react";
import CarArt from "./CarArt";
import { site } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.6, 0.35, 1] as const } },
};

const points = [
  { icon: Wrench, label: "Specialist technicians" },
  { icon: ShieldCheck, label: "Genuine quality parts" },
  { icon: BadgeCheck, label: `CAC registered, RC ${site.rc}` },
];

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-18 text-white">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-brand-500/25 blur-[140px]"
      />
      <div aria-hidden className="absolute bottom-[-30%] left-[-10%] size-[30rem] rounded-full bg-brand-700/30 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:py-28">
        <motion.div variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-200"
          >
            <MapPin className="size-3.5" /> Mabushi, Abuja FCT
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Expert care for <span className="text-brand-400">Range Rover</span>, Mercedes-Benz and Rolls-Royce.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {site.name} is the workshop Abuja trusts with luxury and exotic cars. Precise diagnostics, proper repairs,
            genuine parts and quality cars for sale, all under one roof.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 font-semibold text-white shadow-xl shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-400"
            >
              Book a Service
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#marketplace"
              className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition hover:border-white hover:bg-white hover:text-ink"
            >
              Shop Car Parts
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {points.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-white/80">
                <span className="grid size-9 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                  <Icon className="size-4.5" />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.6, 0.35, 1] }}
          className="relative"
        >
          <div className="absolute inset-x-6 top-1/2 h-40 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.02] p-6 backdrop-blur-sm sm:p-10">
            <div className="animate-float">
              <CarArt body="suv" color="#157c38" moving className="w-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.55)]" />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {["Repair", "Parts", "Sales"].map((label) => (
                <a
                  key={label}
                  href={label === "Repair" ? "#services" : label === "Parts" ? "#marketplace" : "#cars"}
                  className="rounded-2xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white/85 transition hover:border-brand-400/60 hover:bg-brand-500/15"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
