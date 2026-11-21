# Pulse — landing sahifasi

UYSOT CRM uchun Pulse analitikasining tashqi sahifasi. Ikki vazifasi bor:

1. Reklama va qidiruvdan kelgan rahbarga Pulse'ni ko'rsatish.
2. Support/sotuv jamoasi Telegramda bitta havola beradi — mijoz **bitta tugma** bilan Pulse'ni UYSOT'ga ulaydi.

Login, ro'yxatdan o'tish yoki parol YO'Q: Pulse UYSOT ichida iframe bo'lib ochiladi va foydalanuvchini UYSOT orqali taniydi.

React 18 · Vite 5 · Tailwind 3 · TypeScript. Statik sayt (Vercel).

## Ishga tushirish

```bash
cp .env.example .env
npm install
npm run dev        # http://localhost:3000
npm run build      # dist/ — VITE_API_BASE berilmasa build TO'XTAYDI (ataylab)
```

| O'zgaruvchi | Vazifasi |
|---|---|
| `VITE_API_BASE` | Pulse backend manzili. **Majburiy** (production). |
| `VITE_UYSOT_IFRAME_URL` | UYSOT ichidagi Pulse sahifasi (standart `https://app.uysot.uz/boss/iframe/82`). |
| `VITE_SUPPORT_TELEGRAM` | Qo'llab-quvvatlash havolasi. |

## Bitta "aqlli" tugma

Sahifadagi barcha harakat tugmalari bitta komponent — `SmartButton` (`src/components/ui.tsx`):

| Holat | Tugma | Qayerga |
|---|---|---|
| Pulse shu brauzerda ulanmagan | **UYSOT'ga ulash** | `{API}/api/oauth/install?returnTo={landing}/?installed=1` |
| Ulangan | **Pulse'ni ochish** | `VITE_UYSOT_IFRAME_URL` |
| UYSOT hisobi yo'q | — | UYSOT o'zi avval kirish sahifasini ochadi, keyin ruxsatga qaytaradi |
| Rad etildi / xato | **UYSOT'ga ulash** + qizil xabar | backend `/?installed=1&reason=…` ga qaytaradi — belgi QO'YILMAYDI |

Oqim: tugma → UYSOT ruxsat sahifasi → backend tokenni saqlaydi → `/?installed=1` ga qaytaradi →
landing shu brauzerda belgi qo'yadi (`localStorage: pulse:installed`) va **darhol** CRM'ga o'tkazadi
(`src/lib/install-state.ts`, render'dan oldin).

Landing alohida domenda — unda token yo'q, shuning uchun "ulanganmi" faqat shu brauzer belgisidan
bilinadi. Boshqa qurilmada tugma yana "Ulash" bo'ladi — bu xavfsiz, qayta ulanish o'rnatmani yangilaydi.

⚠️ **Backend sozlamasi (MAJBURIY):** backend `returnTo` ni faqat ruxsat etilgan domenlarga
qabul qiladi (open redirect himoyasi). Landing domenini qo'shing:

```env
# apps/api (Railway)
OAUTH_RETURN_TO_ORIGINS=https://<landing-domeni>
```

Qo'shilmasa o'rnatish baribir ishlaydi, lekin foydalanuvchi landing'ga qaytmaydi — belgi qo'yilmaydi
va tugma "Ulash" bo'lib qolaveradi.

## Matn — `src/content.ts`

Sahifadagi barcha matn shu faylda. **Qoida:** faqat Pulse'da haqiqatan bor narsa yoziladi —
o'rnatgan mijoz va'da qilingan har bir narsani ilovada topa olishi kerak. Soxta raqam, "ROI",
"tushum (so'm)" kabi da'volar yo'q (Plan/Fakt pul emas, son sanaydi).

## Dizayn

Och uslub (Attio / Relate / ClickUp naqshlari — Figma "TOP-50 WEBSITES" faylidan o'rganilgan):
Pulse skrinshotlari och, shuning uchun sahifa ham och — mahsulot sahifaga uzilishsiz qo'shiladi.
Ranglar `tailwind.config.js` da (`ink` — sirtlar, `fg` — matn, `accent` — Pulse cyan).

**Yoy-karusel** (`components/ArcShowcase.tsx`, hero ostida, Kumo uslubi): eng kuchli funksiyalar
bannerlari yoy bo'ylab, tanlangani markazda kattalashadi, tavsifi pastda; 5.5 s da almashadi.
Ma'lumot — `content.ts` → `SHOWCASE`, rasmlar — `public/images/up/`.

**Tutorial** (`components/Tutorial.tsx`, `#screens`): har bo'lim qadamma-qadam. Qadam — yangi kadr
(`scene`; `enter: 'scroll'` — sahifa pastga aylangandek) yoki shu kadr ustida ochiladigan bo'lak
(`pop`): menyu/hover o'z joyida "ochiladi", modal (`modal: true`) fon qorayib markazda. Keyin kamera
o'sha joyga yaqinlashadi (`focus`), bosilgan joyda belgi chiqadi (`click`). Avtomatik o'ynaydi
(faqat ekranda, sichqoncha ustida — pauza). Ma'lumot — `content.ts` → `TUTORIAL`; koordinatalar
skrinshot pikselida.

## Rasmlar — `images-src/` → `npm run images`

Asl skrinshotlar `images-src/tutorial/<bo'lim>/` da (PNG, Pulse'dan, demo kompaniya) — saytga
chiqmaydi. `npm run images` (`scripts/build-images.mjs`, sharp) ulardan yasaydi:

| Natija | Nima |
|---|---|
| `public/images/t/<bo'lim>/*.webp` | tutorial kadrlari (WebP; modallar fonsiz kesilgan) |
| `public/images/up/*.webp` | karusel bannerlari (1200×640) |
| `public/images/og.jpg` | Telegram/ijtimoiy tarmoq havola rasmi (1200×630) |
| `src/media.gen.ts` | o'lchamlar va bo'laklarning asosiy kadrdagi joyi |

Ochilgan menyu skrinshoti asosiy ekrandan kesilgan bo'lsa, uning joyi avtomatik topiladi
(kontur bo'yicha qidiruv, natijasi konsolda "mos: N%"). Menyu bo'lakning deyarli hammasini
egallasa, joy skriptda qo'lda beriladi (`at`). Yangi rasm qo'shish: faylni `images-src/` ga
qo'ying → skriptdagi `TUTORIAL`/`BANNERS` ro'yxatiga yozing → `npm run images` →
`content.ts` da qadam qo'shing.

Qoidalar: haqiqiy mijoz ma'lumoti ko'rinmasin, scrollbar va kursor tushmasin; bitta bo'limning
ochilgan holatlari asosiy ekran bilan bir xil masshtabda olinsin.

## Tuzilish

```
src/
  content.ts            barcha matn
  config.ts             env + installUrl()
  lib/install-state.ts  "ulangan" belgisi va /?installed=1 ni ushlash
  lib/hooks.ts          useInstalled, useReveal
  components/ui.tsx     Logo, SmartButton, zoomTransform, Reveal, SectionHead
  components/*.tsx      bo'limlar: Nav, Hero (+ArcShowcase), Questions, Tutorial, How, Trust, Calculator, Faq, FinalCta, Footer
  media.gen.ts          rasmlar ro'yxati (npm run images yasaydi)
```

`docs/refs/` — dizayn namunalari (faqat tahlil uchun, `.gitignore` da).

## Vercel

Framework: Vite · Build: `npm run build` · Output: `dist` · Environment Variables: yuqoridagi uchtasi.
