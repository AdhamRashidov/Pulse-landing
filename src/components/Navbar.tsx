import { useState } from 'react';
import { Zap, Menu, X, ExternalLink } from 'lucide-react';
import { NAV_ITEMS } from '../constants/landingData';
import { InstallButton, OpenInCrmButton } from './InstallButton';
import { config } from '../config';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3.5">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-brand-400 text-slate-950 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">Pulse</span>
            <span className="rounded-md border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 text-[11px] font-semibold text-cyan-300">
              for UYSOT
            </span>
          </div>
        </a>

        {/* Minimal Nav */}
        <nav className="hidden items-center gap-7 text-xs sm:text-sm font-medium text-slate-400 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <OpenInCrmButton className="border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white text-xs px-3.5 py-2" />
          <InstallButton size="md" className="text-xs px-4 py-2" />
        </div>

        {/* Mobile Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <InstallButton size="md" className="text-xs px-3 py-1.5" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white focus:outline-none"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden space-y-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-900 flex flex-col gap-2">
            <a
              href={config.iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-xs font-semibold text-slate-300"
            >
              <span>UYSOT Kabinetida ochish</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
