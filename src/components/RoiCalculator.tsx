import { useState, useId } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';
import { InstallButton } from './InstallButton';

export function RoiCalculator() {
  const [leadsCount, setLeadsCount] = useState<number>(500);
  const [dealValue, setDealValue] = useState<number>(1200); // USD

  const leadsInputId = useId();
  const dealValueInputId = useId();

  // 12% conversion, 35% loss due to >15m latency
  const normalDeals = Math.round(leadsCount * 0.12);
  const lostDeals = Math.max(1, Math.round(normalDeals * 0.35));
  const monthlyLoss = lostDeals * dealValue;

  const formatCurrency = (val: number) => {
    return '$' + val.toLocaleString('en-US');
  };

  return (
    <section id="calculator" className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-300">
                <Calculator className="h-3.5 w-3.5 text-cyan-400" />
                <span>Yo‘qotilgan Lidlar Kalkulyatori</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Kechikkan qo‘ng‘iroqlar qanchaga tushmoqda?
              </h3>

              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <label htmlFor={leadsInputId} className="text-slate-400">
                      Oylik tushayotgan lidlar:
                    </label>
                    <span className="text-cyan-400 font-mono text-sm">{leadsCount.toLocaleString()} ta</span>
                  </div>
                  <input
                    id={leadsInputId}
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={leadsCount}
                    onChange={(e) => setLeadsCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <label htmlFor={dealValueInputId} className="text-slate-400">
                      O‘rtacha bitta bitim summasi:
                    </label>
                    <span className="text-emerald-400 font-mono text-sm">{formatCurrency(dealValue)}</span>
                  </div>
                  <input
                    id={dealValueInputId}
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Direct Result */}
            <div className="lg:col-span-5 rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-semibold mb-2">
                <TrendingDown className="h-4 w-4" />
                <span>Oylik ehtimoliy yo‘qotish:</span>
              </div>

              <div className="text-4xl sm:text-5xl font-black text-rose-400 font-mono tracking-tight">
                {formatCurrency(monthlyLoss)}
              </div>
              <div className="text-xs text-slate-400 mt-2">
                ~<strong className="text-white">{lostDeals} ta xaridor</strong> 15 daqiqadan kech bog‘lanilgani uchun yo‘qotilmoqda.
              </div>

              <div className="mt-6">
                <InstallButton size="md" className="w-full justify-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
