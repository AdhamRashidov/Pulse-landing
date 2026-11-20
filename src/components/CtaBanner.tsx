import { Sparkles } from 'lucide-react';
import { InstallButton, OpenInCrmButton } from './InstallButton';

export function CtaBanner() {
  return (
    <section className="border-t border-slate-900 bg-slate-950 py-20 sm:py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-[36rem] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>Tezkor Boshlash</span>
        </div>

        <h2 className="mt-5 text-3xl sm:text-5xl font-black text-white tracking-tight">
          Sotuvlaringizni bugunoq nazoratga oling
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          UYSOT kabinetingizga 1 daqiqada ulang. Hech qanday murakkab texnik sozlama talab qilinmaydi.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <InstallButton size="lg" className="w-full sm:w-auto" />
          <OpenInCrmButton className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
