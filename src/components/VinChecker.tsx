"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LoaderCircle, MessageCircle, ScanLine, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { whatsapp } from "@/lib/site";
import { normaliseVin, VIN_PATTERN, type VinResult } from "@/lib/vin";

const labels: [key: keyof VinResult, label: string][] = [
  ["year", "Model year"],
  ["make", "Make"],
  ["model", "Model"],
  ["trim", "Trim or series"],
  ["bodyClass", "Body type"],
  ["engine", "Engine"],
  ["fuel", "Fuel"],
  ["transmission", "Transmission"],
  ["driveType", "Drive type"],
  ["manufacturer", "Manufacturer"],
  ["builtIn", "Built in"],
];

export default function VinChecker() {
  const [vin, setVin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<VinResult | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setResult(null);

    if (!VIN_PATTERN.test(vin)) {
      setError("Please enter a valid 17 character VIN. A VIN never contains the letters I, O or Q.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await fetch(`/api/vin?vin=${encodeURIComponent(vin)}`);
      const data = (await response.json()) as VinResult & { error?: string };
      if (!response.ok) setError(data.error ?? "We could not check that VIN. Please try again.");
      else setResult(data);
    } catch {
      setError("We could not reach the VIN service. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const rows = result ? labels.filter(([key]) => result[key]) : [];

  return (
    <section id="vin-check" className="relative overflow-hidden bg-mist py-24">
      <div aria-hidden className="absolute -top-32 right-[-10%] size-[30rem] rounded-full bg-brand-300/30 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:px-8">
        <Reveal from="left">
          <p className="text-sm font-semibold tracking-[0.2em] text-brand-600 uppercase">Free VIN Checker</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Run a Free VIN Check Instantly
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink/65">
            <strong className="font-semibold text-ink">Check VIN specifications.</strong> Instantly decode your VIN
            online to discover your car&apos;s year, make, model and engine specifications.
          </p>
          <ul className="mt-7 space-y-3 text-ink/75">
            {[
              "Confirm a car is what the seller says it is before you pay",
              "Order the right parts for the exact engine in your car",
              "Free to use, with no sign up needed",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-600" />
                {line}
              </li>
            ))}
          </ul>
          <a
            href={whatsapp("Hello, I would like to book a vehicle repair or a pre purchase inspection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
          >
            <MessageCircle className="size-5 shrink-0" />
            Chat With Us For Vehicle Repair And Pre Purchase Inspection
          </a>
        </Reveal>

        <Reveal from="right">
          <div className="rounded-[2rem] bg-white p-7 shadow-xl ring-1 shadow-brand-900/5 ring-ink/5 sm:p-9">
            <form onSubmit={onSubmit} noValidate>
              <label htmlFor="vin-input" className="flex items-center gap-2 font-display font-semibold">
                <ScanLine className="size-5 text-brand-600" /> Vehicle Identification Number
              </label>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  id="vin-input"
                  value={vin}
                  onChange={(e) => setVin(normaliseVin(e.target.value))}
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                  maxLength={17}
                  placeholder="Enter 17 character VIN"
                  aria-describedby="vin-help"
                  aria-invalid={Boolean(error)}
                  className="w-full min-w-0 flex-1 rounded-2xl border border-ink/15 bg-mist px-5 py-4 font-mono text-base tracking-[0.12em] uppercase outline-none placeholder:font-sans placeholder:tracking-normal placeholder:text-ink/35 placeholder:normal-case focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/15"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-7 py-4 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 disabled:opacity-70"
                >
                  {loading ? <LoaderCircle className="size-5 animate-spin" /> : null}
                  {loading ? "Checking" : "Check VIN"}
                  {!loading && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
                </button>
              </div>
              <div id="vin-help" className="mt-3 flex items-center justify-between gap-4 text-sm text-ink/55">
                <span>Find it on the dashboard by the windscreen, the driver door frame or your car papers.</span>
                <span className={`shrink-0 font-mono ${vin.length === 17 ? "text-brand-700" : ""}`}>{vin.length}/17</span>
              </div>
            </form>

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
                  >
                    {error}
                  </motion.p>
                )}

                {result && (
                  <motion.div
                    key={result.vin}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-7"
                  >
                    <div className="rounded-2xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white">
                      <p className="font-mono text-xs tracking-[0.2em] text-white/70">{result.vin}</p>
                      <p className="mt-2 font-display text-2xl font-semibold">
                        {[result.year, result.make, result.model].filter(Boolean).join(" ") || "Vehicle details"}
                      </p>
                    </div>

                    {rows.length > 0 ? (
                      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                        {rows.map(([key, label], i) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="rounded-2xl bg-mist px-5 py-3.5"
                          >
                            <dt className="text-xs font-semibold tracking-[0.14em] text-ink/50 uppercase">{label}</dt>
                            <dd className="mt-0.5 font-medium text-ink">{result[key]}</dd>
                          </motion.div>
                        ))}
                      </dl>
                    ) : (
                      <p className="mt-4 text-sm text-ink/65">We could not read any details from this VIN.</p>
                    )}

                    <p className="mt-4 text-sm leading-relaxed text-ink/55">
                      {result.source === "basic"
                        ? "Full specifications were not available for this VIN, so these details were read from the VIN itself. Send it to us and we will confirm the rest."
                        : "Specifications are provided as a guide. For a full health report, book a pre purchase inspection with us."}
                    </p>
                    <a
                      href={whatsapp(`Hello, please help me with this car. VIN: ${result.vin}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-600"
                    >
                      <MessageCircle className="size-4" /> Send this VIN to us on WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
