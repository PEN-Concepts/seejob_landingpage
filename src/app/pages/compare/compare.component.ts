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
    meta.updateTag({
      name: 'keywords',
      content:
        'best app for general contractors, best construction app for small contractors, See Job Run vs Buildertrend, See Job Run vs Procore, construction scheduling app',
    });
  }
}
