/**
 * Rasmlarni tayyorlash: `npm run images`
 *
 * Manba — `images-src/tutorial/` (Pulse'dan olingan asl PNG skrinshotlar, saytga chiqmaydi).
 * Natija:
 *   public/images/t/<tab>/<nom>.webp  — pastdagi tutorial kadrlari
 *   public/images/up/<nom>.webp       — tepadagi yoy-karusel bannerlari (1200×640)
 *   public/images/og.jpg              — havola rasmi (1200×630)
 *   src/media.gen.ts                  — o'lchamlar va bo'laklarning asosiy ekrandagi joyi
 *
 * "Bo'lak" (ochilgan menyu, hover) asosiy ekrandan kesib olingan — uning joyi asosiy
 * ekranda avtomatik topiladi (shablon bo'yicha qidiruv), shunda tutorial'da u aynan
 * o'z joyida "ochiladi". Modal skrinshotlaridagi qoraygan fon kesib tashlanadi (`trim`).
 */
import sharp from 'sharp';
import { mkdirSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'images-src', 'tutorial');
const OUT = join(ROOT, 'public', 'images');
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

/**
 * Tutorial kadrlari. `match` — bo'lak qaysi kadr ichidan kesilgan (joyi shu yerda qidiriladi).
 * `trim` — modal: qoraygan fonni kesib, kartaning o'zini qoldirish (avtomatik).
 * `card` — skrinshotdan faqat shu to'rtburchakni (px) kesib olish: menyu/karta atrofidagi sahifa bo'lagisiz.
 */
const TUTORIAL = [
  // Bosh sahifa
  ['bosh/base', 'boshSahifa/boshSahifa.png'],
  ['bosh/kalendar', 'boshSahifa/kalendarBuHammaTablarUcunUmumiyVaHammaTablardaBor.png', { match: 'bosh/base' }],
  ['bosh/voronka-tanlash', 'boshSahifa/voronkalarnitanlash.png', { at: { x: 1083, y: 76 } }],
  ['bosh/lidlar-filtr', 'boshSahifa/umumiyLidlarFlteri.png', { match: 'bosh/base' }],
  ['bosh/manbalar', 'boshSahifa/hoverOrqaliManbaalarni Korish.png', { match: 'bosh/base' }],
  ['bosh/manbalar-turlar', 'boshSahifa/manbaalarDropDowni.png', { match: 'bosh/base' }],
  ['bosh/dinamika-hover', 'boshSahifa/hoverqilinganHolati.png', { match: 'bosh/base' }],
  ['bosh/voronka-ochiq', 'boshSahifa/umumiyVoronkalar_drpdownOchilganHolati.png', { at: { x: 826, y: 349 } }],
  // Plan / Fakt
  ['plan/base', 'planFact/planFact.png'],
  ['plan/monitoring', 'planFact/rejaVaFactMonitoringi.png'],
  ['plan/dinamika', 'planFact/sotuvDinamikasi.png'],
  ['plan/haftalik', 'planFact/haftaliktaqqoslash.png', { card: { left: 10, top: 8, width: 1557, height: 178 } }],
  ['plan/xodimlar', "planFact/sotuvBo'limi.png"],
  // Samaradorlik
  ['sam/base', 'samaradorlik/samaradorlik.png'],
  ['sam/xodim-filtr', 'samaradorlik/xodimlarFilteri.png', { at: { x: 895, y: 33 } }],
  ['sam/heatmap', 'samaradorlik/callsHeatmap.png'],
  ['sam/heatmap-kun', 'samaradorlik/heatmapModal.png', { trim: true }],
  ['sam/speed', 'samaradorlik/speedToLead.png'],
  ['sam/radar', 'samaradorlik/oxirgi24SoattaKelib tushganArizalar.png', { trim: true }],
  ['sam/etibordan', 'samaradorlik/etibordanChettaQolgan.png', { trim: true }],
  ['sam/operatorlar', 'samaradorlik/operatorlarSamaradorligi.png'],
  ['sam/ustun-sozlash', "samaradorlik/ayniQaysiColumndaNimaBoyichahisoblashqo'ldaTanlanadi.png", { trim: true }],
  ['sam/menejerlar', 'samaradorlik/sotuvManagerlariStatistikasi.png'],
  ['sam/vazifalar', 'samaradorlik/vazifalarBoyichaeffectivelik.png'],
  // Lidlar
  ['lid/base', 'lidlar/jamiLidlar.png'],
  ['lid/boglanilgan', "lidlar/bog'lanilgan.png"],
  ['lid/boglanilmagan', 'lidlar/lidlarUmumiy.png'],
  [
    'lid/masullar',
    'lidlar/lidlarnechtasiqaysidirXodimgaBiriktirilganYokiBiriktirilmaganlifgiDynamic_ScoreCardlardagiRaqamlarniBosgandaKorinadi.png',
    { trim: true },
  ],
  ['lid/filtr-voronka', 'lidlar/filter_voronkalarBoyicha.png', { card: { left: 18, top: 25, width: 575, height: 530 } }],
  ['lid/filtr-xodim', 'lidlar/filter_XodimBoyicha.png', { card: { left: 10, top: 10, width: 577, height: 493 } }],
  ['lid/lid-oynasi', 'lidlar/lidRowigaBosgandauysotdagiModaliniOchibBeradi.png'],
  // Marketing
  ['mkt/base', 'marketing/BirinchiManbaa.png'],
  ['mkt/voronka-filtr', 'marketing/voronkalarFilteri.png', { match: 'mkt/base' }],
  ['mkt/ustun-sozlash', "marketing/columnlardagiDatalarNimaBo'yicaHisoblanishniQO'ldaSzlash.png", { trim: true }],
  ['mkt/voronkalar', 'marketing/voronkalarBoyichahisoblanganTableFIlterdanTanlanganVoronkalarniYokiHammasini Korsatadi.png'],
];

