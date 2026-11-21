/**
 * Landing'dagi BARCHA matn va ma'lumot shu yerda.
 *
 * Qoida: faqat Pulse'da HAQIQATAN bor narsani yozamiz. Reklamadan kelgan rahbar
 * o'rnatgandan keyin shu yerda va'da qilingan har bir narsani topa olishi kerak.
 * Yangi da'vo qo'shishdan oldin monorepo'dagi (`apps/web`, `apps/api`) kodga qarang.
 */

import type { MediaKey } from './media.gen';

export const NAV = [
  { label: 'Imkoniyatlar', href: '#questions' },
  { label: 'Ekranlar', href: '#screens' },
  { label: 'Ulanish', href: '#how' },
  { label: 'Savollar', href: '#faq' },
];

export const HERO = {
  eyebrow: 'UYSOT CRM uchun analitika',
  title: ['Sotuv bo‘limingizni', 'raqamlar bilan boshqaring.'],
  subtitle:
    'Pulse UYSOT ma’lumotlarini reja, qo‘ng‘iroq, lid va bitim hisobotlariga aylantiradi — to‘g‘ridan-to‘g‘ri CRM ichida.',
  notes: ['Bir tugma bilan ulanadi', 'Login va parol yo‘q', 'Faqat o‘qish ruxsati'],
};

export const FACTS = [
  { value: '5', label: 'tahlil bo‘limi' },
  { value: '1', label: 'tugma bilan ulanish' },
  { value: '0', label: 'alohida login' },
  { value: '100%', label: 'UYSOT ichida' },
];

export interface Question {
  q: string;
  a: string;
  where: string;
}

export const QUESTIONS: Question[] = [
  {
    q: 'Yangi lidga kim, necha daqiqada qo‘ng‘iroq qildi?',
    a: 'Har lid uchun birinchi aloqagacha ketgan vaqt. 15 daqiqagacha — issiq, 30 gacha — iliq, undan keyin — kech.',
    where: 'Samaradorlik',
  },
  {
    q: 'Oy rejasi bajariladimi?',
    a: 'Har xodimga oylik reja: lidlar, qo‘ng‘iroqlar, uchrashuvlar, tashriflar, sotuvlar. Bajarilish sur’ati va oy oxirigacha prognoz.',
    where: 'Plan / Fakt',
  },
  {
    q: 'Qaysi lidlarga hali umuman qo‘ng‘iroq qilinmagan?',
    a: 'Bog‘lanilmagan lidlar alohida hisoblanadi, oxirgi 24 soatda kelgan va hali kutayotgan arizalar esa jonli ro‘yxatda.',
    where: 'Lidlar · Samaradorlik',
  },
  {
    q: 'Kim qaysi kuni ishladi, kim sustlashdi?',
    a: 'Qo‘ng‘iroqlar xaritasi: har xodimning har kungi qo‘ng‘iroqlari va muloqot vaqti. Katakni bosing — o‘sha kunning hisoboti.',
    where: 'Samaradorlik',
  },
  {
    q: 'Qaysi reklama manbasi haqiqatan bitim keltiryapti?',
    a: 'Har manba bo‘yicha arizalar, maqsadli lidlar, bog‘lanilmaganlar va yutilgan bitimlar — bitta jadvalda.',
    where: 'Marketing',
  },
  {
    q: 'Kim vazifalarini o‘z vaqtida bajaryapti?',
    a: 'Xodimlar kesimida vazifalar soni va bajarilmaganlar ulushi — har biri uchun effektivlik foizi.',
    where: 'Samaradorlik',
  },
];

/** Kadrdagi to'rtburchak yoki nuqta — KADR RASMINING pikselida (`MEDIA[...]` o'lchamida). */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TutorialStep {
  title: string;
  text: string;
  /** Yangi kadr (butun ekran). `enter: 'scroll'` — sahifa pastga aylantirilgandek kiradi. */
  scene?: MediaKey;
  enter?: 'fade' | 'scroll';
  /**
   * Ustiga ochiladigan bo'lak: menyu, hover, modal.
   * Joyi: `MEDIA[pop].at` (asosiy kadrdan avtomatik topilgan) → `popAt` → `modal` (markazda).
   */
  pop?: MediaKey;
  /** Bo'lak joyi va kengligi kadr pikselida (bo'lak boshqa masshtabda olingan bo'lsa). */
  popAt?: { x: number; y: number; w: number };
  /** Modal: fon qorayadi, oyna markazda. */
  modal?: boolean;
  /** "Kamera" shu joyga yaqinlashadi. Yo'q bo'lsa — ochilgan bo'lakka, u ham yo'q bo'lsa — butun ekran. */
  focus?: Rect;
  /** Foydalanuvchi bosgan joy — qisqa "bosish" belgisi chiqadi. */
  click?: { x: number; y: number };
}

