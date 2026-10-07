/**
 * JSON-LD structured-data objects used across the marketing site.
 * Injected per-page via JsonLdComponent so each schema lands only where its
 * matching content is visible (Google requires FAQ schema to match the page).
 */

const QA = (question: string, answer: string) => ({
  '@type': 'Question',
  name: question,
  acceptedAnswer: { '@type': 'Answer', text: answer },
});

/** Home page FAQ — mirrors the visible Q&A in home.component.html. */
export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    QA(
      'What is See Job Run?',
      'See Job Run is construction management software for independent general contractors and small crews. It puts job scheduling, task assignments, time tracking, job-site photos, documents, chat, and daily production reports in one app you can use on your phone, tablet, or computer.',
    ),
    QA(
      'Who is See Job Run for?',
      'See Job Run is built for small and independent general contractors, remodelers, and custom-home builders who run their own crews and subcontractors. It\'s designed to replace scattered spreadsheets, group texts, and paper with one organized system.',
    ),
    QA(
      'How much does See Job Run cost?',
      'See Job Run is priced by team size, with every feature on every plan: Starter $69/month (1–3 employees), Team $99/month (up to 5), and Crew $129/month (up to 10), plus $15 a month for each employee over 10. Subcontractors and clients are always free, and every plan starts with a 60-day free trial, no credit card needed.',
    ),
    QA(
      'Does See Job Run work in Spanish?',
      'Yes. See Job Run runs in both English and Spanish. Each user picks English or Spanish for the whole app.',
    ),
    QA(
      'What devices does See Job Run work on?',
      'See Job Run works in the web browser on any phone, tablet or computer. Your jobs, schedule, photos and documents stay in sync across every device.',
    ),
    QA(
      'Can subcontractors use See Job Run for free?',
      'Yes. Subcontractors and clients you add to your jobs use See Job Run for free. Managing your own jobs is part of the paid plans.',
    ),
    QA(
      'How is See Job Run different from spreadsheets or group texts?',
      'See Job Run keeps every job\'s schedule, tasks, photos, and documents in one organized place instead of scattered across spreadsheets, texts, and email. Everyone on the job sees the latest plan, so nothing gets lost or double-handled.',
    ),
  ],
};

/** Comparison page FAQ. */
export const COMPARE_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    QA(
      'What is the best app for a small general contractor?',
      'The best app for a small general contractor combines job scheduling, task tracking, time, photos, documents, and crew chat in a single tool that works on the phone and the desktop. See Job Run was built specifically for independent GCs and small crews, from $69/month with every feature included, with English and Spanish built in.',
    ),
    QA(
      'How is See Job Run different from Buildertrend, Procore, or CoConstruct?',
      'See Job Run is built for small and independent contractors, not large builders, so it\'s simpler and far less expensive than enterprise tools like Procore, Buildertrend, or CoConstruct. It focuses on the day-to-day a small GC actually needs — scheduling, tasks, time, photos, and chat — without per-project pricing or long onboarding.',
    ),
    QA(
      'Is See Job Run better than running my jobs on spreadsheets and texts?',
      'Spreadsheets and group texts scatter your schedule, photos, and notes across different places where things get lost. See Job Run keeps every job in one organized place the whole crew can see, so the latest plan, tasks, and documents are always in one spot.',
    ),
  ],
};

/* ── Organization + SoftwareApplication (CCP 2026-10-01). Prices come from TIERS,
 *    the one place they live. NO aggregateRating / Review markup, by rule. ── */
import { TIERS } from '../content/why-seejobrun-content';

const SITE = 'https://seejobrun.com';
const LOGO = SITE + '/app-icon-512.png';

const SEATS: Record<string, string> = { Starter: '1–3 employees', Team: 'Up to 5 employees', Crew: 'Up to 10 employees' };

export const ORG_SCHEMA = {
  '@type': 'Organization',
  '@id': SITE + '/#organization',
  name: 'See Job Run',
  legalName: 'PEN Concepts, Inc.',
  url: SITE + '/',
  logo: LOGO,
  email: 'admin@oakcoast.net',
};

const OFFERS = TIERS.map((t) => {
  const price = t.price.replace(/[^0-9.]/g, '');
  return {
    '@type': 'Offer',
    name: t.name,
    description: (SEATS[t.name] || t.users) + ' · every feature · 60-day free trial, no credit card',
    price: Number(price).toFixed(2),
    priceCurrency: 'USD',
    url: SITE + '/pricing/',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: Number(price).toFixed(2),
      priceCurrency: 'USD',
      unitText: 'MONTH',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
    },
  };
});

export const APP_SCHEMA = {
  '@type': 'SoftwareApplication',
  '@id': SITE + '/#software',
  name: 'See Job Run',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: SITE + '/',
  description:
    'Construction management software for independent general contractors and small crews: jobs, scheduling, tasks, ' +
    'time, photos, documents, budgets, invoices and change orders in one app, in English and Spanish.',
  inLanguage: ['en', 'es'],
  publisher: { '@id': SITE + '/#organization' },
  offers: OFFERS,
};

export const VIDEO_SCHEMA = {
  '@type': 'VideoObject',
  name: 'See Job Run — Run every job from one place',
  description: 'A 30-second overview of See Job Run: jobs, tasks, scheduling, photos, documents, and reports for contractors, on every device, in English & Spanish.',
  thumbnailUrl: SITE + '/videos/promo-poster.png',
  contentUrl: SITE + '/videos/seejobrun-promo.mp4',
  uploadDate: '2026-06-23',
  publisher: { '@id': SITE + '/#organization' },
};

/** Home: Organization + SoftwareApplication (+ the promo video). */
export const HOME_SCHEMA = { '@context': 'https://schema.org', '@graph': [ORG_SCHEMA, APP_SCHEMA, VIDEO_SCHEMA] };
/** /pricing: the app and its three offers. */
export const PRICING_SCHEMA = { '@context': 'https://schema.org', '@graph': [ORG_SCHEMA, APP_SCHEMA] };
