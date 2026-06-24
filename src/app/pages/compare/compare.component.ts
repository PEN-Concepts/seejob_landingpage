import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { JsonLdComponent } from '../../shared/json-ld/json-ld.component';
import { COMPARE_FAQ_SCHEMA } from '../../shared/seo-schemas';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [RouterLink, JsonLdComponent],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.scss',
})
export class CompareComponent {
  readonly faqSchema = COMPARE_FAQ_SCHEMA;

  constructor(title: Title, meta: Meta) {
    title.setTitle(
      'Best App for Small General Contractors (2026) — See Job Run vs. Spreadsheets & Enterprise Tools',
    );
    meta.updateTag({
      name: 'description',
      content:
        'Looking for the best app for a small general contractor? Compare See Job Run to spreadsheets, group texts, and enterprise tools like Procore and Buildertrend — scheduling, tasks, photos, and subcontractor bidding in one app from $29/month, English & Spanish.',
    });
    meta.updateTag({
      name: 'keywords',
      content:
        'best app for general contractors, best construction app for small contractors, contractor bidding app, subcontractor bid software, See Job Run vs Buildertrend, See Job Run vs Procore, construction scheduling app',
    });
  }
}
