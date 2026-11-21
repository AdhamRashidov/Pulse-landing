import { QUESTIONS } from '../content';
import { Reveal, SectionHead } from './ui';

export function Questions() {
  return (
    <section id="questions" className="border-t border-line py-24 sm:py-32">
      <div className="page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              eyebrow="Imkoniyatlar"
              title={
                <>
                  Rahbarning har kungi savollari.
                  <span className="text-fg-dim"> Javobi — bitta oynada.</span>
                </>
              }
              text="Excel yig‘ish, menejerdan so‘rash yoki CRM’ni varaqlash shart emas."
            />
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {QUESTIONS.map((item, i) => (
            <Reveal
              as="li"
              key={item.q}
              delay={(i % 2) * 80}
              className="group flex flex-col bg-ink-950 p-6 transition-colors hover:bg-ink-900 sm:p-8"
            >
              <span className="font-mono text-xs text-fg-dim">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 text-lg font-medium leading-snug tracking-tight text-fg sm:text-xl">{item.q}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{item.a}</p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[11px] text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                {item.where}
              </span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
