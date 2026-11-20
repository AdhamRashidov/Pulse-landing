/**
 * Pulse Landing konfiguratsiyasi.
 * Barcha asosiy yo'naltirish manzillari shu yerdan boshqariladi.
 */
export const config = {
  apiBase: (import.meta.env.VITE_API_BASE as string | undefined) ?? '',
  iframeUrl: (import.meta.env.VITE_UYSOT_IFRAME_URL as string | undefined) ?? 'https://app.uysot.uz/boss/iframe/82',
  supportTelegram: (import.meta.env.VITE_SUPPORT_TELEGRAM as string | undefined) ?? 'https://t.me/uysot_pulse_support',

  /**
   * OAuth o'rnatish oqimini boshlash manzili.
   * Agar API alohida domenda bo'lsa (masalan Railway), VITE_API_BASE qo'shiladi.
   */
  getInstallUrl(returnTo?: string): string {
    const base = this.apiBase.replace(/\/+$/, '');
    const path = '/api/oauth/install';
    return returnTo
      ? `${base}${path}?returnTo=${encodeURIComponent(returnTo)}`
      : `${base}${path}`;
  },
};
