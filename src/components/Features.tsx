import { Flame, Target, PhoneCall, BarChart3, ArrowUpRight } from 'lucide-react';
import { config } from '../config';

export function Features() {
  return (
    <section id="features" className="border-t border-slate-900 bg-slate-950 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs font-semibold text-cyan-400">
            Imkoniyatlar
          </div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-white">
            Aniq raqamlar. <span className="text-slate-400">Taxminlarsiz sotuv.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Sotuv bo‘limining haqiqiy holatini bitta oynada ko‘rsatuvchi 4 ta asosiy tahlil ustuni.
          </p>
        </div>

        {/* Bento Grid (ChronoTask & Linear style) */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Speed to Lead (Large 7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Speed-to-Lead Nazorati</h3>
                    <p className="text-xs text-slate-400">Birinchi aloqa tezligi & issiq lidlar</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  &lt;15 daqiqa
                </span>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Lid tizimga tushishi bilan birinchi qo‘ng‘iroqqacha bo‘lgan vaqtni soniyasigacha o‘lchang.
                15 daqiqadan o‘tgan har bir lid sovib ketadi.
              </p>
            </div>

            {/* Visual mini bar */}
            <div className="mt-6 pt-5 border-t border-slate-800/60 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">🔥 Issiq lidlar (&lt;15m)</span>
                <span className="text-white font-mono font-bold">78.4% (982 ta)</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '78.4%' }} />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>🟡 Iliq: 16.1%</span>
                <span>🔴 Kechikkan: 5.5%</span>
                <span className="text-emerald-400 font-semibold">Konversiya: 24.2%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Plan / Fakt (5 cols) */}
          <div className="md:col-span-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition duration-300">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Plan / Fakt</h3>
                  <p className="text-xs text-slate-400">Oylik tushum monitoringi</p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Reja va faktik tushum avtomatik hisoblanadi. Kunlik qoldiq va oy yakuni prognozi bitta raqamda.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/60">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-2xl font-black text-white font-mono">89.6%</span>
                <span className="text-xs text-emerald-400 font-mono font-semibold">448M / 500M so‘m</span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full" style={{ width: '89.6%' }} />
              </div>
              <div className="mt-2 text-[11px] text-slate-400">Oy yakuniga prognoz: 106%</div>
            </div>
          </div>

          {/* Card 3: Calls Heatmap (5 cols) */}
          <div className="md:col-span-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition duration-300">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Qo‘ng‘iroqlar Xaritasi</h3>
                  <p className="text-xs text-slate-400">Optimal aloqa soatlari</p>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mijozlar qaysi soatda eng faol javob beryapti? Zichlik xaritasi orqali menejerlar jadvalini to‘g‘rilang.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/60">
              <div className="grid grid-cols-7 gap-1 h-8 items-end">
                {[40, 75, 95, 80, 100, 60, 20].map((val, idx) => (
                  <div
                    key={idx}
                    className="bg-cyan-500/80 rounded-xs hover:bg-cyan-400 transition"
                    style={{ height: `${val}%` }}
                    title={`Faollik: ${val}%`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1.5">
                <span>Dush</span>
                <span>Chor</span>
                <span>Jum</span>
                <span>Yak</span>
              </div>
            </div>
          </div>

          {/* Card 4: Marketing ROI (7 cols) */}
          <div className="md:col-span-7 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition duration-300">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Marketing Kanallari ROI</h3>
                    <p className="text-xs text-slate-400">Haqiqiy to‘lov keltirayotgan manbalar</p>
                  </div>
                </div>
                <a
                  href={config.iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-semibold"
                >
                  <span>Tahlil</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Instagram, Telegram yoki Sayt — qaysi kanal quruq spam lidlar emas, balki real daromad keltirayotganini aniq ko‘ring.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/60 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <div className="text-slate-400">Instagram Target</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">184M so‘m</div>
                <div className="text-[10px] text-slate-500">Konversiya: 14.2%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-800">
                <div className="text-slate-400">Telegram Kanallar</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">142M so‘m</div>
                <div className="text-[10px] text-slate-500">Konversiya: 11.8%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
