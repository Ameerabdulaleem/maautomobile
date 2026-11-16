import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import { faqs } from "@/lib/data";

export default function Faq() {
  const half = Math.ceil(faqs.length / 2);
  const columns = [faqs.slice(0, half), faqs.slice(half)];

  return (
    <section id="faq" className="bg-mist py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="inline-flex items-center gap-4 text-sm font-medium text-ink/70">
            <span className="h-px w-12 bg-ink/40" /> FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-5 lg:grid-cols-2">
          {columns.map((column, c) => (
            <div key={c} className="space-y-5">
              {column.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 0.06} from={c === 0 ? "left" : "right"}>
                  <details className="group" open={c === 0 && i === 0}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-full border border-ink/15 px-7 py-4.5 font-medium transition group-open:border-transparent group-open:bg-ink/[0.07] hover:border-brand-500 [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="px-7 pt-5 pb-2 leading-relaxed text-ink/70">{faq.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
