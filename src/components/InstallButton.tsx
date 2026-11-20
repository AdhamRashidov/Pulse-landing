import { config } from '../config';
import { ArrowRight, Sparkles } from 'lucide-react';

interface InstallButtonProps {
  returnTo?: string;
  className?: string;
  size?: 'md' | 'lg';
}

/**
 * UYSOT OAuth o'rnatish tugmasi.
 * Yuqori darajadagi minimal, zamonaviy cyan/neon uslubida.
 */
export function InstallButton({
  returnTo,
  className = '',
  size = 'md',
}: InstallButtonProps) {
  const href = config.getInstallUrl(returnTo);

  const sizeClasses =
    size === 'lg'
      ? 'px-7 py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-cyan-500/25'
      : 'px-4 py-2 text-xs sm:text-sm font-semibold shadow-md shadow-cyan-500/20';

  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-brand-500 text-slate-950 font-bold transition-all duration-300 hover:from-cyan-300 hover:to-brand-400 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-[0.98] ${sizeClasses} ${className}`}
    >
      <Sparkles className="h-4 w-4 shrink-0 fill-slate-950/20" />
      <span>UYSOT'ga o‘rnatish</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

/**
 * CRM kabinetida ochish tugmasi.
 */
export function OpenInCrmButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={config.iframeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-[0.98] ${className}`}
    >
      <span>CRM'da ochish</span>
      <span className="text-[10px] text-slate-500 font-mono">(iframe/82)</span>
    </a>
  );
}
