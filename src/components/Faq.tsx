import { Plus } from 'lucide-react';
import { FAQS } from '../content';
import { config } from '../config';
import { Reveal, SectionHead } from './ui';

export function Faq() {
  return (
    <section id="faq" className="border-t border-line py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Savollar" title="Ko‘p so‘raladigan savollar" />
          <Reveal delay={100} className="mt-8">
            <a
              href={config.supportTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition hover:text-accent"
            >
              Javob topmadingizmi? Telegramda yozing →
            </a>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8">
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f, i) => (
              <details key={f.q} className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-base font-medium text-fg sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="h-4 w-4 shrink-0 text-fg-dim transition-transform duration-300 group-open:rotate-45 group-open:text-accent" />
                </summary>
                <p className="-mt-1 max-w-2xl pb-6 text-[15px] leading-relaxed text-fg-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
