/* ─────────────────────────────────────────────────────────────────────────────
 * EDITABLE MARKETING CONTENT for the "Why See Job Run" / Pricing page.
 *
 * ⚠️  COMPETITOR FIGURES ARE PLACEHOLDERS — VERIFY BEFORE GO-LIVE.
 *     Procore and Buildertrend prices are ESTIMATES (estimate: true) and read as
 *     estimates on the page ("est."). Every competitor price/mark lives here so it
 *     can be corrected without touching the component. Never present an estimate as exact.
 *
 * ⚠️  IN-BUILD FEATURES are hidden by default. The mockup shows "Client view control"
 *     and "Weekly client view", but they are NOT live yet, so per the content
 *     guardrail they stay OFF the published page (nothing unshipped shown as a live
 *     check). Flip SHOW_IN_BUILD to true once shipped, or 'coming-soon' to show them
 *     with a "Coming soon" badge instead.
 * ──────────────────────────────────────────────────────────────────────────── */

export const VERIFY_BEFORE_GO_LIVE = true;

/** false → hidden (default) · 'coming-soon' → shown with a badge, never a live check · true → live (only once shipped) */
export const SHOW_IN_BUILD: false | true | 'coming-soon' = false;

/* ── Hero ─────────────────────────────────────────────────────────────────── */
export const HERO = {
  eyebrow: 'WHY SEEJOBRUN',
  headline: 'More features. Lower price. Easier to use.',
  redSubline: 'Why go anywhere else?',
  supporting:
    'Everything the big platforms do — at a price you can actually see. One price by ' +
    'team size, everything included, cancel anytime.',
};

/* ── Tier cards ───────────────────────────────────────────────────────────── */
export const TIERS_HEADER = {
  eyebrow: 'PRICING',
  headline: 'One simple price. Every feature.',
  sub:
    "Priced by the size of your team — not by which features you're allowed to use. " +
    "Everything's included on every plan. Try it free for 60 days.",
};
export interface Tier { name: string; price: string; per: string; users: string; badge?: string; cta: string; }
export const TIERS: Tier[] = [
  { name: 'Starter', price: '$69',  per: '/mo', users: '1–3 employees',    cta: 'Start 60-day free trial' },
  { name: 'Team',    price: '$99',  per: '/mo', users: 'Up to 5 employees', badge: 'Most Popular', cta: 'Start 60-day free trial' },
  { name: 'Crew',    price: '$129', per: '/mo', users: 'Up to 10 employees', cta: 'Start 60-day free trial' },
];
export const TIERS_NOTE =
  'More than 10? Just +$15/employee a month. Employees are your billable seats — subcontractors and clients connect free.';
export const TIER_CHIPS = [
  'All features included', 'Free subcontractor access', 'Free client portal', '60-day free trial', 'No setup fee',
];

/* ── Win comparison table ─────────────────────────────────────────────────── */
// Uniform price cell: monthly on top, "annual · term" beneath. estimate → "est." on
// the monthly line. Column order matches the mockup: See Job Run, Procore,
// Buildertrend, Contractor Foreman, JobTread.
export interface PriceCell { monthly: string; annual: string; term: string; estimate?: boolean; }
export interface CompareCol { key: string; label: string; highlight?: boolean; price: PriceCell; }
export const PRICE_ROW_LABEL = 'PRICE (3 USERS)';
export const COMPARE_COLS: CompareCol[] = [
  { key: 'sjr',     label: 'SeeJobRun',          highlight: true,
    price: { monthly: '$69/mo',    annual: '$828/yr',    term: 'month-to-month' } },
  { key: 'procore', label: 'Procore',
    price: { monthly: '$375+/mo',  annual: '$4,500+/yr', term: 'annual contract', estimate: true } },
  { key: 'bt',      label: 'Buildertrend',
    price: { monthly: '$199+/mo',  annual: '$2,388+/yr', term: 'annual contract', estimate: true } },
  { key: 'cf',      label: 'Contractor Foreman',
    price: { monthly: '$105/mo',   annual: '$1,264/yr',  term: 'billed annually' } },
  { key: 'jt',      label: 'JobTread',
    price: { monthly: '$199+/mo',  annual: '$2,388+/yr', term: 'monthly ok' } },
];

