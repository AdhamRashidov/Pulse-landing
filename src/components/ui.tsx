import { useState, type CSSProperties, type ReactNode } from 'react';
import { AlertCircle, ArrowRight, ArrowUpRight } from 'lucide-react';
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
            'UYSOT ruxsat sahifasi ochiladi · taxminan 1 daqiqa'
          )}
        </p>
      )}
    </div>
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
