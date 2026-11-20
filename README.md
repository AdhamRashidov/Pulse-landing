# ⚡ Pulse — UYSOT CRM uchun Rasmiy Landing Sahifasi

Ushbu papka — **Pulse** analitika tizimi uchun mutlaqo mustaqil, alohida Git repozitoriy va alohida serverda (Vercel, Cloudflare, Railway yoki Nginx) ishga tushirish uchun tayyorlangan **Landing Page** loyihasidir.

SOLID va DRY tamoyillari asosida modulli, toza arxitekturada qurilgan.

---

## 🎯 Maqsadi va Asosiy Vazifasi

1. **Mijozlarni jalb qilish:** Google qidiruv, Telegram, reklama kanallari yoki savdo bo'limi orqali kelgan barcha mijozlarga Pulse imkoniyatlarini ko'rgazmali va ta'sirchan tarzda taqdim etish.
2. **1-bosqichli OAuth O'rnatish:** Mijoz *"UYSOT'ga o'rnatish"* tugmasini bosganda, tizim uni UYSOT'ning rasmiy xavfsiz OAuth sahifasiga yo'naltiradi. Mijoz ruxsat berishi bilan, backend tokenlarni ulab, mijozni to'g'ridan-to'g'ri `https://app.uysot.uz/boss/iframe/82` (UYSOT ichidagi Pulse analitikasi) ga olib boradi.
3. **Mavjud mijozlar uchun qulaylik:** Allaqachon o'rnatilgan mijozlar *"CRM'da ochish"* tugmasi orqali to'g'ridan-to'g'ri o'z kabinetlariga o'tadilar.
4. **Ro'yxatdan o'tmaganlar:** Agar foydalanuvchida hali UYSOT hisobi bo'lmasa, UYSOT OAuth avtomatik ravishda login/register oynasiga o'tkazadi va kiritgandan so'ng yana Pulse ruxsatiga qaytaradi.

---

## 🛠️ Texnologiyalar va Arxitektura

* **React 18 + Vite 5** (chaqmoqdek tez yuklanish, HMR)
* **Tailwind CSS 3.4** (brend ranglar, chiroyli gradientlar, adaptiv dizayn)
* **Lucide React** (zamonaviy SVG ikonlar)
* **TypeScript** (to'liq qat'iy tipizatsiya, 0 xatolik)
* **SOLID & DRY Modulli Komponentlar:**
  - `Navbar.tsx` — responsiv navigatsiya va menyu
  - `Hero.tsx` — asosiy chaqiriq, ishonch belgilari va tugmalar
  - `DashboardPreview.tsx` — 5 ta bo'limli interaktiv tahlil oynasi va skrinshotlar
  - `Features.tsx` — 6 ta asosiy tahliliy imkoniyatlar kartalari
  - `RoiCalculator.tsx` — Yo'qotilgan lidlar va tushum kalkulyatori
  - `WhyPulse.tsx` — 15-30ms tezlik, iframe va bank darajasidagi xavfsizlik
  - `HowItWorks.tsx` — 3 bosqichli vizual ulanish qo'llanmasi
  - `Faq.tsx` — savol-javoblar akordeoni va support bloki
  - `CtaBanner.tsx` — yuqori konversiyali yakuniy harakat bloki
  - `Footer.tsx` — barcha havolalar va mualliflik huquqi

---

## 🖼️ Skrinshotlar Papkasi (`public/images/`)

Interfeys skrinshotlarini `public/images/` papkasiga quyidagi nomlar bilan yuklashingiz mumkin:

| Fayl nomi | Joylashuvi va Tavsifi |
| :--- | :--- |
| `hero-dashboard.png` | Asosiy Dashboard skrinshoti |
| `tab-speed.png` | Speed-to-Lead (Birinchi aloqa tezligi & 🔥 Issiq lidlar) oynasi |
| `tab-plan.png` | Plan / Fakt va maqsadlar monitoringi oynasi |
| `tab-calls.png` | Qo'ng'iroqlar xaritasi (Heatmap) oynasi |
| `tab-marketing.png` | Marketing kanallari & ROI hisoboti |
| `tab-leads.png` | Lidlar & Konversiya hisoboti oynasi |
| `og-preview.png` | Telegram / WhatsApp'da havola yuborilganda chiquvchi rasm (1200x630) |

> 💡 **Avtomatik Fallback:** Agar rasmlar hali yuklanmagan bo'lsa ham, sayt buzilmaydi — u avtomatik ravishda juda chiroyli va real ma'lumotlarga ega interaktiv qorong'i rejimdagi (Dark UI) vizual maketlarni ko'rsatib turadi!

---

## ⚙️ Sozlamalar (`.env`)

Loyihada `.env` fayli orqali asosiy manzillar boshqariladi:

```env
# Pulse backend API manzili (OAuth o'rnatish oqimi uchun)
VITE_API_BASE=https://pulse-api.up.railway.app

# UYSOT CRM kabinetidagi Pulse iframe manzili
VITE_UYSOT_IFRAME_URL=https://app.uysot.uz/boss/iframe/82

# Telegram qo'llab-quvvatlash manzili
VITE_SUPPORT_TELEGRAM=https://t.me/uysot_pulse_support
```

---

## 🚀 Mahalliy Ishga Tushirish (Development)

```bash
# 1. Landing papkasiga o'tish
cd landing

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Dev serverni ishga tushirish
npm run dev
```

Brauzerda `http://localhost:3000` manzilida ochiladi.

---

## 📦 Production Build

```bash
npm run build
```

Natija `dist/` papkasiga yig'iladi va 100% toza static HTML/CSS/JS hosil bo'ladi.

---

## 📤 Alohida Git Repozitoriyga Chiqarish va GitHub'ga Yuklash

Ushbu papkani alohida Git repozitoriyga aylantirish va shaxsiy/korporativ GitHub'ga yuklash:

```bash
cd landing

# 1. Yangi git repo boshlash
git init
git add .
git commit -m "feat: initial commit for Pulse standalone landing page"

# 2. GitHub repongiz manzilini ulash
git remote add origin https://github.com/<YOUR_USERNAME>/pulse-landing.git
git branch -M main
git push -u origin main
```

---

## 🌐 Vercel'ga Deploy Qilish

1. [vercel.com](https://vercel.com) ga kiring.
2. **"Add New Project"** tugmasini bosing va GitHub'dagi `pulse-landing` repongizni tanlang.
3. Sozlamalar avtomatik aniqlanadi:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Environment Variables** bo'limida quyidagilarni kiriting:
   - `VITE_API_BASE`: `https://pulse-api.up.railway.app`
   - `VITE_UYSOT_IFRAME_URL`: `https://app.uysot.uz/boss/iframe/82`
   - `VITE_SUPPORT_TELEGRAM`: `https://t.me/uysot_pulse_support`
5. **"Deploy"** tugmasini bosing — 30 soniyada domen tayyor bo'ladi!
