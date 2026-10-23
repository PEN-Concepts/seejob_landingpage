import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { AnalyticsService, GA_MEASUREMENT_ID } from './analytics.service';

@Component({ template: '', standalone: true })
class BlankComponent {}

const FORBIDDEN_KEYS = ['email', 'name', 'first_name', 'last_name', 'phone', 'mobile', 'address', 'user_id', 'userId', 'card', 'card_number'];

describe('AnalyticsService (GA4)', () => {
  let calls: unknown[][];
  let router: Router;
  let svc: AnalyticsService;

  beforeEach(() => {
    calls = [];
    (window as any).gtag = (...args: unknown[]) => calls.push(args);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: BlankComponent },
          { path: 'pricing', component: BlankComponent },
          { path: 'i/:code', component: BlankComponent },
          { path: 'quote-preview/:token', component: BlankComponent },
        ]),
      ],
    });
    router = TestBed.inject(Router);
    svc = TestBed.inject(AnalyticsService);
  });

  afterEach(() => { delete (window as any).gtag; });

  const pageViews = () => calls.filter((c) => c[0] === 'event' && c[1] === 'page_view');

  it('sends exactly one page_view per navigation, with no automatic page_view', async () => {
    svc.start();
    svc.start(); // a second start must not double-subscribe
    await router.navigateByUrl('/pricing?email=bob@x.com');
    await router.navigateByUrl('/i/Xy7kQ2pLmN');
    expect(pageViews().length).toBe(2);
    // every config call keeps GA's own page_view switched off
    const configs = calls.filter((c) => c[0] === 'config');
    expect(configs.length).toBe(2);
    for (const c of configs) {
      expect(c[1]).toBe(GA_MEASUREMENT_ID);
      expect((c[2] as any).send_page_view).toBe(false);
    }
  });

  it('page_view carries only the sanitized path — no tokens, codes or query strings', async () => {
    svc.start();
    await router.navigateByUrl('/quote-preview/secret-token-abc123?email=bob@x.com');
    const pv = pageViews()[0][2] as any;
    expect(pv.page_path).toBe('/quote-preview/:token');
    expect(pv.page_location).toMatch(/\/quote-preview\/:token$/);
    const sent = JSON.stringify(calls);
    expect(sent).not.toContain('secret-token');
    expect(sent).not.toContain('bob@x.com');
    expect(sent).not.toContain('?');
  });

  const cases: [string, Record<string, unknown>, Record<string, unknown>][] = [
    ['sign_up', { method: 'email', plan: 'trial', email: 'a@b.c', name: 'Bob' }, { method: 'email', plan: 'trial' }],
    ['begin_checkout', { plan: 'Starter', value: 69, currency: 'USD', user_id: 9 }, { plan: 'Starter', value: 69, currency: 'USD' }],
    ['purchase', { plan: 'Team', value: 99, currency: 'USD', transaction_id: 'sjr-abc', phone: '8055551234' }, { plan: 'Team', value: 99, currency: 'USD', transaction_id: 'sjr-abc' }],
    ['app_store_click', { store: 'apple', location: 'home', address: '1 Main St' }, { store: 'apple', location: 'home' }],
    ['demo_click', { location: 'home', first_name: 'Bob' }, { location: 'home' }],
  ];
  for (const [name, params, expected] of cases) {
    it(`${name} fires with only its allowed fields`, () => {
      svc.track(name, params);
      expect(calls.length).toBe(1);
      expect(calls[0][0]).toBe('event');
      expect(calls[0][1]).toBe(name);
      expect(calls[0][2]).toEqual(expected);
      for (const k of FORBIDDEN_KEYS) expect(Object.keys(calls[0][2] as object)).not.toContain(k);
    });
  }

  it('does nothing and throws nothing when gtag is missing (GA blocked)', async () => {
    delete (window as any).gtag;
    svc.start();
    await router.navigateByUrl('/pricing');
    expect(() => svc.track('demo_click', { location: 'home' })).not.toThrow();
    expect(() => svc.pageView('/x')).not.toThrow();
  });

  it('swallows a gtag that throws', () => {
    (window as any).gtag = () => { throw new Error('blocked'); };
    expect(() => svc.track('sign_up', { method: 'email' })).not.toThrow();
    expect(() => svc.pageView('/pricing')).not.toThrow();
  });

  it('ignores events that are not on the list', () => {
    svc.track('login', { email: 'a@b.c' });
    expect(calls.length).toBe(0);
  });
});