/**
 * Yoy-karusel bannerlari: manba kadr + undan kesiladigan qism (px; yo'q — butun kadr).
 * Kadr nomi TUTORIAL'dagi kalit (trim qilinganlar — kesilgan holida).
 */
const BANNERS = [
  ['speed', 'sam/speed', { left: 30, top: 4, width: 1180, height: 590 }],
  ['radar', 'sam/radar', { left: 0, top: 0, width: 1100, height: 550 }],
  ['plan-oy', 'plan/base', { left: 30, top: 156, width: 1140, height: 472 }],
  ['heatmap', 'sam/heatmap', { left: 22, top: 8, width: 1100, height: 550 }],
  ['manbalar', 'bosh/manbalar'],
  ['marketing', 'mkt/base', { left: 30, top: 150, width: 1180, height: 590 }],
  ['ustun-sozlash', 'mkt/ustun-sozlash'],
  ['sotuv-voronkasi', 'plan/dinamika', { left: 946, top: 18, width: 644, height: 510 }],
  ['masullar', 'lid/masullar'],
  ['operatorlar', 'sam/operatorlar', { left: 26, top: 12, width: 1120, height: 560 }],
  ['voronka', 'bosh/voronka-ochiq'],
];

// ---------------------------------------------------------------------------

const media = {};
const prepared = {}; // kalit → { buf (PNG, kesilgan), w, h }

rmSync(join(OUT, 't'), { recursive: true, force: true });
rmSync(join(OUT, 'up'), { recursive: true, force: true });

let srcBytes = 0;
let outBytes = 0;

for (const [key, file, opts = {}] of TUTORIAL) {
  const path = join(SRC, file);
  const input = sharp(path);
  const meta = await input.metadata();
  srcBytes += statSync(path).size;
  let img = sharp(path).removeAlpha();
  let w = meta.width;
  let h = meta.height;

  if (opts.trim || opts.card) {
    const box = opts.card ?? (await findCard(path));
    img = img.extract(box);
    w = box.width;
    h = box.height;
  }
  let buf = await img.png().toBuffer();
  if (opts.trim || opts.card) buf = await roundCorners(buf, w, h, opts.trim ? 18 : 14);
  prepared[key] = { buf, w, h };

  const out = join(OUT, 't', `${key}.webp`);
  mkdirSync(dirname(out), { recursive: true });
  const info = await sharp(buf).webp(WEBP).toFile(out);
  outBytes += info.size;

  const entry = { src: `/images/t/${key}.webp`, w, h };
  if (opts.match) {
    const at = await locate(join(SRC, TUTORIAL.find(([k]) => k === opts.match)[1]), path);
    if (at.score >= 0.35) entry.at = { x: at.x, y: at.y };
    console.log(`${key.padEnd(22)} → ${opts.match} (${at.x}, ${at.y})  mos: ${(at.score * 100).toFixed(0)}%`);
  }
  // Avtomatik topib bo'lmaganlar (menyu bo'lakning deyarli hammasini egallaydi) — skrinshotdan qo'lda o'lchangan
  if (opts.at) entry.at = opts.at;
  if (opts.trim || opts.card) entry.cut = true;
  media[key] = entry;
}

