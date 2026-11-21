import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { MousePointer2, Pause, Play } from 'lucide-react';
import { TUTORIAL, type Rect, type TutorialStep, type TutorialTab } from '../content';
import { MEDIA, SCENE_BG, type MediaKey } from '../media.gen';
import { useInView } from '../lib/hooks';
import { Reveal, SectionHead, zoomTransform, type Focus } from './ui';

/**
 * Tutorial: Pulse'ning haqiqiy ekranlari qadamma-qadam.
 *
 * Har qadam — yoki yangi kadr (butun ekran; `scroll` — sahifa pastga aylangandek kiradi),
 * yoki shu kadr ustida ochiladigan bo'lak: menyu/hover o'z joyida "ochiladi" (bo'lak asosiy
 * ekrandan kesilgan, joyi `npm run images` da avtomatik topilgan), modal esa fon qorayib
 * markazda. Keyin "kamera" o'sha joyga yaqinlashadi. Bosilgan joyda qisqa belgi chiqadi.
 *
 * Avtomatik o'ynaydi: faqat ekranda ko'rinib turganda, sichqoncha ustida bo'lsa pauza;
 * `prefers-reduced-motion` da o'zi boshlanmaydi. Bo'lim tugasa — keyingi bo'limga o'tadi.
 */
const ASPECT = 16 / 9;
const STEP_MS = 6500;
const MAX_ZOOM = 2.1;

