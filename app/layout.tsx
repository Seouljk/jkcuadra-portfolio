import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { education, seoKeywords, site, siteUrl, stackCards } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

// No metric-adjusted Arial fallback here: glyphs JetBrains Mono doesn't ship (→, ↗, ✕) should fall back to the
// system monospace font, as they do in the design.
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "monospace"],
});

const TITLE = `${site.name} — ${site.role}`;
// Search Console's "HTML tag" verification code. Unneeded if the domain is verified through DNS instead.
const GOOGLE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const DESCRIPTION =
  "Full-stack web and mobile developer in Cagayan de Oro, Philippines, building and shipping products with Next.js, React Native and Supabase since 2021.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: TITLE, template: `%s · ${site.name}` },
  description: DESCRIPTION,
  keywords: seoKeywords,
  applicationName: site.handle,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

/**
 * Structured data so search engines can attribute the site to a person rather than guessing.
 * `sameAs` is what links this page to the GitHub and LinkedIn profiles in Google's knowledge graph.
 */
function structuredData() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: site.name,
    url: siteUrl,
    image: `${siteUrl}/portrait.png`,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    telephone: site.phone.href.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cagayan de Oro",
      addressRegion: "Misamis Oriental",
      addressCountry: "PH",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: stackCards.flatMap((card) => card.chips),
    sameAs: [site.github.href, site.linkedin.href],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: TITLE,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Built from our own constants, so there is no untrusted input to escape.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </body>
    </html>
  );
}
