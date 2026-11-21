import { useEffect, useState } from 'react';
import { NAV } from '../content';
import { Logo, SmartButton } from './ui';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-line bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="page flex h-16 items-center justify-between gap-6">
        <a href="#top" aria-label="Pulse — bosh sahifa">
          <Logo />
        </a>

        <nav aria-label="Bo‘limlar" className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-fg-muted transition hover:text-fg">
              {item.label}
            </a>
          ))}
        </nav>

        <SmartButton size="sm" />
      </div>
    </header>
  );
}