export interface TutorialTab {
  id: string;
  tab: string;
  /** Bitta qisqa jumla — bo'lim nima uchun. */
  lead: string;
  steps: TutorialStep[];
}

/**
 * Pastdagi tutorial. Har qadam — Pulse'ning haqiqiy skrinshoti (`images-src/tutorial/`,
 * `npm run images` bilan tayyorlanadi). Koordinatalar shu skrinshotlarning pikselida —
 * rasm almashsa, `focus`/`click`/`popAt` ni ham tekshiring.
 */
export const TUTORIAL: TutorialTab[] = [
  {
    id: 'dashboard',
    tab: 'Bosh sahifa',
    lead: 'Bo‘limning umumiy holati — bitta ekranda.',
    steps: [
      {
        scene: 'bosh/base',
        title: 'Butun bo‘lim — bir qarashda',
        text: 'Lidlar, yopilgan bitimlar, yutilgan tushum, jami balans va konversiya — har biri oldingi davr bilan solishtirib.',
      },
      {
        pop: 'bosh/kalendar',
        click: { x: 1478, y: 116 },
        title: 'Davr — bir bosishda',
        text: 'Bugun, kecha, joriy hafta yoki oy, oxirgi 30 kun — yoki kalendardan istalgan oraliq. Sana tanlovi barcha bo‘limlarda bir xil ishlaydi.',
      },
      {
        pop: 'bosh/voronka-tanlash',
        click: { x: 1215, y: 116 },
        title: 'Kerakli voronkalar',
        text: 'Bir nechta voronkani, kerak bo‘lsa alohida bosqichlarini tanlang — sahifadagi raqamlar shunga qarab hisoblanadi.',
      },
      {
        pop: 'bosh/lidlar-filtr',
        click: { x: 242, y: 195 },
        title: 'Yangi yoki qayta murojaat',
        text: 'Lidlarni barchasi, faqat yangilari yoki qayta murojaat qilganlar bo‘yicha ko‘ring.',
      },
      {
        pop: 'bosh/manbalar',
        click: { x: 264, y: 242 },
        title: 'Lid qayerdan keldi',
        text: '“Manbalar”ni bosing — har manbadan nechta lid kelgani va ulushi; yangi va qayta murojaatlar alohida.',
      },
      {
        pop: 'bosh/manbalar-turlar',
        title: 'Manba ichidagi turlar',
        text: 'Manbani yoying — lid qaysi forma, kanal yoki reklama turidan kelgani ko‘rinadi.',
      },
      {
        pop: 'bosh/dinamika-hover',
        title: 'Har kunning tarkibi',
        text: 'Grafikdagi kunga kursorni olib boring — o‘sha kuni kelgan lidlar manbalar bo‘yicha.',
      },
      {
        pop: 'bosh/voronka-ochiq',
        click: { x: 880, y: 464 },
        title: 'Voronkaning har bosqichi',
        text: 'Voronkani oching — har bosqichdagi lidlar, bosqichdan bosqichga o‘tish foizi, yutuq va rad etilganlar.',
      },
    ],
  },
  {
    id: 'planfact',
    tab: 'Plan / Fakt',
    lead: 'Oy rejasi bajariladimi — har kuni, har xodim bo‘yicha.',
    steps: [
      {
        scene: 'plan/base',
        title: 'Olti ko‘rsatkich, uch holat',
        text: 'Lidlar, qo‘ng‘iroqlar, suhbatlar, uchrashuvlar, tashriflar va sotuvlar. Har biri: Oldinda, Ehtiyot yoki Orqada — va kuniga qancha qolgani.',
      },
      {
        focus: { x: 32, y: 158, w: 325, h: 468 },
        title: 'Oy qanday yakunlanadi',
        text: 'Oy rejasining necha foizi bajarilgani, oyning qancha qismi o‘tgani va oy oxirigacha prognoz.',
      },
      {
        focus: { x: 1110, y: 88, w: 490, h: 56 },
        click: { x: 1300, y: 116 },
        title: 'Bo‘limlar kesimi',
        text: 'Umumiy, Sotuv bo‘limi va Call center — har biri o‘z plani va fakti bilan.',
      },
      {
        scene: 'plan/monitoring',
        enter: 'scroll',
        title: 'Istalgan davr monitoringi',
        text: 'Ixtiyoriy oraliq uchun reja va fakt, prognoz va o‘tgan haftaga nisbatan o‘zgarish.',
      },
      {
        scene: 'plan/dinamika',
        enter: 'scroll',
        focus: { x: 946, y: 18, w: 644, h: 510 },
        title: 'Sotuv voronkasi',
        text: 'Lidlardan sotuvgacha: har bosqichning reja va fakti, bosqichdan o‘tish foizi. Yonida — reja, fakt va prognozning kumulyativ grafigi.',
      },
      {
        pop: 'plan/haftalik',
        popAt: { x: 30, y: 560, w: 1558 },
        title: 'Haftalik taqqoslash',
        text: 'Shu hafta o‘tgan hafta bilan: sotuvlar, suhbatlar, tashriflar va lidlar — o‘zgarish foizi bilan.',
      },
      {
        scene: 'plan/xodimlar',
        enter: 'scroll',
        title: 'Har xodim bo‘yicha',
        text: 'Har xodimning plani va fakti, bajarilish foizi, prognoz, trend va holati. Xodimni qidirish va holat bo‘yicha filtr.',
      },
    ],
  },
  {
    id: 'performance',
    tab: 'Samaradorlik',
    lead: 'Har bir xodim qanday ishlayotgani — taxminsiz.',
    steps: [
      {
        scene: 'sam/base',
        title: 'Qo‘ng‘iroqlar faolligi',
        text: 'Jami qo‘ng‘iroqlar, faol kunlar, umumiy muloqot vaqti va har kungi faollik kalendari.',
      },
      {
        pop: 'sam/xodim-filtr',
        click: { x: 1222, y: 113 },
        title: 'Butun bo‘lim — tanlangan xodimlar kesimida',
        text: 'Xodimlarni tanlang — bo‘limdagi barcha ko‘rsatkich va jadvallar faqat shu xodimlar bo‘yicha qayta hisoblanadi.',
      },
      {
        scene: 'sam/heatmap',
        enter: 'scroll',
        focus: { x: 412, y: 272, w: 640, h: 240 },
        title: 'Xodim × kun xaritasi',
        text: 'Har xodimning har kungi qo‘ng‘iroqlari. Katakka kursorni olib boring — qo‘ng‘iroqlar soni va muloqot vaqti.',
      },
      {
        pop: 'sam/heatmap-kun',
        modal: true,
        click: { x: 1085, y: 466 },
        title: 'Kunning batafsil hisoboti',
        text: 'Katakni bosing — o‘sha kungi qo‘ng‘iroqlar, muloqot vaqti, qisqa va o‘tkazib yuborilgan qo‘ng‘iroqlar.',
      },
      {
        scene: 'sam/speed',
        enter: 'scroll',
        title: 'Birinchi aloqa tezligi',
        text: 'Arizadan birinchi qo‘ng‘iroqqacha bo‘lgan vaqt — har xodim bo‘yicha: tezkor (≤15 daq), o‘rtacha (15–30) va sekin, hali kutayotganlar soni.',
      },
      {
        pop: 'sam/radar',
        modal: true,
        click: { x: 1505, y: 771 },
        title: 'Jonli radar',
        text: 'Oxirgi 24 soatda kelib, hali aloqa qilinmagan arizalar — kutish vaqti bilan. Lidni bosing — UYSOT’da ochiladi.',
      },
      {
        pop: 'sam/etibordan',
        modal: true,
        click: { x: 1540, y: 123 },
        title: 'E’tibordan chetda qolganlar',
        text: 'Kompaniya bo‘yicha hali aloqa qilinmagan barcha arizalar va xodimlar kesimida statistika.',
      },
      {
        scene: 'sam/operatorlar',
        enter: 'scroll',
        title: 'Operatorlar reytingi',
        text: 'Qo‘ng‘iroqlar, muloqot vaqti, lidlar, uchrashuvlar va konversiya — o‘tgan davr bilan solishtirib. Har xodimning kuchli tomoni belgilanadi.',
      },
      {
        pop: 'sam/ustun-sozlash',
        modal: true,
        click: { x: 1073, y: 122 },
        title: 'Ustunni o‘zingiz sozlaysiz',
        text: 'Uchrashuv ustunlari qaysi CRM bosqichlaridan sanalishini belgilang — jadval sizning voronkangizga moslashadi.',
      },
      {
        scene: 'sam/menejerlar',
        enter: 'scroll',
        title: 'Sotuv menejerlari',
        text: 'Lidlar, rejalashtirilgan va muvaffaqiyatli uchrashuvlar, muvaffaqiyatli lidlar — umumiy konversiya bo‘yicha tartiblangan.',
      },
      {
        scene: 'sam/vazifalar',
        enter: 'scroll',
        title: 'Vazifalar effektivligi',
        text: 'Har xodimning vazifalari va bajarilmaganlari: effektivlik = 100 − bajarilmagan / jami × 100, o‘tgan davr bilan solishtirib.',
      },
    ],
  },
  {
    id: 'leads',
    tab: 'Lidlar',
    lead: 'Har bir lid — kim, qachon va necha marta bog‘langani.',
    steps: [
      {
        scene: 'lid/base',
        title: 'Beshta ko‘rsatkich va jadval',
        text: 'Jami, bog‘langan va bog‘lanilmagan lidlar, o‘rtacha aloqa tezligi va suhbat davomiyligi. Ostida — har lid bo‘yicha jadval.',
      },
      {
        scene: 'lid/boglanilgan',
        click: { x: 434, y: 112 },
        title: 'Kartani tanlang — jadval o‘zgaradi',
        text: 'Jadval tanlangan ko‘rsatkich bo‘yicha hisoblanadi: “Bog‘langan”ni bossangiz — faqat qo‘ng‘iroq qilingan lidlar.',
      },
      {
        scene: 'lid/boglanilmagan',
        click: { x: 715, y: 150 },
        title: 'Kimga hali qo‘ng‘iroq qilinmagan',
        text: '“Bog‘lanilmagan” — aloqa qilinmagan lidlar: kimga biriktirilgan, qachon kelgan, qaysi bosqichda.',
      },
      {
        pop: 'lid/masullar',
        modal: true,
        click: { x: 614, y: 158 },
        title: 'Mas’ullar holati',
        text: 'Kartadagi raqamni bosing — bu lidlarning nechtasi xodimga biriktirilgan, nechtasi egasiz va kimda nechta.',
      },
      {
        pop: 'lid/filtr-voronka',
        popAt: { x: 872, y: 92, w: 372 },
        click: { x: 1195, y: 76 },
        title: 'Voronka va bosqich filtri',
        text: 'Lidlarni voronka va uning bosqichlari bo‘yicha toraytiring.',
      },
      {
        pop: 'lid/filtr-xodim',
        popAt: { x: 872, y: 92, w: 372 },
        click: { x: 1195, y: 76 },
        title: 'Mas’ul xodim filtri',
        text: 'Bir yoki bir nechta mas’ul xodimni belgilang. Qidiruv — ID, ism, telefon yoki mas’ul bo‘yicha.',
      },
      {
        scene: 'lid/lid-oynasi',
        title: 'Lid — bir bosishda UYSOT’da',
        text: 'Jadvaldagi lidni bosing — uning UYSOT’dagi oynasi ochiladi: bosqich, tarix, vazifalar.',
      },
    ],
  },
  {
    id: 'marketing',
    tab: 'Marketing',
    lead: 'Qaysi manba lid emas, bitim keltiryapti.',
    steps: [
      {
        scene: 'mkt/base',
        title: 'Manbadan bitimgacha',
        text: 'Har manba: arizalar, tekshiruv, maqsadli (ЦЗ), bog‘lanilmagan, qayta qo‘ng‘iroq, tanlov, uchrashuv, yutilgan bitim va savdo summasi.',
      },
      {
        focus: { x: 30, y: 300, w: 760, h: 90 },
        click: { x: 316, y: 343 },
        title: 'Guruhlash, qidiruv, eksport',
        text: 'So‘nggi yoki birinchi manba, yoxud voronka bo‘yicha guruhlang; manbani qidiring; jadvalni Excel (.xlsx) ga yuklab oling.',
      },
      {
        pop: 'mkt/voronka-filtr',
        click: { x: 1238, y: 114 },
        title: 'Voronkalarni tanlash',
        text: 'Hisobot barcha voronkalar yoki faqat tanlanganlari bo‘yicha.',
      },
      {
        pop: 'mkt/ustun-sozlash',
        modal: true,
        click: { x: 735, y: 430 },
        title: 'Moslashuvchan jadval',
        text: 'Har ustun qaysi CRM bosqichlaridan hisoblanishini o‘zingiz tanlaysiz. Standart qoidaga bir bosishda qaytish mumkin.',
      },
      {
        scene: 'mkt/voronkalar',
        title: 'Voronkalar kesimida',
        text: 'Xuddi shu jadval — har voronka bo‘yicha, savdo summasi va konversiya bilan.',
      },
    ],
  },
];