export function Tutorial() {
  const [tabIdx, setTabIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(() => !prefersReducedMotion());
  const [hovered, setHovered] = useState(false);
  const [rootRef, inView] = useInView<HTMLDivElement>(0.25);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tab = TUTORIAL[tabIdx];
  const totalSteps = TUTORIAL.reduce((n, t) => n + t.steps.length, 0);

  // Joriy bo'limning rasmlarini oldindan yuklash, biroz keyin — keyingi bo'limnikini ham
  useEffect(() => {
    preload(TUTORIAL[tabIdx]);
    const t = window.setTimeout(() => preload(TUTORIAL[(tabIdx + 1) % TUTORIAL.length]), 2500);
    return () => window.clearTimeout(t);
  }, [tabIdx]);

  const selectTab = (i: number) => {
    setTabIdx(i);
    setStepIdx(0);
  };
  const next = () => {
    if (stepIdx < tab.steps.length - 1) setStepIdx(stepIdx + 1);
    else selectTab((tabIdx + 1) % TUTORIAL.length);
  };

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (tabIdx + (e.key === 'ArrowRight' ? 1 : -1) + TUTORIAL.length) % TUTORIAL.length;
    selectTab(n);
    tabRefs.current[n]?.focus();
  };

  const running = playing && inView && !hovered;

  return (
    <section id="screens" className="border-t border-line py-24 sm:py-32">
      <div className="page">
        <SectionHead
          className="max-w-3xl"
          eyebrow="Ichkarida"
          title={
            <>
              Pulse’ni o‘zingiz ko‘ring.
              <span className="text-fg-dim"> Besh bo‘lim, {totalSteps} qadam.</span>
            </>
          }
          text="Haqiqiy ekranlar, qadamma-qadam: bosilgan joy ochiladi, kamera o‘sha joyga yaqinlashadi."
        />

        <Reveal className="mt-12">
          <div ref={rootRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {/* Bo'limlar */}
            <div
              role="tablist"
              aria-label="Pulse bo‘limlari"
              onKeyDown={onTabKey}
              className="scrollbar-none -mx-4 flex overflow-x-auto px-4 sm:mx-0 sm:px-0"
            >
              <div className="inline-flex gap-1 rounded-xl border border-line bg-ink-850 p-1">
                {TUTORIAL.map((t, i) => {
                  const selected = i === tabIdx;
                  return (
                    <button
                      key={t.id}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      role="tab"
                      id={`tab-${t.id}`}
                      aria-selected={selected}
                      aria-controls="tutorial-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => selectTab(i)}
                      className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? 'bg-ink-900 text-fg shadow-[0_1px_2px_rgba(11,11,12,0.08),0_0_0_1px_rgba(11,11,12,0.06)]'
                          : 'text-fg-muted hover:text-fg'
                      }`}
                    >
                      {t.tab}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              role="tabpanel"
              id="tutorial-panel"
              aria-labelledby={`tab-${tab.id}`}
              className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12"
            >
              {/* Kadr — telefonda tepada va yopishqoq */}
              <div className="sticky top-16 z-10 -mx-4 bg-ink-950/90 px-4 py-2 backdrop-blur sm:mx-0 sm:px-0 lg:static lg:order-2 lg:col-span-8 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
                <div className="lg:sticky lg:top-24">
                  <Stage tab={tab} stepIdx={stepIdx} />
                </div>
              </div>

              {/* Qadamlar */}
              <div key={tab.id} className="animate-[fadeIn_.4s_ease] lg:order-1 lg:col-span-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg font-medium leading-snug tracking-tight text-fg">{tab.lead}</p>
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? 'To‘xtatish' : 'Davom ettirish'}
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-ink-900 text-fg-muted transition hover:text-fg"
                  >
                    {playing ? (
                      <Pause className="h-3.5 w-3.5" fill="currentColor" />
                    ) : (
                      <Play className="h-3.5 w-3.5 translate-x-px" fill="currentColor" />
                    )}
                  </button>
                </div>

                <ol className="mt-6 space-y-1">
                  {tab.steps.map((s, i) => {
                    const active = i === stepIdx;
                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          aria-current={active ? 'step' : undefined}
                          onClick={() => setStepIdx(i)}
                          className={`group relative w-full overflow-hidden rounded-xl border px-4 py-3 text-left transition ${
                            active
                              ? 'border-line-strong bg-ink-900 shadow-[0_1px_2px_rgba(11,11,12,0.05)]'
                              : 'border-transparent hover:bg-ink-850'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] transition ${
                                active ? 'bg-fg text-white' : i < stepIdx ? 'bg-ink-700 text-fg-muted' : 'border border-line-strong text-fg-dim'
                              }`}
                            >
                              {i + 1}
                            </span>
                            <span className={`text-[15px] font-medium ${active ? 'text-fg' : 'text-fg-muted group-hover:text-fg'}`}>
                              {s.title}
                            </span>
                          </span>
                          {active && (
                            <span className="mt-1.5 block animate-[fadeIn_.3s_ease] pl-8 text-sm leading-relaxed text-fg-muted">
                              {s.text}
                            </span>
                          )}
                          {active && playing && (
                            <span
                              key={`${tab.id}-${stepIdx}`}
                              aria-hidden="true"
                              className="progress-fill absolute bottom-0 left-0 h-0.5 bg-accent"
                              style={{
                                animation: `progress ${STEP_MS}ms linear forwards`,
                                animationPlayState: running ? 'running' : 'paused',
                              }}
                              onAnimationEnd={next}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────────────────────── Kadr ───────────────────────────── */

function Stage({ tab, stepIdx }: { tab: TutorialTab; stepIdx: number }) {
  const step = tab.steps[stepIdx];
  const sceneStep = lastSceneIndex(tab.steps, stepIdx);
  const sceneKey = tab.steps[sceneStep].scene!;
  const scene = MEDIA[sceneKey];
  const sw = scene.w;
  const sh = sw / ASPECT; // kadr balandligi — sahna pikselida

  // Kadr pikselidagi to'rtburchak → kadrga nisbatan ulush
  const frac = (r: Rect): Focus => ({ x: r.x / sw, y: r.y / sh, w: r.w / sw, h: r.h / sh });
  const pct = (r: Rect): CSSProperties => ({
    left: `${(r.x / sw) * 100}%`,
    top: `${(r.y / sh) * 100}%`,
    width: `${(r.w / sw) * 100}%`,
  });

  const pop = step.pop ? placePop(step, MEDIA[step.pop], sw, sh) : null;
  const focusRect = step.focus ?? (pop && !step.modal ? pad(pop, 28) : undefined);

  // Sahnalar ketma-ketligi (shu bo'lim ichida)
  const scenes = tab.steps.flatMap((s, i) => (s.scene ? [{ key: s.scene, i, enter: s.enter ?? 'fade' }] : []));
  const current = scenes.findIndex((s) => s.i === sceneStep);

  return (
    <figure className="shot relative" style={{ aspectRatio: `${ASPECT}`, background: SCENE_BG }}>
      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform"
        style={zoomTransform(focusRect && frac(focusRect), MAX_ZOOM)}
      >
        {scenes.map((s, k) => {
          const m = MEDIA[s.key];
          const shown = k === current;
          // Kirish/chiqish: "scroll" kadri pastdan chiqadi, eskisi yuqoriga ketadi
          const incoming = k > current ? s.enter : scenes[current].enter;
          const transform = shown
            ? 'none'
            : incoming === 'scroll'
              ? `translateY(${k < current ? -6 : 6}%)`
              : `scale(${k < current ? 0.995 : 1.015})`;
          return (
            <img
              key={s.key}
              src={m.src}
              width={m.w}
              height={m.h}
              alt={shown ? `Pulse — ${tab.tab}: ${step.title}` : ''}
              aria-hidden={!shown || undefined}
              decoding="async"
              draggable={false}
              className="absolute left-0 top-0 block w-full select-none transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ opacity: shown ? 1 : 0, transform }}
            />
          );
        })}

        {/* Modal foni */}
        {step.pop && step.modal && (
          <div key={`bd-${stepIdx}`} className="absolute inset-0 animate-[dimIn_.45s_ease_.15s_both] bg-[#0F172A]/40" />
        )}

        {/* Ochiladigan bo'lak */}
        {step.pop && pop && (
          <img
            key={`pop-${tab.id}-${stepIdx}`}
            src={MEDIA[step.pop].src}
            alt=""
            draggable={false}
            className={`absolute block select-none ${
              step.modal
                ? 'animate-[modalIn_.55s_cubic-bezier(0.22,1,0.36,1)_.25s_both] rounded-[1.1%] shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)]'
                : 'animate-[popIn_.5s_cubic-bezier(0.22,1,0.36,1)_.3s_both]'
            } ${'cut' in MEDIA[step.pop] && !step.modal ? 'shadow-[0_18px_50px_-16px_rgba(15,23,42,0.35)]' : ''}`}
            style={{ ...pct(pop), transformOrigin: originFor(step, pop) }}
          />
        )}

        {/* Bosish belgisi */}
        {step.click && (
          <span
            key={`click-${tab.id}-${stepIdx}`}
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{ left: `${(step.click.x / sw) * 100}%`, top: `${(step.click.y / sh) * 100}%` }}
          >
            <span className="absolute -left-4 -top-4 h-8 w-8 animate-[clickRing_.9s_ease-out_both] rounded-full border-2 border-accent" />
            <MousePointer2
              className="absolute left-0 top-0 h-5 w-5 animate-[cursorIn_1.6s_ease_both] fill-fg text-white drop-shadow"
              strokeWidth={1.5}
            />
          </span>
        )}
      </div>
    </figure>
  );
}

/** Bo'lakning kadrdagi joyi (sahna pikselida). */
function placePop(step: TutorialStep, m: (typeof MEDIA)[MediaKey], sw: number, sh: number): Rect | null {
  const ratio = m.h / m.w;
  if (step.popAt) return { x: step.popAt.x, y: step.popAt.y, w: step.popAt.w, h: step.popAt.w * ratio };
  if ('at' in m && m.at && !step.modal) return { x: m.at.x, y: m.at.y, w: m.w, h: m.h };
  // Modal: markazda, kadrga sig'adigan qilib
  let w = Math.min(m.w, sw * 0.9);
  let h = w * ratio;
  if (h > sh * 0.88) {
    h = sh * 0.88;
    w = h / ratio;
  }
  return { x: (sw - w) / 2, y: (sh - h) / 2, w, h };
}

function pad(r: Rect, p: number): Rect {
  return { x: r.x - p, y: r.y - p, w: r.w + p * 2, h: r.h + p * 2 };
}

/** Bo'lak bosilgan nuqtadan "o'sib" chiqadi. */
function originFor(step: TutorialStep, r: Rect): string {
  if (step.modal || !step.click) return '50% 0%';
  const x = Math.min(100, Math.max(0, ((step.click.x - r.x) / r.w) * 100));
  const y = Math.min(100, Math.max(0, ((step.click.y - r.y) / r.h) * 100));
  return `${x.toFixed(1)}% ${y.toFixed(1)}%`;
}

function lastSceneIndex(steps: TutorialStep[], i: number): number {
  for (let k = i; k >= 0; k--) if (steps[k].scene) return k;
  return 0;
}

function preload(tab: TutorialTab) {
  for (const s of tab.steps) {
    for (const key of [s.scene, s.pop]) if (key) new Image().src = MEDIA[key].src;
  }
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}
