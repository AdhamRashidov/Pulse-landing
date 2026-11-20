import { Sparkles } from 'lucide-react';
import { InstallButton, OpenInCrmButton } from './InstallButton';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-28 sm:pb-20">
      {/* Kumo/Trading-inspired Ambient Radial Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[28rem] w-[50rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Minimal Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-semibold text-cyan-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>UYSOT CRM Marketplace Rasmiy Ilovasi</span>
        </div>

        {/* Minimal Bold H1 */}
        <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
          Sotuvlar nazorati.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-brand-300 to-white bg-clip-text text-transparent">
            Sekundlar ichida.
          </span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
          Speed-to-lead, plan-fakt va qo‘ng‘iroqlar xaritasi — 15 ms chaqmoqdek tezlikda,
          to‘g‘ridan-to‘g‘ri <strong className="text-white font-semibold">UYSOT CRM</strong> kabinetingizda.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <InstallButton size="lg" className="w-full sm:w-auto" />
          <OpenInCrmButton className="w-full sm:w-auto" />
        </div>

        {/* Instant Metrics Strip (Zero Fluff, High Impact) */}
        <div className="mt-14 pt-8 border-t border-slate-900/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="text-left sm:text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">15 ms</div>
            <div className="text-xs text-slate-500 mt-0.5">Kesh tezligi</div>
          </div>
          <div className="text-left sm:text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">&lt;15 daq</div>
            <div className="text-xs text-slate-500 mt-0.5">Speed-to-lead</div>
          </div>
          <div className="text-left sm:text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">UYSOT ichida</div>
          </div>
          <div className="text-left sm:text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">0 ta</div>
            <div className="text-xs text-slate-500 mt-0.5">Parol / Sozlama</div>
          </div>
        </div>
      </div>
    </section>
  );
}