// Tutorial kadri foni — asosiy ekranning pastki burchagi (ilova foni)
const sceneBg = await pixelHex(join(SRC, 'boshSahifa/boshSahifa.png'), 4, 860);

// Bannerlar
mkdirSync(join(OUT, 'up'), { recursive: true });
for (const [name, key, crop] of BANNERS) {
  const { buf, w, h } = prepared[key];
  const part = crop ? await sharp(buf).extract(crop).png().toBuffer() : buf;
  // Kesilgan bo'lak — burchaklari qayta yumaloqlanadi; butun modal o'zi yumaloq
  const banner = await makeBanner(part, crop?.width ?? w, crop?.height ?? h, 1200, 640, Boolean(crop) || !media[key].cut, 36);
  const info = await sharp(banner).webp(WEBP).toFile(join(OUT, 'up', `${name}.webp`));
  outBytes += info.size;
  media[`up/${name}`] = { src: `/images/up/${name}.webp`, w: 1200, h: 640 };
}

// Havola rasmi (Telegram/ijtimoiy tarmoq) — 1200×630, JPEG (hamma joyda ochiladi)
{
  const { buf } = prepared['plan/base'];
  const part = await sharp(buf).extract({ left: 30, top: 156, width: 1560, height: 472 }).png().toBuffer();
  const og = await makeBanner(part, 1560, 472, 1200, 630, true, 60);
  await sharp(og).flatten({ background: '#ffffff' }).jpeg({ quality: 86, mozjpeg: true }).toFile(join(OUT, 'og.jpg'));
}

const lines = Object.entries(media)
  .map(([k, v]) => `  '${k}': ${JSON.stringify(v).replace(/"(\w+)":/g, '$1: ')},`)
  .join('\n');
writeFileSync(
  join(ROOT, 'src', 'media.gen.ts'),
  `// AVTOMATIK yaratilgan — scripts/build-images.mjs (npm run images). Qo'lda tahrirlamang.
export interface MediaInfo {
  src: string;
  /** Rasm o'lchami (px) */
  w: number;
  h: number;
  /** Bo'lak: asosiy kadrdagi chap-yuqori burchagi (px) */
  at?: { x: number; y: number };
  /** Modal/karta: fonsiz kesilgan, burchaklari yumaloq */
  cut?: boolean;
}

export const MEDIA = {
${lines}
} satisfies Record<string, MediaInfo>;

export type MediaKey = keyof typeof MEDIA;

/** Ilova foni — tutorial kadrida rasm qisqa bo'lsa bo'sh joy shu rangda */
export const SCENE_BG = '${sceneBg}';
`,
);

console.log(`\nManba: ${(srcBytes / 1024 / 1024).toFixed(2)} MB  →  natija: ${(outBytes / 1024 / 1024).toFixed(2)} MB`);

// ---------------------------------------------------------------------------

/** Kulrang, kichraytirilgan piksel massivi. */
async function gray(path, scale) {
  const m = await sharp(path).metadata();
  const width = Math.max(1, Math.round(m.width / scale));
  const { data, info } = await sharp(path).removeAlpha().greyscale().resize({ width, kernel: 'linear' }).raw().toBuffer({ resolveWithObject: true });
  return { d: data, w: info.width, h: info.height };
}

/**
 * Bo'lakning (crop) asosiy kadrdagi joyi. Faqat KONTUR piksellari (matn, chegara) solishtiriladi —
 * oq maydonlar hamma joyda bir xil bo'lgani uchun qidiruvni chalg'itadi. Bo'lak kadrdan chiqib
 * turishi mumkin (ochilgan karta pastga cho'ziladi) — tashqaridagi piksellar hisobga olinmaydi.
 * Avval 4x kichik o'lchamda, keyin to'liq o'lchamda aniqlashtiriladi.
 */
