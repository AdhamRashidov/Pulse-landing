# Keyingi qadamlar (2026-11-21)

Landing'ning hozirgi holati: dizayn, yoy-karusel, tutorial va rasmlar tayyor. **Tugma prod backend
manzilini kutyapti.** Quyidagilar qolgan — tartib bo'yicha.

## 1. Tugmani prod'ga ulash (ASOSIY)

- [x] **Prod API manzili: `https://uysot-pulse-api.up.railway.app`** (tekshirildi: `/health` →
      `{"ok":true}`, `/api/oauth/install` → UYSOT authorize, prod client_id, 5 ta faqat READ scope).
      ⚠️ `uysot-pulse.up.railway.app` — bu `apps/web` FRONTEND (har yo'lga HTML qaytaradi), API EMAS.
      ⚠️ `tricycle-dial-related.ngrok-free.dev` — virtual kompyuterdagi DEV tunnel, prod EMAS.
- [x] `landing/.env` va `landing/.env.example` → `VITE_API_BASE` yozildi; 3 ta tugma ham prod'ga.
- [ ] **Vercel** → Settings → Environment Variables →
      `VITE_API_BASE=https://uysot-pulse-api.up.railway.app` → **Redeploy**
      (qiymat build paytida JS'ga yoziladi — o'zgartirilsa ham qayta deploy kerak).
- [ ] **Railway** (api) → `OAUTH_RETURN_TO_ORIGINS=https://<landing Vercel domeni>`.
      Usiz ulanish ishlaydi, lekin mijoz landing'ga qaytmaydi (tugma "Pulse'ni ochish" bo'lmaydi,
      xato xabari chiqmaydi).
- [ ] Prod'da sinash: yangi brauzerda tugma → UYSOT ruxsat → CRM ochildi → landing'ni qayta ochganda
      tugma "Pulse'ni ochish". "Rad etish" bosilganda landing'da qizil xabar chiqishi kerak.

## 2. Backend o'zgarishlari (monorepo, `adham` branch — COMMIT QILINMAGAN)

- `apps/api/src/oauth/return-to.ts` (+spec) — `returnTo` whitelist (open redirect himoyasi).
- `apps/api/src/oauth/oauth.controller.ts` (+`oauth.controller.spec.ts`) — xato bo'lsa ham mijoz
  landing'ga `reason` bilan qaytadi (ilgari `apps/web` dagi xato sahifasiga tushardi).
- `config.ts`, `.env.example` — `OAUTH_RETURN_TO_ORIGINS`; `CLAUDE.md` yangilangan.
- [ ] `main`ga merge'dan OLDIN to'liq gate (CLAUDE.md): `npm run typecheck`, `npm test`,
      `npm run lint`, `npm run build`. Hozircha faqat OAuth testlari (47/47) va api typecheck o'tgan.
- [ ] `config.ts:34` dagi eskirgan `redirect_url` izohini tuzatish.

## 3. Tekshirish kerak

- [x] **Ruxsatlar:** prod faqat 5 ta READ so'raydi — landing'dagi "Faqat o'qish" to'g'ri.
      (`SAVE`/`DELETE` faqat dev `.env` dagi URL'da edi.)
- [ ] **Sirlar:** dev `.env` (client secret, embedded secret, `TOKEN_ENCRYPTION_KEY`) suhbatda ochilgan.
      Prod'da ham AYNAN shular bo'lsa — almashtirish (encryption key'ni almashtirishdan oldin:
      bazadagi tokenlar shu kalit bilan shifrlangan).

## 4. Landing kontenti

- [ ] Plan/Fakt demo'sidagi g'alati raqamlar: "Sotuvlar" plani 4 000 000 000, sotuvlar grafigida fakt
      nolda. Demo'da planni to'g'rilab qayta suratga olish yoki rasmdagi yozuvni tahrirlash
      (foydalanuvchi ruxsat bergan — hammasi demo).
- [ ] Plan/Fakt sozlamalari tutorial'da yo'q (skrinshot olinmagan) — olinsa qadam qo'shish.
- [ ] Havola rasmi (`public/images/og.jpg`) Telegram'da to'g'ri chiqishini tekshirish.
- [ ] Yangi rasm qo'shish tartibi — `README.md` → "Rasmlar".
