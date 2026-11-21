import { config } from '../config';

/**
 * "Bitta aqlli tugma" holati.
 *
 * Landing alohida domenda — unda token ham, companyId ham yo'q, shuning uchun
 * mijoz Pulse'ni o'rnatganmi, buni serverdan bilib bo'lmaydi. Yechim: o'rnatish
 * tugagach backend foydalanuvchini `/?installed=1` ga qaytaradi, biz shu
 * brauzerda belgi qo'yamiz va darhol CRM'ga o'tkazamiz. Keyingi tashrifda
 * tugma "Pulse'ni ochish" bo'ladi.
 *
 * Belgi faqat SHU brauzerda. Boshqa qurilmada yoki tozalangan brauzerda tugma
 * yana "Ulash" — bu xavfsiz: qayta ulanish mavjud o'rnatmani yangilaydi, xolos.
 */
const KEY = 'pulse:installed';
export const INSTALLED_PARAM = 'installed';

export function readInstalled(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1';
  } catch {
    return false; // storage bloklangan (private rejim va h.k.) — "o'rnatilmagan" deb hisoblaymiz
  }
}

/** Shu tabdagi barcha tugmalarni sinxronlash uchun (`storage` hodisasi faqat BOSHQA tablarga keladi). */
export const INSTALLED_EVENT = 'pulse:installed-change';

export function writeInstalled(value: boolean): void {
  try {
    if (value) window.localStorage.setItem(KEY, '1');
    else window.localStorage.removeItem(KEY);
  } catch {
    /* storage yo'q — tugma oddiy "Ulash" bo'lib qolaveradi */
  }
  window.dispatchEvent(new Event(INSTALLED_EVENT));
}

/**
 * O'rnatishdan qaytgan foydalanuvchini ushlaydi. React render qilinishidan OLDIN
 * chaqiriladi, shunda sahifa bir lahza ham ko'rinmay, darhol CRM'ga o'tadi.
 *
 * @returns true — yo'naltirish boshlandi (render qilish shart emas)
 */
export function consumeInstallReturn(): boolean {
  const url = new URL(window.location.href);
  if (url.searchParams.get(INSTALLED_PARAM) !== '1') return false;

  // Backend xatoda ham shu manzilga qaytaradi, faqat `reason` bilan (rad etildi, token xatosi).
  const reason = url.searchParams.get('reason');

  // Orqaga bosganda yana shu yerga tushib, qayta yo'naltirilmasin.
  for (const p of [INSTALLED_PARAM, 'reason', 'companyId', 'installId']) url.searchParams.delete(p);
  window.history.replaceState(null, '', url.pathname + url.search + url.hash);

  if (reason) {
    installFailure = reason;
    return false; // sahifa ko'rsatiladi, tugma yonida xabar chiqadi
  }

  writeInstalled(true);
  window.location.replace(config.iframeUrl);
  return true;
}

/** Oxirgi o'rnatish urinishi muvaffaqiyatsiz bo'lgan bo'lsa — backend bergan sabab kodi. */
let installFailure: string | null = null;

export function readInstallFailure(): string | null {
  return installFailure;
}

/** Sabab kodi (`InstallFailureReason`, packages/shared) → foydalanuvchiga tushunarli matn. */
export function failureMessage(reason: string): string {
  switch (reason) {
    case 'PROVIDER_ERROR':
      return 'Ruxsat berilmadi. Pulse’ni ulash uchun UYSOT sahifasida ruxsatni tasdiqlang.';
    case 'STATE_EXPIRED':
      return 'Ruxsat sahifasida vaqt tugadi. Qaytadan bosing — bir daqiqa kifoya.';
    default:
      return 'UYSOT bilan ulanishda xato chiqdi. Qaytadan urinib ko‘ring.';
  }
}

/** Landing'ga qaytish manzili — backend'ga `returnTo` sifatida beriladi. */
export function returnToUrl(): string {
  return `${window.location.origin}/?${INSTALLED_PARAM}=1`;
}
