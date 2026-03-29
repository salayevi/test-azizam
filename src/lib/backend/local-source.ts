import type {
  AboutSection,
  AboutTextItem,
  AchievementRecord,
  FooterSection,
  HeroSection,
  MediaAsset,
  NavigationLink,
  ProductColorVariant,
  ProductRecord,
  PublicSiteSnapshot,
  SiteIdentity,
} from "./domain";
import type { PublicSiteContentService } from "./services";

const seededAt = "2026-03-28T09:00:00.000Z";
const systemActor = "system-seed";

function createContentMeta(id: string, sortOrder = 0) {
  return {
    id,
    createdAt: seededAt,
    updatedAt: seededAt,
    updatedBy: systemActor,
    revisionId: `rev-${id}-1`,
    status: "published" as const,
    visibility: "visible" as const,
    sortOrder,
    publishedAt: seededAt,
  };
}

const mediaAssets: MediaAsset[] = [
  {
    ...createContentMeta("media-logo", 1),
    kind: "logo",
    label: "Primary logo",
    url: "/logo.png",
    alt: "Azizam Market",
    mimeType: "image/png",
  },
  {
    ...createContentMeta("media-favicon", 2),
    kind: "favicon",
    label: "Favicon",
    url: "/logo.png",
    alt: "Azizam Market favicon",
    mimeType: "image/png",
  },
  {
    ...createContentMeta("media-hero-background", 3),
    kind: "image",
    label: "Hero rose background",
    url: "/rose-bg.png",
    alt: "Azizam Market hero background",
    mimeType: "image/png",
  },
  {
    ...createContentMeta("media-about-grid", 4),
    kind: "image",
    label: "About section image",
    url: "/grid-img.png",
    alt: "Azizam Market",
    mimeType: "image/png",
  },
  {
    ...createContentMeta("media-product-rose-serum", 5),
    kind: "image",
    label: "Rose Serum bottle",
    url: "/products/parfium.jpg",
    alt: "Rose Serum bottle",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-product-velvet-perfume", 6),
    kind: "image",
    label: "Velvet Perfume bottle",
    url: "/products/parfium2.jpg",
    alt: "Velvet Perfume bottle",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-product-silk-cream", 7),
    kind: "image",
    label: "Silk Cream jar",
    url: "/products/parfium3.jpg",
    alt: "Silk Cream jar",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-achievement-team-1", 8),
    kind: "image",
    label: "Achievement team 1",
    url: "/achievements/team-1.jpg",
    alt: "Premium tajriba",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-achievement-team-2", 9),
    kind: "image",
    label: "Achievement team 2",
    url: "/achievements/team-2.jpg",
    alt: "Ishonchli jamoa",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-achievement-team-3", 10),
    kind: "image",
    label: "Achievement team 3",
    url: "/achievements/team-3.jpg",
    alt: "Yutuq va rivojlanish",
    mimeType: "image/jpeg",
  },
  {
    ...createContentMeta("media-achievement-team-4", 11),
    kind: "image",
    label: "Achievement team 4",
    url: "/achievements/team-4.jpg",
    alt: "Brend qadriyati",
    mimeType: "image/jpeg",
  },
];

const siteIdentity: SiteIdentity = {
  ...createContentMeta("site-identity", 1),
  siteName: "Azizam Market",
  brandText: "Azizam Market",
  tagline: "Premium estetik yondashuv, mehr va qadrlash ruhi.",
  logoAssetId: "media-logo",
  faviconAssetId: "media-favicon",
  themeSettings: {
    brand: {
      primary: "#d13ea2",
      primaryStrong: "#d1296f",
      secondary: "#8b2749",
      soft: "#f3bfdc",
    },
    background: {
      page: "#ffffff",
      soft: "#f5f4f2",
      about: "#f2f2f2",
      achievements: "#f6f1ea",
      dark: "#111111",
      lightPanel: "#f5f1eb",
    },
    text: {
      primary: "#3f2d25",
      secondary: "#6f5b51",
      muted: "#9c8576",
      soft: "#7e7169",
      white: "#ffffff",
    },
    border: {
      soft: "rgba(0,0,0,0.12)",
      whiteSoft: "rgba(255,255,255,0.10)",
    },
    overlay: {
      hero: "rgba(209,62,162,0.60)",
      navbar: "rgba(0,0,0,0.30)",
      modal: "rgba(0,0,0,0.60)",
    },
    surface: {
      white: "#ffffff",
      glass: "rgba(255,255,255,0.75)",
      modal: "#111111",
    },
    mobileHero: {
      topIconOuterBackground: "#9D1A12",
      topIconInnerBackground: "#FFFFFF",
      bottomNavBackground: "rgba(255,255,255,0.92)",
      bottomNavTextColor: "#4A3337",
      softShadow: "0 10px 30px rgba(0, 0, 0, 0.16)",
      navShadow: "0 12px 36px rgba(0, 0, 0, 0.14)",
    },
  },
};

