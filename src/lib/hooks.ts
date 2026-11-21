import { useEffect, useRef, useState } from 'react';
import { INSTALLED_EVENT, readInstalled, writeInstalled } from './install-state';

/** O'rnatish belgisi — shu tabdagi barcha tugmalar va boshqa tablar bilan sinxron. */
export function useInstalled(): [boolean, (v: boolean) => void] {
  const [installed, setInstalled] = useState(readInstalled);

  useEffect(() => {
    const sync = () => setInstalled(readInstalled());
    window.addEventListener('storage', sync);
    window.addEventListener(INSTALLED_EVENT, sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(INSTALLED_EVENT, sync);
    };
  }, []);

  return [installed, writeInstalled];
}

/**
 * Element ekranga kirganda `data-visible="true"` qo'yadi (CSS animatsiya uchun).
 * Bir marta ishlaydi. `prefers-reduced-motion` CSS'da hisobga olinadi.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true';
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.visible = 'true';
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}

/** Element hozir ekranda ko'rinyaptimi (doimiy kuzatuv — avtomatik o'ynatishni to'xtatish uchun). */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}
