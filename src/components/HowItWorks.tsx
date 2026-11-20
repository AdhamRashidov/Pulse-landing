import { InstallButton } from './InstallButton';

const STEPS = [
  {
    num: '01',
    title: 'Tugmani bosing',
    desc: '“UYSOT‘ga o‘rnatish” tugmasi sizni rasmiy UYSOT ruxsat oynasiga yo‘naltiradi.',
  },
  {
    num: '02',
    title: 'Ruxsatni tasdiqlang',
    desc: 'UYSOT oynasida ilovaga 1 marta ruxsat bering. Parol kiritish talab qilinmaydi.',
  },
  {
    num: '03',
    title: 'Kabinetingizda oching',
    desc: 'Tizim sizni avtomatik ravishda UYSOT CRM ichidagi (iframe/82) tahlillarga olib boradi.',
  },
];

export function HowItWorks() {
  return (
    <section className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-400">
            Oddiy Jarayon
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white">
            1 daqiqada UYSOT'ga ulanadi
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 relative hover:border-slate-700 transition"
            >
              <div className="text-3xl font-black text-cyan-400 font-mono mb-4">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <InstallButton size="lg" />
        </div>
      </div>
    </section>
  );
}
