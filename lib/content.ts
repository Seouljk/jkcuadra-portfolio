// All page copy and data, taken verbatim from the "Matte Lab" Claude Design (Portfolio.dc.html).

/** A run of prose; `hi` renders it in bone white against the muted body text. */
export type Segment = { text: string; hi?: boolean };

export type Link = { label: string; href: string };

export const site = {
  name: "John Kyle Cuadra",
  handle: "jkcuadra",
  role: "Full-Stack Web & Mobile Developer",
  location: "Cagayan de Oro, Philippines",
  locationShort: "Cagayan de Oro, PH",
  company: "Khaylls Labs",
  timeZone: "Asia/Manila",
  email: "cuadra.jkyle@gmail.com",
  phone: { label: "+63 906 942 6271", href: "tel:+639069426271" },
  github: { label: "github.com/Seouljk", href: "https://github.com/Seouljk" },
  linkedin: { label: "linkedin.com/in/jkcuadra", href: "https://linkedin.com/in/jkcuadra" },
  portrait: "/portrait-enhanced.webp",
};

/**
 * Absolute origin of the deployed site, used for canonical URLs, the sitemap and social cards.
 * On Vercel this resolves to the production domain — the custom domain once one is assigned, so the
 * *.vercel.app aliases still name it as canonical. It is inlined at build time, so a domain change
 * needs a redeploy. NEXT_PUBLIC_SITE_URL overrides it outright.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

/** Terms a prospective client would actually search for, kept close to what the page really says. */
export const seoKeywords = [
  "John Kyle Cuadra",
  "jkcuadra",
  "full-stack developer Philippines",
  "web developer Cagayan de Oro",
  "Next.js developer Philippines",
  "React Native developer Philippines",
  "Supabase developer",
  "freelance web developer Philippines",
  "WordPress developer Cagayan de Oro",
  "mobile app developer Philippines",
];

