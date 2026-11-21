/**
 * Landing sozlamalari. Hammasi build paytida `.env` dan olinadi.
 * `VITE_API_BASE` production build'da majburiy (vite.config.ts tekshiradi).
 */
const env = import.meta.env;

export const config = {
  /** Pulse backend (masalan Railway). O'rnatish oqimi shu yerda boshlanadi. */
  apiBase: ((env.VITE_API_BASE as string | undefined) ?? '').replace(/\/+$/, ''),
  /** UYSOT CRM ichidagi Pulse sahifasi. */
  iframeUrl: (env.VITE_UYSOT_IFRAME_URL as string | undefined) || 'https://app.uysot.uz/boss/iframe/82',
  /** UYSOT qo'llab-quvvatlash Telegram'i — yordam va "UYSOT hisobim yo'q" oynasi. */
  supportTelegram: (env.VITE_SUPPORT_TELEGRAM as string | undefined) || 'https://t.me/Uysot_Support',
  /** UYSOT rasmiy sayti — hisobi yo'q mijoz uchun (UYSOT'da ochiq ro'yxatdan o'tish YO'Q). */
  uysotSite: (env.VITE_UYSOT_SITE as string | undefined) || 'https://uysot.uz',
};

/**
 * O'rnatish oqimining boshlanish manzili.
 *
 * `returnTo` — o'rnatish tugagach backend foydalanuvchini qaytaradigan manzil
 * (landing'ning o'zi, `?installed=1` bilan). Backend uni faqat
 * `OAUTH_RETURN_TO_ORIGINS` ro'yxatidagi domen bo'lsa qabul qiladi.
 */
export function installUrl(returnTo: string): string {
  return `${config.apiBase}/api/oauth/install?returnTo=${encodeURIComponent(returnTo)}`;
}