export interface Slide {
  tab: string;
  title: string;
  text: string;
  /** `public/images/up/` dagi banner (`npm run images` yasaydi). */
  image: MediaKey;
}

/** Hero ostidagi yoy-karusel (Kumo uslubi) — eng kuchli funksiyalar reklamasi. */
export const SHOWCASE: Slide[] = [
  {
    tab: 'Samaradorlik',
    title: 'Lidga necha daqiqada qo‘ng‘iroq qilindi',
    text: 'Arizadan birinchi qo‘ng‘iroqqacha bo‘lgan vaqt — har xodim bo‘yicha: tezkor, o‘rtacha, sekin va hali kutayotganlar.',
    image: 'up/speed',
  },
  {
    tab: 'Samaradorlik',
    title: 'Jonli radar',
    text: 'Oxirgi 24 soatda kelib, hali aloqa qilinmagan arizalar — kutish vaqti bilan. Bitta bosishda UYSOT’da ochiladi.',
    image: 'up/radar',
  },
  {
    tab: 'Plan / Fakt',
    title: 'Reja har kuni ko‘z oldingizda',
    text: 'Olti ko‘rsatkich bo‘yicha bajarilish: Oldinda, Ehtiyot yoki Orqada — va oy oxirigacha prognoz.',
    image: 'up/plan-oy',
  },
  {
    tab: 'Samaradorlik',
    title: 'Kim qachon ishladi — bir qarashda',
    text: 'Har xodimning har kungi qo‘ng‘iroqlari. Katakni bosing — o‘sha kunning batafsil hisoboti.',
    image: 'up/heatmap',
  },
  {
    tab: 'Bosh sahifa',
    title: 'Lid qayerdan keldi',
    text: 'Har manbadan nechta lid kelgani, yangi va qayta murojaatlar, manba ichidagi turlar.',
    image: 'up/manbalar',
  },
  {
    tab: 'Marketing',
    title: 'Manbadan bitimgacha',
    text: 'Har reklama manbasi: arizalar, maqsadli lidlar, uchrashuvlar, yutilgan bitimlar va savdo summasi — bitta jadvalda.',
    image: 'up/marketing',
  },
  {
    tab: 'Marketing',
    title: 'Jadval sizga moslashadi',
    text: 'Har ustun qaysi CRM bosqichlaridan hisoblanishini o‘zingiz tanlaysiz.',
    image: 'up/ustun-sozlash',
  },
  {
    tab: 'Plan / Fakt',
    title: 'Lidlardan sotuvgacha',
    text: 'Sotuv voronkasi: har bosqichning reja va fakti va bosqichdan o‘tish foizi.',
    image: 'up/sotuv-voronkasi',
  },
  {
    tab: 'Lidlar',
    title: 'Egasiz lid qolmaydi',
    text: 'Bog‘lanilmagan lidlarning nechtasi xodimga biriktirilgan, nechtasi egasiz va kimda nechta.',
    image: 'up/masullar',
  },
  {
    tab: 'Samaradorlik',
    title: 'Operatorlar reytingi',
    text: 'Qo‘ng‘iroqlar, muloqot vaqti, uchrashuvlar va konversiya — har xodimning kuchli tomoni bilan.',
    image: 'up/operatorlar',
  },
  {
    tab: 'Bosh sahifa',
    title: 'Voronkaning har bosqichi',
    text: 'Har bosqichdagi lidlar soni va bosqichdan bosqichga o‘tish foizi — har bir voronka uchun.',
    image: 'up/voronka',
  },
];

