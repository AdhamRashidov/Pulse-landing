// AVTOMATIK yaratilgan — scripts/build-images.mjs (npm run images). Qo'lda tahrirlamang.
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
  'bosh/base': {src: "/images/t/bosh/base.webp",w: 1636,h: 871},
  'bosh/kalendar': {src: "/images/t/bosh/kalendar.webp",w: 571,h: 448,at: {x: 1059,y: 58}},
  'bosh/voronka-tanlash': {src: "/images/t/bosh/voronka-tanlash.webp",w: 370,h: 645,at: {x: 1083,y: 76}},
  'bosh/lidlar-filtr': {src: "/images/t/bosh/lidlar-filtr.webp",w: 327,h: 223,at: {x: 18,y: 138}},
  'bosh/manbalar': {src: "/images/t/bosh/manbalar.webp",w: 688,h: 666,at: {x: 9,y: 142}},
  'bosh/manbalar-turlar': {src: "/images/t/bosh/manbalar-turlar.webp",w: 717,h: 673,at: {x: 1,y: 139}},
  'bosh/dinamika-hover': {src: "/images/t/bosh/dinamika-hover.webp",w: 790,h: 405,at: {x: 25,y: 351}},
  'bosh/voronka-ochiq': {src: "/images/t/bosh/voronka-ochiq.webp",w: 778,h: 649,at: {x: 826,y: 349}},
  'plan/base': {src: "/images/t/plan/base.webp",w: 1621,h: 874},
  'plan/monitoring': {src: "/images/t/plan/monitoring.webp",w: 1624,h: 655},
  'plan/dinamika': {src: "/images/t/plan/dinamika.webp",w: 1618,h: 537},
  'plan/haftalik': {src: "/images/t/plan/haftalik.webp",w: 1557,h: 178,cut: true},
  'plan/xodimlar': {src: "/images/t/plan/xodimlar.webp",w: 1612,h: 723},
  'sam/base': {src: "/images/t/sam/base.webp",w: 1618,h: 868},
  'sam/xodim-filtr': {src: "/images/t/sam/xodim-filtr.webp",w: 436,h: 559,at: {x: 895,y: 33}},
  'sam/heatmap': {src: "/images/t/sam/heatmap.webp",w: 1596,h: 748},
  'sam/heatmap-kun': {src: "/images/t/sam/heatmap-kun.webp",w: 920,h: 206,cut: true},
  'sam/speed': {src: "/images/t/sam/speed.webp",w: 1630,h: 819},
  'sam/radar': {src: "/images/t/sam/radar.webp",w: 1380,h: 718,cut: true},
  'sam/etibordan': {src: "/images/t/sam/etibordan.webp",w: 1380,h: 718,cut: true},
  'sam/operatorlar': {src: "/images/t/sam/operatorlar.webp",w: 1614,h: 808},
  'sam/ustun-sozlash': {src: "/images/t/sam/ustun-sozlash.webp",w: 920,h: 777,cut: true},
  'sam/menejerlar': {src: "/images/t/sam/menejerlar.webp",w: 1429,h: 805},
  'sam/vazifalar': {src: "/images/t/sam/vazifalar.webp",w: 1623,h: 807},
  'lid/base': {src: "/images/t/lid/base.webp",w: 1468,h: 826},
  'lid/boglanilgan': {src: "/images/t/lid/boglanilgan.webp",w: 1441,h: 804},
  'lid/boglanilmagan': {src: "/images/t/lid/boglanilmagan.webp",w: 1428,h: 837},
  'lid/masullar': {src: "/images/t/lid/masullar.webp",w: 536,h: 740,cut: true},
  'lid/filtr-voronka': {src: "/images/t/lid/filtr-voronka.webp",w: 575,h: 530,cut: true},
  'lid/filtr-xodim': {src: "/images/t/lid/filtr-xodim.webp",w: 577,h: 493,cut: true},
  'lid/lid-oynasi': {src: "/images/t/lid/lid-oynasi.webp",w: 1641,h: 952},
  'mkt/base': {src: "/images/t/mkt/base.webp",w: 1635,h: 820},
  'mkt/voronka-filtr': {src: "/images/t/mkt/voronka-filtr.webp",w: 489,h: 568,at: {x: 1127,y: 70}},
  'mkt/ustun-sozlash': {src: "/images/t/mkt/ustun-sozlash.webp",w: 920,h: 777,cut: true},
  'mkt/voronkalar': {src: "/images/t/mkt/voronkalar.webp",w: 1633,h: 832},
  'up/speed': {src: "/images/up/speed.webp",w: 1200,h: 640},
  'up/radar': {src: "/images/up/radar.webp",w: 1200,h: 640},
  'up/plan-oy': {src: "/images/up/plan-oy.webp",w: 1200,h: 640},
  'up/heatmap': {src: "/images/up/heatmap.webp",w: 1200,h: 640},
  'up/manbalar': {src: "/images/up/manbalar.webp",w: 1200,h: 640},
  'up/marketing': {src: "/images/up/marketing.webp",w: 1200,h: 640},
  'up/ustun-sozlash': {src: "/images/up/ustun-sozlash.webp",w: 1200,h: 640},
  'up/sotuv-voronkasi': {src: "/images/up/sotuv-voronkasi.webp",w: 1200,h: 640},
  'up/masullar': {src: "/images/up/masullar.webp",w: 1200,h: 640},
  'up/operatorlar': {src: "/images/up/operatorlar.webp",w: 1200,h: 640},
  'up/voronka': {src: "/images/up/voronka.webp",w: 1200,h: 640},
} satisfies Record<string, MediaInfo>;

export type MediaKey = keyof typeof MEDIA;

/** Ilova foni — tutorial kadrida rasm qisqa bo'lsa bo'sh joy shu rangda */
export const SCENE_BG = '#FAFAF9';
