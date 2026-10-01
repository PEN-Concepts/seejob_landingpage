import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DEFAULT_OG_IMAGE, SITE, seoFor } from '../content/seo-pages';

/**
 * One place sets every page's <title>, description, canonical, Open Graph and
 * Twitter tags, from content/seo-pages.ts. Runs on each navigation — including
 * during prerender, so the static HTML each crawler fetches already carries
 * that page's own tags (no duplicate home title on /pricing).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private doc: Document,
  ) {}

  start(): void {
    this.apply(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.apply(e.urlAfterRedirects));
  }

  apply(url: string): void {
    const s = seoFor(url);
    const href = SITE + s.path;
    const image = s.ogImage || DEFAULT_OG_IMAGE;
    this.title.setTitle(s.title);
    this.meta.updateTag({ name: 'description', content: s.description });
    this.meta.updateTag({ property: 'og:title', content: s.title });
    this.meta.updateTag({ property: 'og:description', content: s.description });
    this.meta.updateTag({ property: 'og:url', content: href });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: s.title });
    this.meta.updateTag({ name: 'twitter:description', content: s.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    let link = this.doc.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
