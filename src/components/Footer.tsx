import { NAV } from '../content';
import { config } from '../config';
import { Logo } from './ui';

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="page flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-fg-dim">UYSOT CRM uchun sotuv analitikasi.</p>
        </div>

        <nav aria-label="Pastki menyu" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-fg-muted transition hover:text-fg">
              {item.label}
            </a>
          ))}
          <a
            href={config.supportTelegram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-muted transition hover:text-fg"
          >
            Telegram
          </a>
        </nav>
      </div>

      <div className="page mt-12 flex flex-col gap-2 border-t border-line pt-6 text-xs text-fg-dim sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Pulse</span>
        <span>UYSOT CRM bilan ishlaydi</span>
      </div>
    </footer>
  );
}
