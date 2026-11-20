import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ExternalLink,
  Shield,
  Flame,
  Target,
  PhoneCall,
  BarChart3,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SHOWCASE_SLIDES, SlideItem } from '../constants/landingData';
import { config } from '../config';

const ICONS = {
  speed: Flame,
  plan: Target,
  calls: PhoneCall,
  marketing: BarChart3,
  leads: Layers,
};

export function BannerShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const [autoplay] = useState(() =>
    Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 25 },
    [autoplay]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const toggleAutoplay = () => {
    if (!autoplay) return;
    if (isPlaying) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  };

  const handleImageError = (slideId: string) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section id="showcase" className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Interaktiv Banner Showcase</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Pulse interfeysi. <span className="text-cyan-400">Har bir ekranda natija.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Slayder orqali har bir bo‘limni ko‘zdan kechiring. Ekran ustiga sichqonchani olib borib, batafsil tahlilni ko‘ring.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={isPlaying ? "Slayderni to'xtatish" : "Slayderni davom ettirish"}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title={isPlaying ? "To'xtatish" : "Davom ettirish"}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Oldingi ekran"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Keyingi ekran"
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none mb-6">
          {SHOWCASE_SLIDES.map((slide, idx) => {
            const Icon = ICONS[slide.id as keyof typeof ICONS] ?? Flame;
            const isActive = idx === selectedIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => scrollTo(idx)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-900/70 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                <span>{slide.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 shadow-2xl shadow-cyan-950/20" ref={emblaRef}>
          <div className="flex">
            {SHOWCASE_SLIDES.map((slide) => {
              const hasError = imageErrors[slide.id];
              return (
                <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                  {/* Browser Mockup Window Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/70 px-4 py-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                      <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                      <div className="ml-3 hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-mono text-slate-400 text-[11px]">
                        <Shield className="h-3 w-3 text-emerald-400" />
                        <span>app.uysot.uz/boss/iframe/82</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>15 ms tezlik</span>
                      </span>
                      <a
                        href={config.iframeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-white transition"
                      >
                        <span>UYSOT'da ochish</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  {/* Main Slide Canvas with Hover Reveal Card */}
                  <div className="relative group min-h-[420px] sm:min-h-[500px] flex items-center justify-center p-4 sm:p-6 bg-radial-gradient">
                    {/* Real Image or Fallback Mockup */}
                    {!hasError ? (
                      <img
                        src={`/images/${slide.imageFileName}`}
                        alt={slide.title}
                        onError={() => handleImageError(slide.id)}
                        className="w-full max-h-[540px] rounded-xl object-contain shadow-2xl transition duration-500 group-hover:scale-[1.01]"
                      />
                    ) : (
                      <div className="w-full">
                        <SimulatedSlideMock slide={slide} />
                      </div>
                    )}

                    {/* Sleek Floating Hover Overlay */}
                    <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 rounded-xl border border-slate-700/60 bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-xs font-semibold text-cyan-400">
                            {slide.badge}
                          </span>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            {slide.title}
                          </h4>
                        </div>
                        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xl">
                          {slide.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="border-l border-slate-800 pl-4 hidden sm:block">
                          <div className="text-[11px] text-slate-400">{slide.metricLabel}</div>
                          <div className="text-lg font-bold text-cyan-400 font-mono">{slide.metric}</div>
                        </div>
                        <a
                          href={config.iframeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition"
                        >
                          <span>Ko‘rish</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Progress indicator */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {SHOWCASE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Fallback Simulated Screen Component (renders pixel-perfect high-tech mockup if image isn't uploaded yet)
 */
function SimulatedSlideMock({ slide }: { slide: SlideItem }) {
  if (slide.id === 'speed') {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-amber-400 font-semibold flex items-center gap-1.5">
            <Flame className="h-4 w-4" /> Speed-to-Lead Tahlili
          </span>
          <span className="font-mono text-slate-400">O‘rtacha aloqa: 7.8 daqiqa</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-800/80 p-3 border border-amber-500/20">
            <div className="text-[11px] text-amber-400">🔥 Issiq (&lt;15 daq)</div>
            <div className="text-xl font-bold text-white mt-1">78.4%</div>
            <div className="h-1 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '78.4%' }} />
            </div>
          </div>
          <div className="rounded-lg bg-slate-800/80 p-3 border border-yellow-500/20">
            <div className="text-[11px] text-yellow-400">🟡 Iliq (&lt;60 daq)</div>
            <div className="text-xl font-bold text-white mt-1">16.1%</div>
            <div className="h-1 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '16.1%' }} />
            </div>
          </div>
          <div className="rounded-lg bg-slate-800/80 p-3 border border-rose-500/20">
            <div className="text-[11px] text-rose-400">🔴 Sovuq (&gt;1s)</div>
            <div className="text-xl font-bold text-white mt-1">5.5%</div>
            <div className="h-1 bg-slate-700 rounded-full mt-2">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '5.5%' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slide.id === 'plan') {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
            <Target className="h-4 w-4" /> Sotuv Bo‘limi Rejasi (500,000,000 so‘m)
          </span>
          <span className="font-mono text-emerald-400 font-bold">448,000,000 so‘m (89.6%)</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400" style={{ width: '89.6%' }} />
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-800/60 rounded-lg flex justify-between">
            <span className="text-white">Aziz Rahimov</span>
            <span className="text-emerald-400 font-bold">104% bajarildi</span>
          </div>
          <div className="p-3 bg-slate-800/60 rounded-lg flex justify-between">
            <span className="text-white">Malika Karimova</span>
            <span className="text-cyan-400 font-bold">95% (14 ta bitim)</span>
          </div>
        </div>
      </div>
    );
  }

  if (slide.id === 'calls') {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
            <PhoneCall className="h-4 w-4" /> 24/7 Qo‘ng‘iroqlar Xaritasi
          </span>
          <span className="font-mono text-slate-400">Jami: 5,240 ta qo‘ng‘iroq</span>
        </div>
        <div className="space-y-1.5 text-xs font-mono">
          {['Dush', 'Sesh', 'Chor', 'Pay', 'Jum'].map((d, i) => (
            <div key={d} className="flex items-center gap-2">
              <span className="w-8 text-[11px] text-slate-400">{d}</span>
              <div className="flex-1 grid grid-cols-8 gap-1 h-4">
                {[...Array(8)].map((_, j) => {
                  const intense = (i + j) % 3;
                  const bg = intense === 2 ? 'bg-cyan-400' : intense === 1 ? 'bg-cyan-700' : 'bg-slate-800';
                  return <div key={j} className={`rounded-xs ${bg}`} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-center space-y-3">
      <div className="text-xs text-cyan-400 font-semibold">{slide.title}</div>
      <div className="text-2xl font-bold text-white font-mono">{slide.metric}</div>
      <p className="text-xs text-slate-400 max-w-sm mx-auto">{slide.summary}</p>
    </div>
  );
}
