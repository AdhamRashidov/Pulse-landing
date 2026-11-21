import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { AlertCircle, ArrowRight, ArrowUpRight, Globe, Send, X } from 'lucide-react';
import { config, installUrl } from '../config';
import { failureMessage, readInstallFailure, returnToUrl } from '../lib/install-state';
import { useInstalled, useReveal } from '../lib/hooks';

/* ───────────────────────── Logo ───────────────────────── */

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#0B0B0C" />
        <path
          d="M5 17h5.5l2.5-6 4 11 3-8 1.8 3H27"
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-fg">Pulse</span>
    </span>
  );
}

/* ───────────────────── Bitta aqlli tugma ───────────────────── */

interface SmartButtonProps {
  size?: 'sm' | 'lg';
  /** Tugma ostida holat yozuvini ko'rsatish (hero va yakuniy blokda). */
  withHint?: boolean;
  className?: string;
}

/**
 * Landing'dagi YAGONA harakat tugmasi.
 *  - Pulse shu brauzerda ulanmagan → "UYSOT'ga ulash" (OAuth o'rnatish oqimi)
 *  - ulangan → "Pulse'ni ochish" (UYSOT ichidagi Pulse)
 * UYSOT hisobi yo'q foydalanuvchini UYSOT o'zi avval kirish sahifasiga olib boradi.
 */
export function SmartButton({ size = 'lg', withHint = false, className = '' }: SmartButtonProps) {
  const [installed, setInstalled] = useInstalled();
  // Oldingi urinish yakunlanmagan bo'lsa (rad etildi / xato) — tugma ostida sababi
  const [failure] = useState(readInstallFailure);

  const href = installed ? config.iframeUrl : installUrl(returnToUrl());
  const label = installed ? 'Pulse’ni ochish' : 'UYSOT’ga ulash';

  const sizing =
    size === 'lg' ? 'h-12 px-6 text-[15px] gap-2.5 rounded-xl' : 'h-9 px-4 text-[13px] gap-2 rounded-lg';

  return (
    <div className={`inline-flex flex-col items-center gap-2.5 sm:items-start ${className}`}>
      <a
        href={href}
        className={`group inline-flex items-center justify-center bg-fg font-medium text-white shadow-[0_1px_2px_rgba(11,11,12,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] transition hover:bg-[#26272A] active:translate-y-px ${sizing}`}
      >
        <span>{label}</span>
        {installed ? (
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </a>

      {withHint && failure && !installed && (
        <p
          role="alert"
          className="flex max-w-sm items-start gap-2 rounded-lg border border-late/20 bg-late/[0.06] px-3 py-2 text-left text-[13px] leading-snug text-late"
        >
          <AlertCircle className="mt-px h-4 w-4 shrink-0" />
          <span>
            {failureMessage(failure)}{' '}
            <a href={config.supportTelegram} target="_blank" rel="noreferrer" className="underline underline-offset-2">
              Yordam
            </a>
          </span>
        </p>
      )}

      {withHint && !(failure && !installed) && (
        <p className="text-xs text-fg-dim">
          {installed ? (
            <>
              Pulse bu brauzerda ulangan.{' '}
              <button
                type="button"
                onClick={() => setInstalled(false)}
                className="text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
              >
                Qayta ulash
              </button>
            </>
          ) : (
            <>
              UYSOT ruxsat sahifasi ochiladi. Kirish so‘ralsa — kirib, tugmani qayta bosing.
              <br />
              <NoAccountLink />
            </>
          )}
        </p>
      )}
    </div>
  );
}

/**
 * "UYSOT hisobim yo'q" — UYSOT'da ochiq ro'yxatdan o'tish YO'Q (hisobni UYSOT jamoasi
 * ochadi), shuning uchun mijoz o'zi tanlaydi: UYSOT rasmiy sayti yoki qo'llab-quvvatlash.
 * Oyna — nativ <dialog>: fokus ichida qoladi, Esc va fon bosilsa yopiladi.
 */
function NoAccountLink() {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className="mt-1 text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg"
      >
        UYSOT hisobingiz yo‘qmi?
      </button>

      <dialog
        ref={ref}
        aria-labelledby="no-account-title"
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-ink-900 p-0 text-left text-fg shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] backdrop:bg-[#0F172A]/40 backdrop:backdrop-blur-[2px] open:animate-[modalIn_.35s_cubic-bezier(0.22,1,0.36,1)]"
      >
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2 id="no-account-title" className="text-lg font-semibold tracking-tight">
              UYSOT hisobingiz yo‘qmi?
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Yopish"
              className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-fg-dim transition hover:bg-ink-850 hover:text-fg"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">
            Pulse UYSOT CRM ichida ishlaydi. Hisobni UYSOT jamoasi ochib beradi — qulay yo‘lni tanlang.
          </p>

          <div className="mt-6 grid gap-2.5">
            <ChoiceLink
              href={config.supportTelegram}
              icon={<Send className="h-4 w-4" />}
              title="Telegram’da yozish"
              text="UYSOT qo‘llab-quvvatlash xodimi ulanishga yordam beradi"
            />
            <ChoiceLink
              href={config.uysotSite}
              icon={<Globe className="h-4 w-4" />}
              title="UYSOT rasmiy sayti"
              text="UYSOT CRM haqida batafsil ma’lumot"
            />
          </div>
        </div>
      </dialog>
    </>
  );
}

function ChoiceLink({ href, icon, title, text }: { href: string; icon: ReactNode; title: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3.5 rounded-xl border border-line bg-ink-950 p-3.5 transition hover:border-line-strong hover:bg-ink-900"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-fg">{title}</span>
        <span className="block text-[13px] text-fg-muted">{text}</span>
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-dim transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
    </a>
  );
}

/* ───────────────────── Skrinshot ramkasi ───────────────────── */

/** Kadrdagi to'rtburchak — kadr o'lchamiga nisbatan ulush (0..1). */
export interface Focus {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * `focus` to'rtburchagini kadr markaziga olib keladigan transform.
 * Masshtab 1..2.6 oralig'ida, kadr rasm chetidan tashqariga chiqmaydi.
 */
export function zoomTransform(f?: Focus, maxScale = 2.6): CSSProperties {
  if (!f) return { transform: 'none', transformOrigin: '0 0' };
  const PAD = 1.08;
  const s = Math.max(1, Math.min(1 / (f.w * PAD), 1 / (f.h * PAD), maxScale));
  const clamp = (v: number) => Math.min(0, Math.max(1 - s, v));
  const tx = clamp(0.5 - (f.x + f.w / 2) * s);
  const ty = clamp(0.5 - (f.y + f.h / 2) * s);
  return {
    transform: `translate(${(tx * 100).toFixed(3)}%, ${(ty * 100).toFixed(3)}%) scale(${s.toFixed(4)})`,
    transformOrigin: '0 0',
  };
}

/* ───────────────────── Kichik yordamchilar ───────────────────── */

/** Ekranga kirganda paydo bo'ladigan blok. */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  className?: string;
}) {
  return (
    <Reveal className={className || 'max-w-2xl'}>
      <p className="eyebrow">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
      </p>
      <h2 className="h2 mt-5">{title}</h2>
      {text && <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{text}</p>}
    </Reveal>
  );
}
