# jkcuadra — portfolio

John Kyle Cuadra's portfolio, built from the "Matte Lab" Claude Design (project *John Kyle Cuadra Portfolio*, file `Portfolio.dc.html`).

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Scripts

- `npm run dev`: local dev server at http://localhost:3000
- `npm run build`, then `npm start`: production build and server
- `npm run lint`: ESLint

## Where things live

- `lib/content.ts`: all copy and data on the page.
- `app/globals.css`: design tokens, the design's keyframes, component styles, and the mobile layout (below 1100px).
- `components/`: one file per section, plus small client pieces for motion (live clock, word scramble, cursor spotlight).

## Assets

- Portrait: `public/portrait.png` (transparent cut-out, 2:3) → `site.portrait`
- Project screenshots: `public/projects/` → each project's `screenshot`, with its pixel dimensions

Jack's Lemonade is a hero-only capture, since the site's animations prevented a full-page shot. The frame
covers a screenshot shorter than itself rather than scrolling it, so that case needs no special handling.

## Stack logos

`lib/tech-icons.ts` maps each label in the Stack section to a single-colour logo, drawn in the text
colour so it follows the chip's amber hover. **When you add a chip in `lib/content.ts`, add its logo
there too** — a label with no entry still renders, just without a logo.

Most logos come from [simple-icons](https://simpleicons.org) (CC0). Brands it no longer carries come
from [Material Design Icons](https://pictogrammers.com/library/mdi/) (VS Code; Apache-2.0),
[CoreUI Brands](https://coreui.io/icons/brands/) (Canva; CC0) and [Remix Icon](https://remixicon.com)
(OpenAI, shown for Codex; Apache-2.0). Items with no openly licensed logo borrow their parent
platform's (WPForms and Wordfence show WordPress, BeautifulSoup shows Python) or use a generic Material
Design glyph (Bluehost, DNS & SSL, Passkeys). All logos are trademarks of their respective owners.

The icons render only in server components, so none of simple-icons' ~3,400 logos reach the browser
bundle. Keep `components/TechIcon.tsx` out of client components to preserve that.

## Contact form

`POST /api/contact` validates the submission, then sends it through [Resend](https://resend.com) to
`CONTACT_TO_EMAIL`, with `Reply-To` set to the sender so replying goes straight back to them. The
notification email is built in `lib/email.ts`.

Guards: every field is re-validated and length-capped server-side, all interpolation into the email
is HTML-escaped, a hidden `company` field traps bots, and one IP is limited to 5 messages per 10
minutes (best-effort — serverless instances do not share the counter).

Copy `.env.example` to `.env.local` and fill it in; set the same variables in the Vercel project.
Without `RESEND_API_KEY` the route answers 503 and the form shows the failure inline.

## SEO

- `app/layout.tsx`: titles, description, keywords, canonical, Open Graph and Twitter cards, and
  JSON-LD (`Person` + `WebSite` + `ProfilePage`) so search engines attribute the site to a person.
- `app/sitemap.ts` and `app/robots.ts` — `/api/` is disallowed.
- `app/opengraph-image.tsx` and `app/icon.tsx` are generated at build time, so there is no static
  social card or favicon to keep in sync.

Canonical URLs come from `siteUrl` in `lib/content.ts`: `NEXT_PUBLIC_SITE_URL` if set, otherwise
Vercel's production domain, which is the custom domain once one is assigned. It is read at build
time, so redeploy after changing domains.

After deploying, verify the site in [Google Search Console](https://search.google.com/search-console)
and submit `/sitemap.xml`. A DNS TXT record needs no code; for the HTML-tag method, put the code in
`GOOGLE_SITE_VERIFICATION`.