async function locate(basePath, cropPath) {
  const edges = (G, thr, step) => {
    const pts = [];
    for (let y = 0; y < G.h - 1; y += step)
      for (let x = 0; x < G.w - 1; x += step) {
        const p = G.d[y * G.w + x];
        if (Math.max(Math.abs(p - G.d[y * G.w + x + 1]), Math.abs(p - G.d[(y + 1) * G.w + x])) > thr) pts.push(x, y, p);
      }
    return pts;
  };
  const count = (B, pts, x, y) => {
    let ok = 0;
    let inside = 0;
    for (let k = 0; k < pts.length; k += 3) {
      const bx = x + pts[k];
      const by = y + pts[k + 1];
      if (bx < 0 || by < 0 || bx >= B.w || by >= B.h) continue;
      inside++;
      if (Math.abs(B.d[by * B.w + bx] - pts[k + 2]) <= 14) ok++;
    }
    return { ok, inside };
  };
  const S = 4;
  const b4 = await gray(basePath, S);
  const c4 = await gray(cropPath, S);
  const p4 = edges(c4, 28, 1);
  let best = { x: 0, y: 0, ok: -1 };
  for (let y = -Math.floor(c4.h / 2); y <= b4.h - Math.ceil(c4.h / 2); y++)
    for (let x = -Math.floor(c4.w / 2); x <= b4.w - Math.ceil(c4.w / 2); x++) {
      const { ok } = count(b4, p4, x, y);
      if (ok > best.ok) best = { x, y, ok };
    }
  const b1 = await gray(basePath, 1);
  const c1 = await gray(cropPath, 1);
  const p1 = edges(c1, 40, 1);
  let fine = { x: 0, y: 0, ok: -1, inside: 1 };
  for (let dy = -8; dy <= 8; dy++)
    for (let dx = -8; dx <= 8; dx++) {
      const x = best.x * S + dx;
      const y = best.y * S + dy;
      const r = count(b1, p1, x, y);
      if (r.ok > fine.ok) fine = { x, y, ...r };
    }
  return { x: fine.x, y: fine.y, score: fine.ok / Math.max(1, fine.inside) };
}

/** Modal skrinshotida yorug' kartaning chegarasi (qoraygan fon — tashqarida). */
async function findCard(path) {
  const { d, w, h } = await gray(path, 1);
  const bright = (v) => v >= 240;
  const rowOk = (y) => {
    let c = 0;
    for (let x = 0; x < w; x++) if (bright(d[y * w + x])) c++;
    return c / w > 0.45;
  };
  let top = 0;
  while (top < h && !rowOk(top)) top++;
  let bottom = h - 1;
  while (bottom > top && !rowOk(bottom)) bottom--;
  const colOk = (x) => {
    let c = 0;
    for (let y = top; y <= bottom; y++) if (bright(d[y * w + x])) c++;
    return c / (bottom - top + 1) > 0.45;
  };
  let left = 0;
  while (left < w && !colOk(left)) left++;
  let right = w - 1;
  while (right > left && !colOk(right)) right--;
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

async function roundCorners(buf, w, h, r) {
  const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`);
  return sharp(buf).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
}

async function pixelHex(path, x, y) {
  const { data } = await sharp(path).removeAlpha().extract({ left: x, top: y, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  return '#' + [...data.slice(0, 3)].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Banner: yumshoq gradient fon, o'rtada — yumaloq burchakli, soyali kadr.
 * Kadr kattalashtirilmaydi (faqat kichraytiriladi) — matn xiralashmasin.
 */
async function makeBanner(part, pw, ph, W, H, frame, pad = 70) {
  const scale = Math.min((W - pad * 2) / pw, (H - pad * 2) / ph, 1);
  const cw = Math.round(pw * scale);
  const ch = Math.round(ph * scale);
  const x = Math.round((W - cw) / 2);
  const y = Math.round((H - ch) / 2);
  const r = Math.max(10, Math.round(16 * Math.min(1, scale * 1.4)));

  const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F7FAFB"/><stop offset="1" stop-color="#E6F1F4"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.5" cy="0.42" r="0.55">
        <stop offset="0" stop-color="#22D3EE" stop-opacity="0.16"/><stop offset="1" stop-color="#22D3EE" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" fill="none" stroke="#0B0B0C" stroke-opacity="0.045"/>
      </pattern>
      <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <rect width="${W}" height="${H}" fill="url(#grid)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect x="${x + 10}" y="${y + 26}" width="${cw - 20}" height="${ch - 10}" rx="${r}" fill="#0F172A" fill-opacity="0.22" filter="url(#blur)"/>
  </svg>`);

  let content = await sharp(part).resize({ width: cw, height: ch, kernel: 'lanczos3' }).png().toBuffer();
  if (frame) {
    content = await roundCorners(content, cw, ch, r);
  }
  const border = Buffer.from(
    `<svg width="${cw}" height="${ch}"><rect x="0.5" y="0.5" width="${cw - 1}" height="${ch - 1}" rx="${r}" ry="${r}" fill="none" stroke="#0B0B0C" stroke-opacity="0.09"/></svg>`,
  );
  return sharp(bg)
    .composite([
      { input: content, left: x, top: y },
      { input: border, left: x, top: y },
    ])
    .png()
    .toBuffer();
}
