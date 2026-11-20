import { useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { MINIMAL_FAQS } from '../constants/landingData';
import { config } from '../config';

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="border-t border-slate-900 bg-slate-950 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-400">
            Savol-Javob
          </div>
          <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-white">
            Ko‘p beriladigan savollar
          </h2>
        </div>

        <div className="space-y-3">
          {MINIMAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/40 overflow-hidden transition hover:border-slate-700"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Telegram Direct Support Pill */}
        <div className="mt-10 text-center">
          <a
            href={config.supportTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Savolingiz bormi? Telegramda javob beramiz →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
