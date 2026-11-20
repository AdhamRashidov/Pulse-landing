import { Zap, ExternalLink } from 'lucide-react';
import { NAV_ITEMS } from '../constants/landingData';
import { config } from '../config';

export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 text-xs text-slate-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <span className="font-bold text-white text-sm">Pulse</span>
            <span className="text-slate-500 font-medium">for UYSOT CRM</span>
          </div>

          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-white transition"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={config.iframeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <span>UYSOT Kabineti (iframe/82)</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600">
          <div>© {new Date().getFullYear()} Pulse. Barcha huquqlar himoyalangan.</div>
          <div>UYSOT Marketplace Rasmiy Ilovasi</div>
        </div>
      </div>
    </footer>
  );
}
