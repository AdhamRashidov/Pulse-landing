import { Check } from 'lucide-react';
import { FACTS, HERO } from '../content';
import { Reveal, SmartButton } from './ui';
import { ArcShowcase } from './ArcShowcase';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Fon: konstruktiv to'r + yuqoridan yumshoq nur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20rem] h-[36rem] w-[64rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[120px]" />
      </div>

      <div className="page pb-20 pt-16 sm:pt-24 lg:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="eyebrow justify-center">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-blip rounded-full bg-accent" />
              </span>
              {HERO.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.4rem] font-semibold leading-[1.04] tracking-tightest text-fg sm:text-6xl lg:text-[4.75rem]">
              {HERO.title[0]}
              <br />
              <span className="text-gradient">{HERO.title[1]}</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-xl">
              {HERO.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240} className="mt-10 flex justify-center">
            <SmartButton size="lg" withHint className="sm:items-center" />
          </Reveal>

          <Reveal delay={300}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-fg-muted">
              {HERO.notes.map((n) => (
                <li key={n} className="inline-flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Mahsulot — funksiyalar yoy-karuseli (Kumo uslubi) */}
        <Reveal delay={200} className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          <PulseLine />
          <ArcShowcase />
        </Reveal>

        {/* Faktlar qatori */}
        <Reveal className="mx-auto mt-16 max-w-5xl">
          <dl className="grid grid-cols-2 border-y border-line sm:grid-cols-4">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`px-4 py-7 text-center sm:py-9 ${i % 2 === 1 ? 'border-l border-line' : ''} ${
                  i >= 2 ? 'border-t border-line sm:border-t-0' : ''
                } ${i === 2 ? 'sm:border-l' : ''}`}
              >
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block font-mono text-4xl font-medium tracking-tight text-fg sm:text-5xl">
                    {f.value}
                  </span>
                  <span className="mt-2 block text-sm text-fg-dim">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Skrinshot orqasidan o'tuvchi "puls" chizig'i — brend motivi. */
function PulseLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -left-[10%] top-[-56px] -z-10 h-28 w-[120%] opacity-70"
    >
      <defs>
        <linearGradient id="pl" x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity="0" />
          <stop offset="0.5" stopColor="#22D3EE" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 80 H470 L500 80 L522 30 L548 112 L574 52 L592 80 H1200"
        fill="none"
        stroke="url(#pl)"
        strokeWidth="2"
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset="1"
        className="animate-trace"
      />
    </svg>
  );
}