// 'check' → green tick · 'bar' → red bar · any other string → shown as small text.
// Ordered most-red-at-top. inBuild rows hidden unless SHOW_IN_BUILD is enabled.
export type Mark = 'check' | 'bar' | string;
export interface WinRow { label: string; cells: Record<string, Mark>; inBuild?: boolean; }
export const WIN_ROWS: WinRow[] = [
  { label: 'CHAT & CALLING',      cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'bar', jt: 'bar' } },
  { label: 'CLIENT VIEW CONTROL', inBuild: true, cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'bar', jt: 'bar' } },
  { label: 'WEEKLY CLIENT VIEW',  inBuild: true, cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'bar', jt: 'bar' } },
  { label: 'PROGRESS TRACKING',   cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'bar', jt: 'bar' } },
  { label: 'MONTH-TO-MONTH',      cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'bar', jt: 'check' } },
  { label: 'FREE TRIAL',          cells: { sjr: '60 days', procore: 'bar', bt: 'bar', cf: '30 days', jt: '30-day money-back' } },
  { label: 'TRANSPARENT PRICING', cells: { sjr: 'check', procore: 'bar', bt: 'bar', cf: 'check', jt: 'check' } },
  { label: 'FREE SUBS & CLIENTS', cells: { sjr: 'check', procore: 'check', bt: 'check', cf: 'bar', jt: 'check' } },
  { label: 'ALL FEATURES',        cells: { sjr: 'check', procore: 'Bundled', bt: 'Tiered', cf: 'Tiered', jt: 'check' } },
  { label: 'DRAG-DROP SCHEDULER', cells: { sjr: 'check', procore: 'Std Gantt', bt: 'Std Gantt', cf: 'Std Gantt', jt: 'Std Gantt' } },
  { label: 'JOB PHOTOS',          cells: { sjr: 'check', procore: 'check', bt: 'check', cf: 'Add-on $', jt: 'check' } },
];

/* ── "Apps you can cancel" callout ────────────────────────────────────────── */
// E-sign copy stays generic (no "no DocuSign account needed" claim).
export const CALLOUT = {
  lead:
    'Still running jobs on spreadsheets, group texts, and a truck full of paper — or paying for ' +
    'CompanyCam ($129/mo) for photos and DocuSign ($30/user) just for signatures?',
  punch: 'SeeJobRun replaces the whole juggling act — photos, e-signatures, and everything else — for $69/mo.',
};

/* ── All-features section ("And it's all included — on every plan") ────────── */
export const FEATURES_HEADER = {
  title: "And it's all included — on every plan",
  sub: 'No tiers, no add-ons. Every plan gets all of it.',
};
export interface FeatureGroup { title: string; items: string[] }
export const FEATURE_GROUPS: FeatureGroup[] = [
  { title: 'JOBS & MONEY', items: ['Leads & jobs', 'Contacts', 'Estimates & budgets', 'Budget export', 'Invoicing', 'Change orders', 'E-signatures', 'Reports'] },
  { title: 'SCHEDULE & FIELD', items: ['Drag-drop schedule', 'Master calendar', 'Daily logs', 'Time tracking', 'Tasks', 'Stages & % done'] },
  { title: 'DOCS & MEDIA', items: ['Documents', 'Full plan sets', 'Job photos', 'Materials'] },
  { title: 'PEOPLE', items: ['Employees & team', 'Free subs & clients', 'Client portal', 'Mobile app', 'Chat & calling', 'Push & email alerts'] },
];

/* ── Closing CTA band ─────────────────────────────────────────────────────── */
export const CTA_BAND = {
  line: 'Start your 60-day free trial — $69/mo, cancel anytime.',
  sub: 'No quote to chase. No feature you pay extra to unlock. No pile of add-on apps to juggle.',
  button: 'Start 60-day free trial',
  href: 'https://seejobrun.com/user-dashboard/',
};

/** On-page footnote — estimates + verification disclaimer (content-review requirement). */
export const FOOTNOTE =
  'Prices for a 3-person team; Procore & Buildertrend quote privately (estimates). ' +
  'CompanyCam = Crew plan (3 users); DocuSign Standard, per user — both billed annually. ' +
  'Figures to be verified before publishing.';
