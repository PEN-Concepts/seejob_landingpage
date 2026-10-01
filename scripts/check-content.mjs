// Content + SEO guard (CCPs 2026-10-01). Scans the BUILT site and fails the
// deploy if banned text ships, or if a prerendered page breaks the SEO rules.
// Run after `npm run build`:  node scripts/check-content.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.argv[2] || 'dist/seejobrun-web/browser';
let bad = 0;
const fail = (msg) => { console.error('✗ ' + msg); bad++; };

/* ── 1. Banned text anywhere (pages, JS, llms.txt, sitemap) ─────────────── */
const BANNED = [
  [/norholm\s+builders/i, 'old company name "Norholm Builders"'],
  [/\$\s?(19|29|59|199)(\.00)?\s*(\/|a |per )\s*mo/i, 'retired $19/$29/$59/$199 monthly price'],
  [/"price"\s*:\s*"(19|29|59|199)(\.00)?"/i, 'retired price in structured data'],
  [/bid\s*pro/i, 'retired "Bid Pro" plan'],
  [/\b(bronze|silver|gold|platinum)\s+(plan|tier)\b/i, 'retired Bronze/Silver/Gold/Platinum plan'],
  [/"@type"\s*:\s*"(AggregateRating|Review)"|"(aggregateRating|review)"\s*:/, 'Review / aggregateRating markup (not allowed)'],
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(html|js|txt|xml|json)$/.test(name)) yield p;
  }
}

for (const f of files(ROOT)) {
  const text = readFileSync(f, 'utf8');
  for (const [re, what] of BANNED) {
    const m = text.match(re);
    if (!m) continue;
    // JobTread really is $199/mo (sourced on /why-seejobrun) — allowed only next to its name.
    if (/199/.test(m[0])) {
      const at = m.index ?? 0;
      if (/jobtread/i.test(text.slice(Math.max(0, at - 400), at + 400))) continue;
    }
    fail(`${what} in ${f}: …${text.slice(Math.max(0, (m.index ?? 0) - 40), (m.index ?? 0) + 40).replace(/\s+/g, ' ')}…`);
  }
}

/* ── 1b. Google Search Console verification file — must ship, exactly (never delete) ── */
{
  const GSC = 'google3bbcb0b39bd64e2f.html';
  let body = null;
  try { body = readFileSync(join(ROOT, GSC), 'utf8'); } catch {}
  if (body === null) fail(`${GSC} is missing — Google Search Console verification would break`);
  else if (body.trim() !== 'google-site-verification: ' + GSC) fail(`${GSC} content changed: ${JSON.stringify(body.slice(0, 80))}`);
}

/* ── 2. Per-page SEO on every prerendered page ───────────────────────────── */
const attr = (tag, name) => { const m = tag.match(new RegExp(name + '="([^"]*)"')); return m ? m[1] : null; };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const titles = new Map();
const pages = [...files(ROOT)].filter((f) => f.endsWith('index.html'));
for (const f of pages) {
  const page = '/' + relative(ROOT, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  const head = (html.match(/<head>([\s\S]*?)<\/head>/) || ['', ''])[1];
  const title = decode((head.match(/<title>([^<]*)<\/title>/) || ['', ''])[1]);
  const metas = head.match(/<meta [^>]*>/g) || [];
  const meta = (k, v) => { const t = metas.find((m) => attr(m, k) === v); return t ? decode(attr(t, 'content') || '') : null; };
  const desc = meta('name', 'description');
  const canon = attr((head.match(/<link rel="canonical"[^>]*>/) || [''])[0], 'href');
  if (!title) fail(`${page}: no <title>`);
  else if (title.length >= 60) fail(`${page}: title ${title.length} chars (max 59): ${title}`);
  if (!desc) fail(`${page}: no meta description`);
  else if (desc.length >= 155) fail(`${page}: description ${desc.length} chars (max 154)`);
  if (titles.has(title)) fail(`${page}: same title as ${titles.get(title)}`); else titles.set(title, page);
  const expect = 'https://seejobrun.com' + page;
  if (canon !== expect) fail(`${page}: canonical is ${canon}, expected ${expect}`);
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url']) if (!meta('property', p)) fail(`${page}: missing ${p}`);
  if (meta('property', 'og:url') !== expect) fail(`${page}: og:url is ${meta('property', 'og:url')}`);
  const body = html.slice(html.indexOf('<body'));
  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${page}: ${h1} <h1> elements (need exactly 1)`);
  // A bare `alt` is how Angular prints alt="" (a decorative image) — that counts as present.
  for (const img of body.match(/<img\b[^>]*>/g) || []) if (!/\salt(=|[\s>/])/.test(img)) fail(`${page}: <img> without alt: ${img.slice(0, 90)}`);
  // Visible text (scripts removed, tags flattened) — FAQ schema must quote it exactly (Google rule).
  const visible = decode(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let ld;
    try { ld = JSON.parse(m[1]); } catch (e) { fail(`${page}: JSON-LD does not parse: ${e.message}`); continue; }
    if (ld['@type'] !== 'FAQPage') continue;
    for (const q of ld.mainEntity || []) {
      for (const t of [q.name, q.acceptedAnswer && q.acceptedAnswer.text]) {
        if (!t || !visible.includes(t.replace(/\s+/g, ' '))) fail(`${page}: FAQ schema text not visible on the page: ${String(t).slice(0, 80)}…`);
      }
    }
  }
  console.log(`  ${page.padEnd(28)} ${String(title.length).padStart(2)}/${String(desc ? desc.length : 0).padStart(3)}  ${title}`);
}

if (bad) { console.error(`content check FAILED (${bad})`); process.exit(1); }
console.log(`content check OK — ${pages.length} pages: unique titles, limits, canonical, OG, one H1, alt text, JSON-LD; no banned names or retired prices`);
