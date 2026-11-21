export interface ShowcaseImage {
  src: string;
  w: number;
  h: number;
}

export interface ShowcaseWork {
  c: string;
  t: string;
  d: string;
  imgs?: ShowcaseImage[];
  g: [string, string];
  tools: string[];
  pos?: string;
  fit?: "cover" | "contain";
  u?: string;
  caseStudyUrl?: string;
}

export const SHOWCASE_WORKS: ShowcaseWork[] = [
  // ─── 1. Landing Pages (Projects 6 – 9) ──────────────────────────────
  {
    c: "Landing Pages",
    t: "The Perfect Home",
    d: "A modern architecture landing page featuring scenic landscapes, elegant typography, and warm neutral tones to showcase premium homes and contemporary living.",
    imgs: [
      { src: "/images/the-perfect-home.png", w: 1728, h: 1117 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Figma"],
    fit: "contain",
  },
  {
    c: "Landing Pages",
    t: "Skincare & Beauty",
    d: "A minimalist beauty landing page combining elegant skincare photography, soft neutral colors, and glass-style panels to create a luxurious digital experience.",
    imgs: [
      { src: "/images/skincare1.png", w: 1728, h: 1117 },
    ],
    g: ["#942e3a", "#b4505c"],
    tools: ["Figma"],
    fit: "contain",
  },
  {
    c: "Landing Pages",
    t: "Headphone Accessories",
    d: "A sleek electronics landing page featuring bold product visuals, dark contrasting colors, and modern layouts to highlight premium headphone accessories.",
    imgs: [
      { src: "/images/headphone-accessories.png", w: 1024, h: 661 },
    ],
    g: ["#5c1822", "#942e3a"],
    tools: ["Figma"],
    fit: "contain",
  },
  {
    c: "Landing Pages",
    t: "Coffee House",
    d: "A modern coffee shop landing page featuring rich coffee imagery, warm golden accents, and a dark aesthetic designed to create an inviting café experience.",
    imgs: [
      { src: "/images/coffee-house.png", w: 1024, h: 661 },
    ],
    g: ["#7c2530", "#a63f4b"],
    tools: ["Figma"],
    fit: "contain",
  },

  // ─── 2. Social Media (Projects 1 – 4 & Projects 14 – 19) ─────────────
  {
    c: "Social Media",
    t: "Radiate Confidence",
    d: "A stylish fashion promotional design combining elegant typography, soft neutral colors, and modern editorial visuals to create a bold, sophisticated look.",
    imgs: [
      { src: "/images/radiate-confidence.png", w: 1080, h: 1350 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Glow Skin Serum",
    d: "A refreshing skincare product design featuring icy blue tones, floral elements, and elegant product visuals to communicate freshness, beauty, and luxury.",
    imgs: [
      { src: "/images/glow-skin-serum.png", w: 1080, h: 1350 },
    ],
    g: ["#942e3a", "#b4505c"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Rice Bowl",
    d: "A vibrant food promotional design featuring bold typography, rich green tones, and appetizing food photography to create an eye-catching visual.",
    imgs: [
      { src: "/images/rice-bowl.png", w: 1080, h: 1350 },
    ],
    g: ["#7c2530", "#a63f4b"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Hello, I'm Kinjal",
    d: "A modern personal introduction post featuring bold red gradients, geometric shapes, and minimal typography for a clean and confident digital identity.",
    imgs: [
      { src: "/images/hello-im-kinjal.png", w: 623, h: 623 },
    ],
    g: ["#5c1822", "#942e3a"],
    tools: ["Figma", "Photoshop"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Eat. Chill. Repeat.",
    d: "A creative food advertisement featuring delicious meal photography, warm colors, and playful typography to create an inviting promotional design.",
    imgs: [
      { src: "/images/eat-chill-repeat.png", w: 1122, h: 1402 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "R.K. Enterprise – Step Inside",
    d: "A professional showroom promotional poster featuring elegant interior photography, premium typography, and warm lighting to highlight the shopping experience.",
    imgs: [
      { src: "/images/rk-enterprise-step-inside.png", w: 1122, h: 1402 },
    ],
    g: ["#942e3a", "#b4505c"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "R.K. Enterprise – Business Showcase",
    d: "A modern business promotional design featuring storefront photography, product highlights, and structured layouts to communicate the brand's presence and offerings.",
    imgs: [
      { src: "/images/rk-enterprise-business-showcase.png", w: 1254, h: 1254 },
    ],
    g: ["#7c2530", "#a63f4b"],
    tools: ["Photoshop", "Figma"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Less Chaos, Better Work",
    d: "A playful social media design featuring a cute illustrated character, calming blue tones, and minimal typography to communicate a stress-free work experience.",
    imgs: [
      { src: "/images/less-chaos-better-work.png", w: 1086, h: 1448 },
    ],
    g: ["#5c1822", "#942e3a"],
    tools: ["Photoshop", "Illustrator"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Ownership & Deadlines",
    d: "A minimalist motivational post combining an adorable elephant illustration, soft blue backgrounds, and meaningful typography to highlight workplace responsibility.",
    imgs: [
      { src: "/images/ownership-deadlines.png", w: 1254, h: 1254 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
  },
  {
    c: "Social Media",
    t: "Kaam No Load Chhe?",
    d: "A fun Gujarati promotional post featuring expressive photography, bold typography, and a playful layout to connect with audiences through relatable workplace humor.",
    imgs: [
      { src: "/images/kaam-no-load-chhe.png", w: 1122, h: 1402 },
    ],
    g: ["#942e3a", "#b4505c"],
    tools: ["Photoshop", "Canva"],
    fit: "contain",
  },

  // ─── 3. Book Design (Project 5) ─────────────────────────────────────
  {
    c: "Book Design",
    t: "Less Chaos. More Clarity.",
    d: "A professional book cover design for Simplifyte featuring bold typography, clean illustrations, and a blue-and-white color palette that reflects clarity and teamwork.",
    imgs: [
      { src: "/images/simplifyte-book-cover-1.png", w: 2480, h: 3508 },
      { src: "/images/simplifyte-book-cover-2.png", w: 2480, h: 3508 },
      { src: "/images/simplifyte-book-cover-3.png", w: 3487, h: 3487 },
    ],
    g: ["#7c2530", "#a63f4b"],
    tools: ["Photoshop", "InDesign"],
    fit: "contain",
  },

  // ─── 4. Brochures (Projects 10 & 11) ─────────────────────────────────
  {
    c: "Brochures",
    t: "Simplifyte – Work Smarter",
    d: "A professional business brochure showcasing Simplifyte's workflow management features through clean layouts, modern typography, and consistent brand visuals.",
    imgs: [
      { src: "/images/simplifyte-work-smarter-1.jpg", w: 1877, h: 3988 },
      { src: "/images/simplifyte-work-smarter-2.jpg", w: 451, h: 957 },
      { src: "/images/simplifyte-work-smarter-3.jpg", w: 451, h: 957 },
      { src: "/images/simplifyte-work-smarter-4.jpg", w: 1877, h: 3988 },
      { src: "/images/simplifyte-work-smarter-5.jpg", w: 451, h: 957 },
      { src: "/images/simplifyte-work-smarter-6.jpg", w: 451, h: 957 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Photoshop", "InDesign", "Figma"],
    fit: "contain",
  },
  {
    c: "Brochures",
    t: "Construction Equipment Brochure",
    d: "A modern industrial brochure featuring construction machinery, structured information, and a fresh green-and-white color palette for clear product communication.",
    imgs: [
      { src: "/images/construction-equipment-1.png", w: 280, h: 595 },
      { src: "/images/construction-equipment-2.png", w: 280, h: 595 },
      { src: "/images/construction-equipment-3.png", w: 280, h: 595 },
      { src: "/images/construction-equipment-4.png", w: 280, h: 595 },
      { src: "/images/construction-equipment-5.jpg", w: 1167, h: 2480 },
      { src: "/images/construction-equipment-6.png", w: 280, h: 595 },
    ],
    g: ["#5c1822", "#942e3a"],
    tools: ["Photoshop", "InDesign", "Canva"],
    fit: "contain",
  },

  // ─── 5. Logo Design (Projects 12 & 13) ───────────────────────────────
  {
    c: "Logo Design",
    t: "Ghodeer Cab",
    d: "A creative cab service logo combining elegant letterforms with a car silhouette, using warm metallic tones to establish a distinctive brand identity.",
    imgs: [
      { src: "/images/ghodeer-cab-1.png", w: 800, h: 800 },
      { src: "/images/ghodeer-cab-2.png", w: 1280, h: 720 },
      { src: "/images/ghodeer-cab-3.png", w: 760, h: 766 },
    ],
    g: ["#7c2530", "#a63f4b"],
    tools: ["Figma", "Photoshop", "Illustrator"],
    fit: "contain",
  },
  {
    c: "Logo Design",
    t: "MOKA Café",
    d: "A stylish café logo featuring coffee-inspired typography, earthy tones, and a subtle leaf accent, designed for a warm and memorable brand identity.",
    imgs: [
      { src: "/images/moka-cafe-1.png", w: 724, h: 530 },
      { src: "/images/moka-cafe-2.png", w: 1448, h: 1086 },
      { src: "/images/moka-cafe-3.png", w: 959, h: 1024 },
    ],
    g: ["#6e1f2a", "#942e3a"],
    tools: ["Figma", "Illustrator"],
    fit: "contain",
  },

  // ─── 6. Creative Designs (Projects 20 & 21) ──────────────────────────
  {
    c: "Creative Designs",
    t: "Workflow Clarity for Professional Teams",
    d: "A modern promotional standee for Simplifyte featuring friendly illustrations, clean typography, and branded elements to communicate productivity and teamwork.",
    imgs: [
      { src: "/images/workflow-clarity.png", w: 3464, h: 8291 },
    ],
    g: ["#942e3a", "#b4505c"],
    tools: ["Figma", "Photoshop", "Canva"],
    fit: "contain",
  },
  {
    c: "Creative Designs",
    t: "Deadlines. Teams. Clients.",
    d: "A bold corporate standee featuring mountain imagery, impactful typography, and a premium blue palette to represent clarity, coordination, and professional growth.",
    imgs: [
      { src: "/images/deadlines-teams-clients.png", w: 3464, h: 8291 },
    ],
    g: ["#5c1822", "#942e3a"],
    tools: ["Figma", "Photoshop", "Canva"],
    fit: "contain",
  },
];

export const SHOWCASE_CATEGORIES: string[] = [
  "All",
  "Landing Pages",
  "Social Media",
  "Book Design",
  "Brochures",
  "Logo Design",
  "Creative Designs",
];

export const TICKER_ITEMS: string[] = [
  "UI design",
  "UX design",
  "Landing pages",
  "Mobile screens",
  "Branding",
  "Logos",
  "Brochures",
  "Social media",
];
