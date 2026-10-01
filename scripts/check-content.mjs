// Content guard (CCP 2026-10-01). Scans the BUILT site and fails if any banned
// text ships: the old company name, or a retired price/plan.
// Run after `npm run build`:  node scripts/check-content.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.argv[2] || 'dist/seejobrun-web/browser';
const BANNED = [
  [/norholm\s+builders/i, 'old company name "Norholm Builders"'],
  [/\$\s?29\s*(\/|a |per )\s*mo/i, 'retired $29/month price'],
  [/\$\s?19\s*(\/|a |per )\s*mo/i, 'retired $19/month Bid Pro price'],
  [/\$\s?(59|199)\s*(\/|a |per )\s*mo(?!.*jobtread)/i, 'retired $59/$199 plan price'],
  [/bid\s*pro/i, 'retired "Bid Pro" plan'],
];

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* files(p);
    else if (/\.(html|js|txt|xml|json)$/.test(name)) yield p;
  }
}

let bad = 0;
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
    console.error(`✗ ${what} in ${f}: …${text.slice(Math.max(0, (m.index ?? 0) - 40), (m.index ?? 0) + 40).replace(/\s+/g, ' ')}…`);
    bad++;
  }
}
if (bad) { console.error(`content check FAILED (${bad})`); process.exit(1); }
console.log('content check OK — no banned names or retired prices in ' + ROOT);