export const navItems: Link[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const heroWords = ["websites", "mobile apps", "admin portals", "automations"];

export const heroIntro: Segment[] = [
  { text: "Hi, I'm " },
  { text: "John Kyle Cuadra", hi: true },
  {
    text: ", a full-stack developer working with Next.js, React Native, and Supabase. I've been building and maintaining websites since 2021, and I currently manage ",
  },
  { text: "16 websites", hi: true },
  { text: " and " },
  { text: "20 domains", hi: true },
  { text: "." },
];

export const statusReadouts = [
  { label: "EDU", value: "BS IT · USTP" },
  { label: "OPS", value: "16 sites · 20 domains managed" },
  { label: "DSGN", value: "100+ design assets since 2019" },
];

export const bio: Segment[] = [
  { text: "I'm a " },
  { text: "full-stack developer and IT generalist", hi: true },
  {
    text: " from Cagayan de Oro. I build web and mobile products end to end: marketing sites, landing pages, cross-platform apps with Expo, admin portals, and Supabase backends with payments, email, and analytics wired in. Alongside that, I've managed WordPress and Wix sites, hosting, DNS, and SSL for clients. I work ",
  },
  { text: "AI-assisted with Claude Code and Codex", hi: true },
  { text: " and review every change before it ships." },
];

export const education = {
  degree: "BS Information Technology",
  school: "University of Science and Technology of Southern Philippines (USTP)",
  city: "Cagayan de Oro",
  years: "A.Y. 2024–2025",
};

export const beyondCode = [
  "City Scholar, Cagayan de Oro (2021–2025)",
  "Chapel Youth Leader Head (2021–2023)",
  "Parish Youth Executive Secretary (2022–2023)",
  "Volunteer tech support, PPCRV",
  "Freelance graphic designer since 2019",
];

export type Role = {
  title: string;
  /** Smaller mono suffix after the title, e.g. "(AI-Assisted Development)". */
  note?: string;
  org: string;
  dates: string;
  /** Current roles get a pulsing amber LED on the timeline. */
  current: boolean;
  chips: string[];
  summary: string;
};

export const roles: Role[] = [
  {
    title: "Full-Stack Developer",
    note: "(AI-Assisted Development)",
    org: "Khaylls Labs",
    dates: "Aug 2025 — Present",
    current: true,
    chips: ["Next.js", "Supabase", "Xendit", "GitHub Actions"],
    summary:
      "Builds and ships web apps with Claude Code and Codex, Supabase backends, GitHub Actions CI, and Vercel and Railway deploys, plus Resend email, Xendit payments, and Retool internal tools.",
  },
  {
    title: "IT Intern",
    org: "PhilHealth Regional Office X, Cagayan de Oro",
    dates: "Feb — May 2025",
    current: false,
    chips: ["PHP", "CodeIgniter", "Vue.js", "MySQL"],
    summary:
      "Web development with PHP, CodeIgniter, and Vue.js; MySQL and PostgreSQL data work; account access and LAN support.",
  },
  {
    title: "IT Virtual Assistant",
    note: "(Website & Hosting Support)",
    org: "Private Client · Remote",
    dates: "Feb 2024 — Present",
    current: true,
    chips: ["WordPress", "Bluehost", "cPanel", "DNS/SSL"],
    summary:
      "Manages 16 websites and 20 domains (WordPress, Bluehost, cPanel, DNS, SSL), restores infected or broken sites, and runs daily monitoring, updates, and backups.",
  },
  {
    title: "Wix Website Developer",
    org: "Freelance · Multiple clients",
    dates: "Feb 2024 — Dec 2025",
    current: false,
    chips: ["Wix", "SEO"],
    summary:
      "Responsive Wix sites with CMS, Bookings, Stores, and Automations; custom domains, SSL, SEO, and cross-device QA.",
  },
  {
    title: "Data Entry Specialist",
    note: "/ QA Support",
    org: "RedFlag AI · Berkeley, CA (Remote)",
    dates: "Sep 2023 — Oct 2024",
    current: false,
    chips: ["Python", "BeautifulSoup", "Jira"],
    summary:
      "Python and BeautifulSoup crawlers for 10+ sites that cut manual work by 70%; bug tracking in Jira; reporting in Google Sheets and PostgreSQL.",
  },
  {
    title: "Web Developer & IT Support",
    org: "Aelite Workforce Solutions · Remote",
    dates: "Apr 2023 — Dec 2025",
    current: false,
    chips: ["Figma", "Next.js", "Railway"],
    summary:
      "Designed layouts in Figma and built the SEO-optimized Aelite Talent Vault site, deployed and monitored on Railway.",
  },
  {
    title: "Web Development Associate",
    note: "/ IT Support",
    org: "BuzzLocal PH",
    dates: "Jun 2021 — Nov 2025",
    current: false,
    chips: ["WordPress", "Bluehost"],
    summary: "Maintained a WordPress eCommerce site on Bluehost for local Filipino entrepreneurs.",
  },
];

export const otherRoles = [
  { title: "Content Protection & Sales Support", org: "RedFlag AI" },
  { title: "Lead Research", org: "Aelite Business Consultancy" },
  { title: "Financial Account Representative", org: "Ubiquity Global Services" },
  { title: "Feature Content Writer", org: "Balthazar Guild and DAO" },
  { title: "Executive Support", org: "Macabalan Barangay Hall" },
];

export const marqueeRows = [
  [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Node.js",
    "Vercel",
    "Railway",
    "Docker",
    "GitHub Actions",
    "Expo",
  ],
  [
    "React Native",
    "WordPress",
    "Elementor",
    "Wix",
    "Figma",
    "Python",
    "PHP",
    "CodeIgniter",
    "Vue.js",
    "Xendit",
    "Resend",
    "Sentry",
  ],
];

export type StackCard = {
  code: string;
  title: string;
  /** Lit segments on the 3-segment meter. */
  level: 1 | 2 | 3;
  levelLabel: string;
  description: string;
  chips: string[];
  /** Columns spanned in the 6-column desktop bento grid. */
  span: 2 | 3 | 6;
};

export const stackCards: StackCard[] = [
  {
    code: "S01",
    title: "Frontend",
    level: 3,
    levelLabel: "Advanced",
    description: "Responsive, SEO-ready interfaces.",
    chips: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vue.js"],
    span: 3,
  },
  {
    code: "S02",
    title: "Mobile",
    level: 2,
    levelLabel: "Intermediate",
    description: "Cross-platform iOS and Android apps.",
    chips: ["React Native", "Expo", "Expo Router", "EAS Build", "React Navigation", "Reanimated", "TanStack Query"],
    span: 3,
  },
  {
    code: "S03",
    title: "Backend & Data",
    level: 2,
    levelLabel: "Intermediate",
    description: "Auth, data, and server logic.",
    chips: ["Supabase", "PostgreSQL", "MySQL", "Node.js", "Edge Functions", "PHP", "CodeIgniter", "Python", "Zod"],
    span: 2,
  },
  {
    code: "S04",
    title: "CMS & Builders",
    level: 3,
    levelLabel: "Advanced",
    description: "Client sites people can run themselves.",
    chips: ["WordPress", "Elementor", "Wix", "Yoast SEO", "WPForms", "Wordfence"],
    span: 2,
  },
  {
    code: "S05",
    title: "Hosting & DevOps",
    level: 3,
    levelLabel: "Advanced",
    description: "Deploys, domains, and keeping sites alive.",
    chips: ["Vercel", "Railway", "Docker", "GitHub Actions", "Bluehost", "cPanel", "DNS & SSL", "Sentry", "Turborepo"],
    span: 2,
  },
  {
    code: "S06",
    title: "Integrations",
    level: 2,
    levelLabel: "Intermediate",
    description: "Payments, email, data, and AI.",
    chips: ["Xendit", "Resend", "Google Sheets API", "GA4", "Claude API", "Passkeys", "BeautifulSoup", "Retool"],
    span: 2,
  },
  {
    code: "S07",
    title: "Workflow & Design",
    level: 3,
    levelLabel: "Advanced",
    description: "How I plan, build, and review.",
    chips: ["Git", "GitHub", "Claude Code", "Codex", "Claude Design", "Figma", "Canva", "Jira", "VS Code"],
    span: 6,
  },
];

/** A capture of the live site, with its pixel dimensions so the frame reserves the right space. */
export type Screenshot = { src: string; width: number; height: number };

export type Project = {
  slug: string;
  tag: string;
  title: string;
  domain: string;
  url: string;
  description: string;
  chips: string[];
  screenshot: Screenshot;
};

export const projects: Project[] = [
  {
    slug: "aelite",
    tag: "Client Work",
    title: "Aelite Talent Vault",
    domain: "aelite.biz",
    url: "https://aelite.biz",
    description:
      "Marketing site for Aelite Workforce Solutions' global talent platform — \"Global talent. Built for scale.\" — designed in Figma and built with Lottie animations, Vimeo embeds, and Resend email.",
    chips: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Turborepo", "Resend", "Docker", "Railway"],
    screenshot: { src: "/projects/aelite-enhanced.webp", width: 1710, height: 6000 },
  },
  {
    slug: "beautipoolr",
    tag: "Landing Page",
    title: "BeautiPoolr",
    domain: "beautipoolr.app",
    url: "https://beautipoolr.app",
    description:
      "Pre-launch landing page for BeautiPoolr, an upcoming platform for beauty and wellness professionals. Its pre-registration form saves sign-ups to Google Sheets and sends email notifications through Resend, with GA4 analytics.",
    chips: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Resend",
      "Google Sheets API",
      "Google Analytics",
      "Docker",
      "Railway",
    ],
    screenshot: { src: "/projects/beautipoolr-enhanced.webp", width: 1763, height: 1096 },
  },
  {
    slug: "homewise",
    tag: "Product Website",
    title: "HomeWise",
    domain: "homewise.khayll-labs.com",
    url: "https://homewise.khayll-labs.com",
    description:
      "Website for HomeWise, a house construction cost estimator app for the Philippines. Users plan a one-storey home, choose materials and finishes, and see preliminary material and labor costs. Includes scroll-reveal animations, FAQ structured data, and full SEO.",
    chips: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Lucide", "Vercel"],
    screenshot: { src: "/projects/homewise-enhanced.webp", width: 1626, height: 6000 },
  },
  {
    slug: "jacks-lemonade",
    tag: "Pro Bono",
    title: "Jack's Lemonade",
    domain: "jacks-lemonade.vercel.app",
    url: "https://jacks-lemonade.vercel.app",
    description:
      "Website for a family lemonade brand serving 30 fresh flavors at malls across Metro Manila, with an interactive menu of five flavor families and scroll effects.",
    chips: ["Next.js", "React", "TypeScript", "CSS", "Claude Design", "Vercel"],
    // Hero only: the site's animations made a full-page capture impossible.
    screenshot: { src: "/projects/jacks-lemonade-enhanced.webp", width: 1910, height: 872 },
  },
];
