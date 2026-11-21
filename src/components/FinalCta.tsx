import { Reveal, SmartButton } from './ui';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 sm:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_30%,transparent_100%)]" />
        <div className="absolute bottom-[-20rem] left-1/2 h-[34rem] w-[56rem] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />
      </div>

      <div className="page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tightest text-fg sm:text-6xl">
            Ertangi yig‘ilishga
            <span className="text-gradient"> raqamlar bilan keling.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 flex justify-center">
          <SmartButton size="lg" withHint className="sm:items-center" />
        </Reveal>
      </div>
    </section>
  );
}
