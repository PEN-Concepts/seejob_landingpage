import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TIERS, TIERS_NOTE, TIER_CHIPS } from '../../content/why-seejobrun-content';
import { JsonLdComponent } from '../../shared/json-ld/json-ld.component';
import { PRICING_SCHEMA } from '../../shared/seo-schemas';

@Component({
  selector: 'app-pricing',
  imports: [ButtonModule, CommonModule, RouterLink, JsonLdComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly tiers = TIERS;
  readonly note = TIERS_NOTE;
  readonly chips = TIER_CHIPS;
  readonly schema = PRICING_SCHEMA;
}