export const STEPS = [
  {
    title: 'Tugmani bosing',
    text: 'Siz UYSOT’ning rasmiy ruxsat sahifasiga o‘tasiz. UYSOT’ga kirmagan bo‘lsangiz — avval kiring, keyin tugmani qayta bosing.',
  },
  {
    title: 'Ruxsat bering',
    text: 'Pulse faqat o‘qish ruxsatini so‘raydi. Bir marta tasdiqlaysiz — boshqa sozlama yo‘q.',
  },
  {
    title: 'CRM ichida oching',
    text: 'Pulse UYSOT kabinetingizda alohida bo‘lim bo‘lib ochiladi. Ma’lumotlar o‘zi yuklanadi.',
  },
];

/** OAuth'da so'raladigan ruxsatlar (`apps/api/src/oauth/uysot-oauth.provider.ts` — PULSE_GRANTS). */
export const PERMISSIONS = ['Lidlar', 'Lid vazifalari', 'Lid izohlari', 'Shartnoma to‘lovlari', 'Qo‘ng‘iroqlar'];

export const TRUST = [
  {
    title: 'Faqat o‘qiydi',
    text: 'Pulse CRM’dagi hech narsani o‘zgartirmaydi, yozmaydi va o‘chirmaydi.',
  },
  {
    title: 'Rasmiy UYSOT ulanishi',
    text: 'Ulanish UYSOT’ning OAuth sahifasi orqali. Parolingiz Pulse’ga hech qachon kelmaydi.',
  },
  {
    title: 'Shifrlangan kirish',
    text: 'UYSOT bergan kirish kalitlari serverda shifrlangan holda saqlanadi.',
  },
  {
    title: 'Har kompaniya alohida',
    text: 'Har kompaniya faqat o‘z ma’lumotini ko‘radi — bu tekshiruv har bir so‘rovda.',
  },
];

