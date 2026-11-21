import { useId, useState } from 'react';
import { Reveal, SectionHead } from './ui';

/**
 * Kech qo'ng'iroq qilingan lidlar qancha sotuvni yo'qotayotganini TAXMINIY hisoblaydi.
 * Barcha kirish qiymatlari — foydalanuvchining o'z raqamlari. Yagona taxmin
 * (`LATE_PENALTY`) sahifada ochiq yozilgan.
 */
const LATE_PENALTY = 0.5; // kech javob olgan lid tez javob olganga qaraganda 2 barobar kam sotuvga aylanadi

const fmt = (n: number) => Math.round(n).toLocaleString('ru-RU').replace(/ /g, ' ');

export function Calculator() {
  const [leads, setLeads] = useState(800);
  const [latePct, setLatePct] = useState(30);
  const [convPct, setConvPct] = useState(3);
  const [deal, setDeal] = useState(50000);

  const lateLeads = leads * (latePct / 100);
  const lostDeals = lateLeads * (convPct / 100) * LATE_PENALTY;
  const lostRevenue = lostDeals * deal;

  return (
    <section id="calculator" className="border-t border-line py-24 sm:py-32">
      <div className="page">
        <SectionHead
          eyebrow="Hisob-kitob"
          title={
            <>
              Kech qo‘ng‘iroq
              <span className="text-fg-dim"> qanchaga tushyapti?</span>
            </>
          }
          text="O‘z raqamlaringizni kiriting. Pulse’ning birinchi aloqa hisoboti aynan shu kechikkan lidlarni ko‘rsatadi."
        />

        <Reveal className="mt-12 grid overflow-hidden rounded-2xl border border-line lg:grid-cols-12">
          <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-10 lg:col-span-7">
            <Slider label="Oyiga yangi lidlar" value={leads} min={50} max={5000} step={50} onChange={setLeads} display={`${fmt(leads)} ta`} />
            <Slider label="15 daqiqadan kech qo‘ng‘iroq olganlar" value={latePct} min={0} max={90} step={5} onChange={setLatePct} display={`${latePct}%`} />
            <Slider label="Liddan sotuvga konversiya" value={convPct} min={1} max={20} step={0.5} onChange={setConvPct} display={`${convPct}%`} />
            <Slider label="O‘rtacha bitim summasi" value={deal} min={10000} max={300000} step={5000} onChange={setDeal} display={`$${fmt(deal)}`} />
          </div>

          <div className="flex flex-col justify-between gap-8 border-t border-line bg-ink-900 p-6 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
            <div>
              <p className="eyebrow">Oyiga taxminiy yo‘qotish</p>
              <p className="mt-4 font-mono text-5xl font-medium tracking-tight text-late sm:text-6xl" aria-live="polite">
                ${fmt(lostRevenue)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                <span className="text-fg">{fmt(lateLeads)} ta lid</span> kech qo‘ng‘iroq oladi — bu taxminan{' '}
                <span className="text-fg">{lostDeals < 10 ? lostDeals.toFixed(1) : fmt(lostDeals)} ta</span> boy berilgan sotuv.
              </p>
            </div>
            <p className="text-xs leading-relaxed text-fg-dim">
              Taxmin: kech javob olgan lid tez javob olganga qaraganda ikki barobar kam sotuvga aylanadi. Bu
              ko‘rsatkich kompaniyadan kompaniyaga farq qiladi — hisob yo‘nalish beradi, kafolat emas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm text-fg-muted">
          {label}
        </label>
        <span className="font-mono text-sm text-fg">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-4"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