const navigationLinks: NavigationLink[] = [
  {
    ...createContentMeta("nav-home", 1),
    label: "Bosh sahifa",
    href: "#home-mobile",
    placement: ["mobileBottom"],
  },
  {
    ...createContentMeta("nav-about", 2),
    label: "Biz haqimizda",
    href: "#about",
    placement: ["desktopHeader", "mobileBottom", "footer"],
  },
  {
    ...createContentMeta("nav-products", 3),
    label: "Mahsulotlar",
    href: "#products",
    placement: ["desktopHeader", "mobileBottom", "footer"],
  },
  {
    ...createContentMeta("nav-achievements", 4),
    label: "Yutuqlar",
    href: "#achievements",
    placement: ["desktopHeader", "mobileBottom", "footer"],
  },
];

const hero: HeroSection = {
  ...createContentMeta("hero-main", 1),
  titleLines: ["Azizam", "Market"],
  backgroundMediaAssetId: "media-hero-background",
  logoAssetId: "media-logo",
  overlay: {
    color: "rgba(209,62,162,0.60)",
  },
};

const about: AboutSection = {
  ...createContentMeta("about-main", 1),
  sectionLabel: "Biz Haqimizda",
  brandTitle: "Azizam Market",
  imageAssetId: "media-about-grid",
};

const aboutTextItems: AboutTextItem[] = [
  "Azizam Market — bu shunchaki kosmetika do‘koni emas.",
  "Bu — mehr, e’tibor va qadrlash maskani.",
  "“Azizam” so‘zi biz uchun oddiy murojaat emas.",
  "Bu yaqinlikni, samimiyatni va muhabbatni anglatadi.",
  "Biz har bir inson o‘zini aziz his qilishi uchun ishlaymiz.",
  "Har bir sovg‘a — bu munosabat.",
  "Har bir mahsulot — e’tibor belgisi.",
].map((text, index) => ({
  ...createContentMeta(`about-text-${index + 1}`, index + 1),
  aboutSectionId: about.id,
  text,
}));

const productColorVariants: ProductColorVariant[] = [
  {
    ...createContentMeta("product-color-rose-gold", 1),
    productId: "product-rose-serum",
    name: "Rose Gold",
    hex: "#c98f98",
  },
  {
    ...createContentMeta("product-color-cream", 2),
    productId: "product-rose-serum",
    name: "Cream",
    hex: "#ece4dc",
  },
  {
    ...createContentMeta("product-color-black", 3),
    productId: "product-rose-serum",
    name: "Black",
    hex: "#2e2927",
  },
  {
    ...createContentMeta("product-color-gold", 4),
    productId: "product-velvet-perfume",
    name: "Gold",
    hex: "#d5b16d",
  },
  {
    ...createContentMeta("product-color-ivory-1", 5),
    productId: "product-velvet-perfume",
    name: "Ivory",
    hex: "#f2ede6",
  },
  {
    ...createContentMeta("product-color-graphite", 6),
    productId: "product-velvet-perfume",
    name: "Graphite",
    hex: "#2a2a2a",
  },
  {
    ...createContentMeta("product-color-mocha", 7),
    productId: "product-silk-cream",
    name: "Mocha",
    hex: "#8f6b52",
  },
  {
    ...createContentMeta("product-color-sand", 8),
    productId: "product-silk-cream",
    name: "Sand",
    hex: "#d5c1ac",
  },
  {
    ...createContentMeta("product-color-ivory-2", 9),
    productId: "product-silk-cream",
    name: "Ivory",
    hex: "#f7f1ea",
  },
];

const products: ProductRecord[] = [
  {
    ...createContentMeta("product-rose-serum", 1),
    slug: "rose-serum",
    title: "Rose Serum",
    subtitle: "Luxury botanical care",
    description:
      "Yengil teksturali premium serum. Teri namligini ushlab turadi, silliqlik va yorqinlik beradi.",
    price: "$48",
    badge: "Best Seller",
    mediaAssetId: "media-product-rose-serum",
    displayTheme: {
      bg: "#f7f2f1",
      text: "#2c2523",
      accent: "#c98f98",
      muted: "#7e7169",
      card: "#fffaf8",
      tone: "light",
    },
    mediaPanel: {
      mode: "forceBlack",
    },
    colorVariantIds: [
      "product-color-rose-gold",
      "product-color-cream",
      "product-color-black",
    ],
    savedEnabled: true,
    cartEnabled: true,
    orderEnabled: true,
  },
  {
    ...createContentMeta("product-velvet-perfume", 2),
    slug: "velvet-perfume",
    title: "Velvet Perfume",
    subtitle: "Elegant signature scent",
    description:
      "Nozik va chuqur ifor uyg‘unligi. Premium segment uchun estetik va uzoq saqlanuvchi kompozitsiya.",
    price: "$72",
    badge: "New Drop",
    mediaAssetId: "media-product-velvet-perfume",
    displayTheme: {
      bg: "#111111",
      text: "#f5f1eb",
      accent: "#d5b16d",
      muted: "#b8ac9d",
      card: "#171717",
      tone: "dark",
    },
    mediaPanel: {
      mode: "forceWhite",
    },
    colorVariantIds: [
      "product-color-gold",
      "product-color-ivory-1",
      "product-color-graphite",
    ],
    savedEnabled: true,
    cartEnabled: true,
    orderEnabled: true,
  },
  {
    ...createContentMeta("product-silk-cream", 3),
    slug: "silk-cream",
    title: "Silk Cream",
    subtitle: "Soft texture, premium finish",
    description:
      "Kunlik foydalanish uchun muloyim cream. Teri yuzasini yumshatadi va premium parvarish hissini beradi.",
    price: "$55",
    badge: "Editor’s Pick",
    mediaAssetId: "media-product-silk-cream",
    displayTheme: {
      bg: "#eee4da",
      text: "#251f1b",
      accent: "#8f6b52",
      muted: "#7a6d62",
      card: "#faf5ef",
      tone: "light",
    },
    mediaPanel: {
      mode: "imageTone",
      color: "#cfc5bc",
    },
    colorVariantIds: [
      "product-color-mocha",
      "product-color-sand",
      "product-color-ivory-2",
    ],
    savedEnabled: true,
    cartEnabled: true,
    orderEnabled: true,
  },
];

