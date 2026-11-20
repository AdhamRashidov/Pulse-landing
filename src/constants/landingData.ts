export interface NavItem {
  label: string;
  href: string;
}

export interface SlideItem {
  id: string;
  tag: string;
  title: string;
  summary: string;
  badge: string;
  metric: string;
  metricLabel: string;
  imageFileName: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Ekranlar', href: '#showcase' },
  { label: 'Imkoniyatlar', href: '#features' },
  { label: 'Kalkulyator', href: '#calculator' },
  { label: 'Savol-javob', href: '#faq' },
];

export const SHOWCASE_SLIDES: SlideItem[] = [
  {
    id: 'speed',
    tag: 'Speed-to-Lead',
    title: 'Mijoz bilan birinchi aloqa tezligi',
    summary: 'Lid tushishi bilan birinchi qo‘ng‘iroqqacha bo‘lgan vaqt. 15 daqiqadan kechiksa — mijoz sovib ketadi.',
    badge: '🔥 78.4% Issiq Lidlar',
    metric: '7.8 daq',
    metricLabel: 'O‘rtacha aloqa vaqti',
    imageFileName: 'tab-speed.png',
  },
  {
    id: 'plan',
    tag: 'Plan / Fakt',
    title: 'Oylik reja va faktik tushum',
    summary: 'Xodimlar va butun bo‘lim bo‘yicha real tushum. Kunlik prognoz avtomatik hisoblanadi.',
    badge: '89.6% Reja bajarildi',
    metric: '448M so‘m',
    metricLabel: 'Faktik tushum',
    imageFileName: 'tab-plan.png',
  },
  {
    id: 'calls',
    tag: 'Heatmap',
    title: '24/7 Qo‘ng‘iroqlar zichligi',
    summary: 'Mijozlar qaysi soatda eng faol javob beryapti? Qo‘ng‘iroq qilishning eng optimal vaqtlari.',
    badge: '86.4% Ulanish',
    metric: '5,240 ta',
    metricLabel: 'Jami qo‘ng‘iroqlar',
    imageFileName: 'tab-calls.png',
  },
  {
    id: 'marketing',
    tag: 'Marketing ROI',
    title: 'Reklama kanallari va daromad',
    summary: 'Qaysi manba (Instagram, Telegram, Sayt) haqiqiy pul to‘layotgan xaridor berayotganini ko‘ring.',
    badge: '+312% ROI',
    metric: '184M so‘m',
    metricLabel: 'Instagram Ads tushumi',
    imageFileName: 'tab-marketing.png',
  },
  {
    id: 'leads',
    tag: 'Toza Baza',
    title: 'Dublikatlar va takroriy lidlar filtri',
    summary: 'Birlashtirilgan yoki o‘chirilgan lidlar tahlilni buzmaydi. Faqat xolis, aniq raqamlar.',
    badge: '99.2% Tozalik',
    metric: '1,186 ta',
    metricLabel: 'Saralangan baza',
    imageFileName: 'tab-leads.png',
  },
];

export const MINIMAL_FAQS = [
  {
    q: 'Pulse qanday ulanadi?',
    a: '“UYSOT‘ga o‘rnatish” tugmasini bosing, ruxsat bering va 1 daqiqada UYSOT kabinetingizda (iframe/82) tahlillar ochiladi.',
  },
  {
    q: 'Agar UYSOT hisobim bo‘lmasa-chi?',
    a: 'Tugmani bosganda tizim sizni avval UYSOT login sahifasiga yo‘naltiradi, kirganingizdan so‘ng o‘rnatish davom etadi.',
  },
  {
    q: 'Maʼlumotlarimiz xavfsizmi?',
    a: 'Ha. Rasmiy OAuth 2.0 protokoli orqali ulanadi. Parol talab qilinmaydi va maʼlumotlar shifrlangan.',
  },
  {
    q: 'Qanday bog‘lanish mumkin?',
    a: 'Har qanday savol bo‘yicha to‘g‘ridan-to‘g‘ri Telegram orqali yordam markazimizga yozishingiz mumkin.',
  },
];
