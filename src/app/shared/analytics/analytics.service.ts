import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { cleanEventParams, sanitizeLocation, sanitizePath, sanitizeReferrer } from './analytics-sanitize';

export const GA_MEASUREMENT_ID = 'G-R1Y0C7BVKM';

/**
 * Google Analytics 4. The gtag snippet in index.html loads with
 * send_page_view:false; this service sends one page_view per router navigation
 * with a SANITIZED path (see analytics-sanitize.ts), plus a few named events.
 *
 * Never throws and never breaks the page: if GA is blocked (ad blocker, DNS
 * filter) or not loaded (server prerender), every call is a silent no-op.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private started = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  /** Call once from the root component. */
  start(): void {
    if (this.started || !isPlatformBrowser(this.platformId)) return;
    this.started = true;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.pageView(e.urlAfterRedirects || e.url));
  }

  pageView(routeUrl: string): void {
    try {
      const win = this.doc.defaultView as any;
      if (!win) return;
      const origin = String(win.location?.origin || '');
      const basePath = this.doc.querySelector('base')?.getAttribute('href') || '/';
      const page_path = sanitizePath(routeUrl);
      const page_location = sanitizeLocation(origin, basePath, routeUrl);
      const page_title = String(this.doc.title || '').slice(0, 100);
      const page_referrer = sanitizeReferrer(this.doc.referrer, origin);
      // Re-config so every later hit (incl. any automatic one) carries the clean
      // location, never the real URL. send_page_view:false = config sends nothing.
      this.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false, page_location, page_path, page_title, page_referrer });
      this.gtag('event', 'page_view', { page_path, page_location, page_title });
    } catch { /* analytics must never break the page */ }
  }

  /** Named event with only its allow-listed fields (analytics-sanitize.ts). */
  track(name: string, params?: Record<string, unknown>): void {
    try {
      const clean = cleanEventParams(name, params || {});
      if (!clean) return;
      this.gtag('event', name, clean);
    } catch { /* never break the page */ }
  }

  private gtag(...args: unknown[]): void {
    try {
      if (!isPlatformBrowser(this.platformId)) return;
      const g = (this.doc.defaultView as any)?.gtag;
      if (typeof g !== 'function') return;
      g(...args);
    } catch { /* GA blocked or broken — ignore */ }
  }
}