const achievements: AchievementRecord[] = [
  {
    ...createContentMeta("achievement-1", 1),
    title: "Premium tajriba",
    eyebrow: "Tajriba",
    description:
      "Har bir mahsulot va xizmat estetik tanlov, sifat va hissiy taassurot mezonlari asosida shakllantiriladi.",
    mediaAssetId: "media-achievement-team-1",
    displayTheme: {
      frame: "#f0069f",
      ribbon: "#f0069f",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.92)",
    },
  },
  {
    ...createContentMeta("achievement-2", 2),
    title: "Ishonchli jamoa",
    eyebrow: "Jamoa",
    description:
      "Bizning jamoa buyurtmadan tortib taqdimotgacha bo‘lgan har bir bosqichni did va e’tibor bilan boshqaradi.",
    mediaAssetId: "media-achievement-team-2",
    displayTheme: {
      frame: "#f0069f",
      ribbon: "#f0069f",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.92)",
    },
  },
  {
    ...createContentMeta("achievement-3", 3),
    title: "Yutuq va rivojlanish",
    eyebrow: "Rivojlanish",
    description:
      "Azizam o‘sib borayotgan brend sifatida tajriba, ishonch va premium yondashuvni bir joyga jamlaydi.",
    mediaAssetId: "media-achievement-team-3",
    displayTheme: {
      frame: "#f0069f",
      ribbon: "#f0069f",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.92)",
    },
  },
  {
    ...createContentMeta("achievement-4", 4),
    title: "Brend qadriyati",
    eyebrow: "Qadriyat",
    description:
      "Har bir detal orqali nafaqat mahsulot, balki unutilmas vizual va emotsional tajriba yaratiladi.",
    mediaAssetId: "media-achievement-team-4",
    displayTheme: {
      frame: "#f0069f",
      ribbon: "#f0069f",
      text: "#ffffff",
      muted: "rgba(255,255,255,0.92)",
    },
  },
];

const footer: FooterSection = {
  ...createContentMeta("footer-main", 1),
  brandText: "Azizam Market",
  description:
    "Premium estetik yondashuv, mehr va qadrlash ruhida qurilgan zamonaviy kosmetika tajribasi.",
  contactItems: [
    {
      label: "Instagram",
      value: "@azizam.market",
      href: "https://instagram.com/azizam.market",
    },
    {
      label: "Telegram",
      value: "@azizammarket",
      href: "https://t.me/azizammarket",
    },
    {
      label: "Telefon",
      value: "+998 00 000 00 00",
      href: "tel:+998000000000",
    },
  ],
  socialLinks: [
    {
      label: "Instagram",
      href: "https://instagram.com/azizam.market",
    },
    {
      label: "Telegram",
      href: "https://t.me/azizammarket",
    },
  ],
  cta: {
    title: "Go‘zallik sizdan boshlanadi",
    description:
      "Har bir mahsulot ortida mehr, e’tibor va nafislik mujassam. Siz bunga loyiqsiz.",
    primaryLabel: "Boshlash",
    primaryMode: "login",
    secondaryLabel: "Yuqoriga qaytish",
    secondaryHref: "#home-mobile",
  },
  legalText: "© 2026 Azizam Market. Barcha huquqlar himoyalangan.",
};

export const localPublicSiteSnapshot: PublicSiteSnapshot = {
  generatedAt: seededAt,
  siteIdentity,
  navigationLinks,
  hero,
  about,
  aboutTextItems,
  products,
  productColorVariants,
  achievements,
  footer,
  mediaAssets,
};

// Temporary adapter: this is the only runtime content source until a real DB/API is attached.
export const localPublicSiteContentService: PublicSiteContentService = {
  async getPublicSiteSnapshot() {
    return localPublicSiteSnapshot;
  },
};