export const FAQS = [
  {
    q: 'Pulse qanday ulanadi?',
    a: 'Sahifadagi tugmani bosasiz, UYSOT ruxsat sahifasida tasdiqlaysiz va Pulse CRM ichida ochiladi. Hammasi bir daqiqa atrofida.',
  },
  {
    q: 'Login yoki parol kerakmi?',
    a: 'Yo‘q. Pulse UYSOT ichida ochiladi va sizni UYSOT orqali taniydi. Alohida hisob ochish shart emas.',
  },
  {
    q: 'UYSOT hisobim yo‘q bo‘lsa-chi?',
    a: 'Pulse UYSOT CRM ichida ishlaydi, hisobni esa UYSOT jamoasi ochib beradi. Tugma ostidagi “UYSOT hisobingiz yo‘qmi?” orqali UYSOT qo‘llab-quvvatlashiga Telegram’da yozing yoki rasmiy saytga o‘ting.',
  },
  {
    q: 'Tugmani bossam, UYSOT kirish sahifasi ochildi.',
    a: 'Demak shu brauzerda UYSOT’ga kirilmagan. Login va parolingiz bilan kiring, keyin shu sahifaga qaytib tugmani yana bir marta bosing — ruxsat sahifasi ochiladi.',
  },
  {
    q: 'Pulse ma’lumotlarimni o‘zgartira oladimi?',
    a: 'Yo‘q. Pulse faqat o‘qish ruxsatlarini so‘raydi: lidlar, vazifalar, izohlar, shartnoma to‘lovlari va qo‘ng‘iroqlar.',
  },
  {
    q: 'Ma’lumotlar qanchalik yangi?',
    a: 'Pulse UYSOT’dagi o‘zgarishlarni avtomatik oladi, sahifa esa har daqiqada o‘zi yangilanadi. Kerak bo‘lsa, “Yangilash” tugmasi bor.',
  },
  {
    q: 'Savolim bo‘lsa, kimga yozaman?',
    a: 'Telegram orqali yozing — ulanish va ishlatish bo‘yicha yordam beramiz.',
  },
];
