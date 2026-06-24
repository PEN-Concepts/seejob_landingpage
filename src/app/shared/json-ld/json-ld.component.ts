import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';

/**
 * Injects a JSON-LD <script> into <head> during prerender so the structured
 * data lands ONLY on the page that includes this component (no leaking to
 * every route). Server-only — the prerendered HTML keeps the tag; the client
 * doesn't re-add it, so there's never a duplicate.
 */
@Component({
  selector: 'app-json-ld',
  standalone: true,
  template: '',
})
export class JsonLdComponent implements OnInit {
  @Input() schema: unknown;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!this.schema || !isPlatformServer(this.platformId)) return;
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(this.schema);
    this.doc.head.appendChild(script);
  }
}
