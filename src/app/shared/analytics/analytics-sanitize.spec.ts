import { cleanEventParams, randomTransactionId, sanitizeLocation, sanitizePath, sanitizeReferrer } from './analytics-sanitize';

describe('GA4 privacy sanitizer', () => {
  it('removes query strings and hashes', () => {
    expect(sanitizePath('/pricing?email=bob@x.com&code=123#top')).toBe('/pricing');
    expect(sanitizePath('/open-item?task=88')).toBe('/open-item');
    expect(sanitizePath('')).toBe('/');
    expect(sanitizePath(null)).toBe('/');
  });

  it('replaces share tokens and invite codes, whatever they look like', () => {
    expect(sanitizePath('/i/abc')).toBe('/i/:token');
    expect(sanitizePath('/i/Xy7kQ2pLmN')).toBe('/i/:token');
    expect(sanitizePath('/invite/hello')).toBe('/invite/:token');
    expect(sanitizePath('/quote-preview/8f2c1d9e')).toBe('/quote-preview/:token');
    expect(sanitizePath('/invoice-preview/zzz')).toBe('/invoice-preview/:token');
    expect(sanitizePath('/change-orders/public/abcDEF123')).toBe('/change-orders/public/:token');
  });

  it('replaces numeric ids, uuids, long hex and base64-ish segments', () => {
    expect(sanitizePath('/invoice/145/9')).toBe('/invoice/:id/:id');
    expect(sanitizePath('/m/jobs/145')).toBe('/m/jobs/:id');
    expect(sanitizePath('/x/3f2504e0-4f89-11d3-9a0c-0305e82c3301')).toBe('/x/:id');
    expect(sanitizePath('/x/a3f9c2d4e5b6a7c8')).toBe('/x/:token');
    expect(sanitizePath('/x/eyJhbGciOiJIUzI1NiJ9')).toBe('/x/:token');
    expect(sanitizePath('/m/chat/dm-12-34')).toBe('/m/chat/:token');
    expect(sanitizePath('/x/bob%40example.com')).toBe('/x/:email');
    expect(sanitizePath('/x/John%20Smith')).toBe('/x/:token');
  });

  it('keeps ordinary route names', () => {
    for (const p of ['/', '/pricing', '/why-seejobrun', '/m/home', '/checklist3', '/spartan-day', '/force-password-reset', '/master-billing', '/user-dashboard/m/jobs']) {
      expect(sanitizePath(p)).toBe(p);
    }
  });

  it('drops matrix params and handles absolute urls', () => {
    expect(sanitizePath('/m/jobs;id=7')).toBe('/m/jobs');
    expect(sanitizePath('https://seejobrun.com/i/abc?x=1')).toBe('/i/:token');
  });

  it('builds page_location from origin + base + clean path', () => {
    expect(sanitizeLocation('https://seejobrun.com', '/user-dashboard/', '/quote-preview/tok?e=a@b.c'))
      .toBe('https://seejobrun.com/user-dashboard/quote-preview/:token');
    expect(sanitizeLocation('https://seejobrun.com', '/', '/pricing?utm=x')).toBe('https://seejobrun.com/pricing');
  });

  it('cuts foreign referrers to their origin and cleans our own', () => {
    expect(sanitizeReferrer('https://www.google.com/search?q=bob', 'https://seejobrun.com')).toBe('https://www.google.com/');
    expect(sanitizeReferrer('https://seejobrun.com/i/abc?x=1', 'https://seejobrun.com')).toBe('https://seejobrun.com/i/:token');
    expect(sanitizeReferrer('', 'https://seejobrun.com')).toBe('');
    expect(sanitizeReferrer('not a url', 'https://seejobrun.com')).toBe('');
  });

  it('keeps only allow-listed event fields — never names, emails, phones, ids', () => {
    const out = cleanEventParams('sign_up', {
      method: 'email', plan: 'Starter', email: 'bob@x.com', name: 'Bob', user_id: 7, phone: '8055551234',
    });
    expect(out).toEqual({ method: 'email', plan: 'Starter' });
    expect(cleanEventParams('purchase', { plan: 'bob@x.com', value: 69, currency: 'USD', card: '4111' }))
      .toEqual({ value: 69, currency: 'USD' });
    expect(cleanEventParams('demo_click', { location: '8055551234' })).toEqual({});
    expect(cleanEventParams('unknown_event', { a: 1 })).toBeNull();
  });

  it('makes an opaque transaction id that survives the filter', () => {
    const id = randomTransactionId();
    expect(id).toMatch(/^sjr-[a-z0-9]+$/);
    expect(cleanEventParams('purchase', { transaction_id: id })).toEqual({ transaction_id: id });
  });
});
