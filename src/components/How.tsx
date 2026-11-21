import { STEPS } from '../content';
import { Reveal, SectionHead } from './ui';

export function How() {
  return (
    <section id="how" className="border-t border-line py-24 sm:py-32">
      <div className="page">
        <SectionHead
          eyebrow="Ulanish"
          title={
            <>
              Bir tugma.
              <span className="text-fg-dim"> Uch qadam. Bir daqiqa.</span>
            </>
          }
          text="Ro‘yxatdan o‘tish, login, parol yoki texnik sozlama yo‘q — Pulse UYSOT orqali ulanadi."
        />

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Qadamlarni bog'lovchi chiziq */}
          <div aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-line md:block" />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="relative">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-950 font-mono text-sm text-accent">
                {i + 1}
              </span>
              <h3 className="mt-6 text-xl font-medium tracking-tight text-fg">{step.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-fg-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
