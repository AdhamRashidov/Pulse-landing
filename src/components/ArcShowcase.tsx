import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { SHOWCASE } from '../content';
import { MEDIA } from '../media.gen';

/**
 * Yoy-karusel (Kumo uslubi): funksiya kartalari yoy bo'ylab tizilgan, tanlangani
 * markazga kelib kattalashadi, tavsifi pastda almashadi. Avtomatik aylanadi
 * (hover'da va "pauza"da to'xtaydi; `prefers-reduced-motion` da o'zi boshlanmaydi).
 *
 * Geometriya: har karta "slot"i kartadan R masofa pastdagi nuqta atrofida buriladi —
 * shuning uchun kartalar yoy bo'ylab joylashadi va o'z-o'zidan qiyshayadi.
 * Masshtab ichki elementda (markazi atrofida), burilish tashqi slotda.
 */
const DURATION_MS = 5500;
const ASPECT = 15 / 8; // bannerlar 1200×640 (scripts/build-images.mjs)
const VISIBLE_SIDE = 3; // har tomonda nechta karta ko'rinadi

export function ArcShowcase() {
  const n = SHOWCASE.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const width = useWidth(stageRef);
  // Oldingi markaziy slayd — yoyning bir chetidan ikkinchisiga "sakraydigan" kartani aniqlash uchun
  const prevActive = useRef(active);
  useEffect(() => {
    prevActive.current = active;
  }, [active]);

  const go = (i: number) => setActive(((i % n) + n) % n);
  // Markazdan nisbiy o'rin: [-n/2, n/2)
  const offset = (i: number, a: number) => {
    let d = (((i - a) % n) + n) % n;
    if (d >= n / 2) d -= n;
    return d;
  };

  // Telefonda markaziy karta kengroq
  const narrow = width < 640;
  const cardW = width * (narrow ? 0.8 : 0.5);
  const cardH = cardW / ASPECT;
  const small = narrow ? 0.34 : 0.3;
  const R = width * (narrow ? 1.25 : 1.1); // kichikroq radius — egriroq yoy
  // Burchaklar: markaz ↔ 1-qo'shni va qo'shnilar orasidagi yoy uzunligi / R
  const step1 = (cardW / 2 + (cardW * small) / 2 + width * 0.025) / R;
  const stepN = (cardW * small + width * 0.02) / R;
  const angleOf = (d: number) => (d === 0 ? 0 : Math.sign(d) * (step1 + (Math.abs(d) - 1) * stepN));
  const padTop = narrow ? 20 : 40;
  // Sahna balandligi: 2-qo'shni (chetda yarim ko'rinadigan) kartaning pastki cheti hisobga olinadi
  const drop = R * (1 - Math.cos(angleOf(2))) + (cardH * small) / 2;
  const stageH = padTop + Math.max(cardH, cardH / 2 + drop) + (narrow ? 12 : 20);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') go(active + 1);
    else if (e.key === 'ArrowLeft') go(active - 1);
    else return;
    e.preventDefault();
  };

  const slide = SHOWCASE[active];

  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-line bg-gradient-to-b from-ink-850 to-ink-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Fon: to'r va markazdagi yumshoq nur */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_35%,#000_20%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[18%] h-[60%] w-[60%] -translate-x-1/2 rounded-full bg-accent/[0.08] blur-[90px]" />
      </div>

      {/* Sahna */}
      <div
        ref={stageRef}
        role="group"
        aria-roledescription="karusel"
        aria-label="Pulse imkoniyatlari"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative focus-visible:outline-offset-[-4px]"
        style={{ height: width ? stageH : undefined, minHeight: width ? undefined : 360 }}
      >
        {width > 0 &&
          SHOWCASE.map((s, i) => {
            const d = offset(i, active);
            // Yoyning bir chetidan ikkinchisiga o'tgan karta animatsiyasiz ko'chadi
            // (aks holda u butun sahna bo'ylab markazdan "uchib" o'tardi).
            const wrapped = Math.abs(offset(i, prevActive.current) - d) >= n / 2;

            const hidden = Math.abs(d) > VISIBLE_SIDE;
            const isActive = d === 0;
            const slot: CSSProperties = {
              left: (width - cardW) / 2,
              top: padTop,
              width: cardW,
              height: cardH,
              transformOrigin: `50% ${cardH / 2 + R}px`,
              transform: `rotate(${angleOf(d)}rad)`,
              zIndex: 50 - Math.abs(d),
              transition: wrapped ? 'none' : undefined,
            };

            return (
              <div
                key={i}
                className="absolute transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={slot}
                aria-hidden={hidden || undefined}
              >
                <button
                  type="button"
                  tabIndex={isActive || hidden ? -1 : 0}
                  aria-label={`${s.tab}: ${s.title}`}
                  onClick={() => go(i)}
                  className={`block h-full w-full overflow-hidden border bg-ink-900 transition-[transform,opacity,box-shadow,border-radius] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'cursor-default rounded-2xl border-line-strong shadow-[0_30px_80px_-28px_rgba(15,23,42,0.35)]'
                      : 'rounded-[20px] border-line shadow-[0_12px_30px_-12px_rgba(15,23,42,0.25)] hover:brightness-[1.02]'
                  }`}
                  style={{
                    transform: `scale(${isActive ? 1 : small})`,
                    opacity: hidden ? 0 : 1,
                    transition: wrapped ? 'none' : undefined,
                  }}
                >
                  <img
                    src={MEDIA[s.image].src}
                    width={MEDIA[s.image].w}
                    height={MEDIA[s.image].h}
                    alt=""
                    draggable={false}
                    loading={Math.abs(d) <= 1 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="block h-full w-full select-none object-cover"
                  />
                </button>
              </div>
            );
          })}
      </div>

      {/* Tavsif — markaziy kartaga tegishli */}
      <div className="relative px-5 pb-8 text-center sm:px-10 sm:pb-10">
        <div key={active} className="mx-auto max-w-2xl animate-[fadeIn_.5s_ease]" aria-live="polite">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">{slide.tab}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-[2.1rem] sm:leading-tight">
            {slide.title}
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-fg-muted sm:text-base">{slide.text}</p>
        </div>

        {/* Boshqaruv: pauza + progress segmentlari + o'qlar */}
        <div className="mx-auto mt-8 flex max-w-xl items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? 'To‘xtatish' : 'Davom ettirish'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fg text-white transition hover:bg-[#26272A]"
          >
            {playing ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5 translate-x-px" fill="currentColor" />}
          </button>

          <div className="flex flex-1 gap-1.5" role="tablist" aria-label="Slaydlar">
            {SHOWCASE.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${i + 1}: ${s.title}`}
                onClick={() => go(i)}
                className="group relative h-6 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-ink-700 transition group-hover:bg-fg-dim/40">
                  {i < active && <span className="absolute inset-0 bg-fg/70" />}
                  {i === active && (
                    <span
                      key={`${active}-${playing}`}
                      className="progress-fill absolute inset-y-0 left-0 bg-fg"
                      style={{
                        width: playing ? undefined : '100%',
                        animation: playing ? `progress ${DURATION_MS}ms linear forwards` : undefined,
                        animationPlayState: hovered ? 'paused' : 'running',
                      }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Oldingi"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink-900 text-fg-muted transition hover:text-fg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Keyingi"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-ink-900 text-fg-muted transition hover:text-fg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

/** Element kengligi (ResizeObserver). Birinchi o'lchovgacha 0. */
function useWidth(ref: RefObject<HTMLElement>): number {
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setW(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return w;
}
