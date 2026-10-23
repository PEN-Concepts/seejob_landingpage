/**
 * Google Analytics privacy filter (GA4, G-R1Y0C7BVKM).
 *
 * Nothing that identifies a person may reach Google: no query strings (they
 * carry tokens, codes, emails), no share tokens / invite codes, no record ids,
 * no emails. Every page path goes through sanitizePath() before it is sent.
 *
 * Kept identical in the landing site and the app (src/app/shared/analytics/).
 */

/** A segment right after one of these is always a secret (share token, invite
 *  code, signing link…), whatever it looks like. */
const TOKEN_AFTER = new Set([
  'i', 'invite', 'invites', 'quote-preview', 'invoice-preview', 'public', 'sign', 'esign', 'e-sign',
  'reset', 'reset-password', 'verify', 'token', 'share', 'accept', 'unsubscribe', 'otp',
]);

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LONG_HEX = /^[0-9a-f]{12,}$/i;
const TOKENISH = /^[A-Za-z0-9_\-.~=+%]+$/;

function safeDecode(s: string): string {
  try { return decodeURIComponent(s); } catch { return s; }
}

/** One path segment → itself, or a placeholder if it could identify someone. */
export function sanitizeSegment(raw: string, prev: string | null): string {
  const seg = safeDecode(raw.split(';')[0]); // drop Angular matrix params (;a=b)
  if (!seg) return seg;
  if (prev !== null && TOKEN_AFTER.has(prev.toLowerCase())) return ':token';
  if (seg.includes('@')) return ':email';
  if (/^\d+$/.test(seg)) return ':id';
  if (UUID.test(seg)) return ':id';
  if (LONG_HEX.test(seg)) return ':token';
  if (seg.length >= 32) return ':token';
  if (!TOKENISH.test(seg)) return ':token'; // spaces, unicode, punctuation → not a route name
  const digits = (seg.match(/\d/g) || []).length;
  if (seg.length >= 16 && digits > 0) return ':token';
  const mixedCase = /[a-z]/.test(seg) && /[A-Z]/.test(seg);
  if (seg.length >= 8 && (digits >= 2 || (mixedCase && digits >= 1))) return ':token';
  return seg;
}

/** '/quote-preview/abc123?x=1#y' → '/quote-preview/:token'. Always starts with '/'. */
export function sanitizePath(url: string | null | undefined): string {
  let path = String(url || '/');
  // Absolute URL? keep only the path.
  const abs = /^[a-z][a-z0-9+.-]*:\/\/[^/?#]*/i.exec(path);
  if (abs) path = path.slice(abs[0].length) || '/';
  path = path.split(/[?#]/)[0] || '/';
  if (!path.startsWith('/')) path = '/' + path;
  const raw = path.split('/');
  const out: string[] = [];
  for (let i = 0; i < raw.length; i++) {
    out.push(i === 0 ? '' : sanitizeSegment(raw[i], i > 1 ? safeDecode(raw[i - 1].split(';')[0]) : null));
  }
  const clean = out.join('/') || '/';
  return clean.length > 300 ? clean.slice(0, 300) : clean;
}

/** Full page_location: origin + base path + sanitized route path. */
export function sanitizeLocation(origin: string, basePath: string, routeUrl: string): string {
  const base = String(basePath || '/').replace(/\/+$/, '');
  return String(origin || '') + base + sanitizePath(routeUrl);
}

/** Referrer: our own pages are sanitized; anyone else's is cut to its origin. */
export function sanitizeReferrer(ref: string | null | undefined, ownOrigin: string): string {
  if (!ref) return '';
  try {
    const u = new URL(ref);
    if (u.origin === ownOrigin) return u.origin + sanitizePath(u.pathname);
    return u.origin + '/';
  } catch {
    return '';
  }
}

/** The only events we send, and the only fields each may carry. Anything else
 *  (names, emails, phones, addresses, card data, user ids) is dropped. */
export const ALLOWED_EVENT_FIELDS: Readonly<Record<string, readonly string[]>> = {
  sign_up: ['method', 'plan'],
  begin_checkout: ['plan', 'value', 'currency'],
  purchase: ['plan', 'value', 'currency', 'transaction_id'],
  app_store_click: ['store', 'location'],
  demo_click: ['location'],
};

/** Keep only allow-listed keys with short, non-identifying primitive values. */
export function cleanEventParams(name: string, params: Record<string, unknown> | null | undefined): Record<string, string | number> | null {
  const allowed = ALLOWED_EVENT_FIELDS[name];
  if (!allowed) return null;
  const out: Record<string, string | number> = {};
  for (const key of allowed) {
    const v = params ? params[key] : undefined;
    if (typeof v === 'number' && isFinite(v)) out[key] = Math.round(v * 100) / 100;
    else if (typeof v === 'string' && v.length > 0 && v.length <= 40 && !v.includes('@') && (key === 'transaction_id' || !/\d{7,}/.test(v))) out[key] = v;
  }
  return out;
}

/** Opaque, random, non-identifying id for purchase.transaction_id. */
export function randomTransactionId(): string {
  try {
    const c: any = (globalThis as any).crypto;
    if (c && typeof c.getRandomValues === 'function') {
      const a = new Uint32Array(2);
      c.getRandomValues(a);
      return 'sjr-' + a[0].toString(36) + a[1].toString(36);
    }
  } catch { /* fall through */ }
  return 'sjr-' + Math.random().toString(36).slice(2, 12);
}
