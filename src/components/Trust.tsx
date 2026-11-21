import { PERMISSIONS, TRUST } from '../content';
import { Reveal, SectionHead } from './ui';

export function Trust() {
  return (
    <section id="security" className="border-t border-line py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Xavfsizlik"
            title={
              <>
                Pulse ko‘radi.
                <span className="text-fg-dim"> O‘zgartirmaydi.</span>
              </>
            }
            text="Ulanishda UYSOT sizga Pulse so‘rayotgan ruxsatlarni aniq ko‘rsatadi. Hammasi faqat o‘qish uchun."
          />

          <Reveal delay={120} className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {PERMISSIONS.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-900 py-1.5 pl-3.5 pr-1.5 text-sm text-fg"
                >
                  {p}
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-accent">
                    O‘QISH
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-7">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={(i % 2) * 80} className="bg-ink-950 p-6 sm:p-8">
              <h3 className="text-lg font-medium tracking-tight text-fg">{t.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
