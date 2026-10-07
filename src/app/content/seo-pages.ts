/* ─────────────────────────────────────────────────────────────────────────────
 * PER-PAGE SEO — one title + description per route (CCP 2026-10-01, "AI-readable").
 * Titles < 60 chars, descriptions < 155 (scripts/check-content.mjs enforces both).
 * Canonical URLs carry the trailing slash: nginx 301s /pricing → /pricing/, and a
 * canonical must never point at a redirect.
 * ──────────────────────────────────────────────────────────────────────────── */

export const SITE = 'https://seejobrun.com';
export const DEFAULT_OG_IMAGE = SITE + '/images/screens/pic-track.png';

export interface PageSeo { path: string; title: string; description: string; ogImage?: string; }

export const SEO_PAGES: PageSeo[] = [
  {
    path: '/',
    title: 'See Job Run — Construction Management App for Contractors',
    description: 'Jobs, schedules, tasks, photos and crew in one app for small contractors. English & Spanish. From $69/mo, every feature, 60-day free trial.',
  },
  {
    path: '/pricing/',
    title: 'See Job Run Pricing — Plans from $69 a Month',
    description: 'Starter $69/mo (1–3 employees), Team $99 (up to 5), Crew $129 (up to 10). Every feature on every plan. Subs and clients free. 60-day free trial.',
    ogImage: SITE + '/images/screens/pic-cta.png',
  },
  {
    path: '/best-app-for-contractors/',
    title: 'Best App for Small General Contractors | See Job Run',
    description: 'How See Job Run compares with spreadsheets, group texts and enterprise tools: scheduling, tasks, photos and sub bids in one app from $69/month.',
  },
  {
    path: '/why-seejobrun/',
    title: 'Why See Job Run — More Features, Lower Price',
    description: 'See Job Run vs Procore, Buildertrend, Contractor Foreman and JobTread: features and published prices side by side, each with its source and date.',
    ogImage: SITE + '/images/screens/pic-cta.png',
  },
  {
    path: '/about/',
    title: 'About See Job Run — Built by a General Contractor',
    description: 'See Job Run was started by a general contractor with 30+ years on the job who was tired of losing notes and juggling job schedules.',
  },
  {
    path: '/contact/',
    title: 'Contact See Job Run — Questions, Demos and Support',
    description: 'Questions about See Job Run, a demo for your crew, or help getting set up? Send us a message and we will get right back to you.',
  },
  {
    path: '/features/',
    title: 'See Job Run Features — Jobs, Schedules, Tasks & Crew',
    description: 'Jobs and leads, drag-and-drop scheduling, tasks, time tracking, photos, documents, budgets and chat — every feature on every plan.',
  },
  {
    path: '/learn/',
    title: 'Learn See Job Run — How It Works',
    description: 'How See Job Run handles jobs, scheduling, time, crews and every project from start to finish.',
  },
  {
    path: '/privacy/',
    title: 'Privacy Policy | See Job Run',
    description: 'What See Job Run collects, why, who helps us run it, how long we keep it, and your choices. We do not sell or share your personal information.',
  },
  {
    path: '/terms/',
    title: 'Terms of Service | See Job Run',
    description: 'The agreement for using See Job Run: plans and billing, the free trial, cancelling, frozen accounts, your content and acceptable use.',
  },
];

/** The path as nginx serves it: '/' or '/name/'. */
export function canonicalPath(url: string): string {
  const p = (url || '/').split(/[?#]/)[0].replace(/\/+$/, '');
  return p ? p + '/' : '/';
}

export function seoFor(url: string): PageSeo {
  const p = canonicalPath(url);
  return SEO_PAGES.find((s) => s.path === p) || SEO_PAGES[0];
}
