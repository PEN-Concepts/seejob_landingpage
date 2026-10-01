import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TIERS, TIERS_NOTE, TIER_CHIPS } from '../../content/why-seejobrun-content';

@Component({
  selector: 'app-pricing',
  imports: [ButtonModule, CommonModule, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly tiers = TIERS;
  readonly note = TIERS_NOTE;
  readonly chips = TIER_CHIPS;
}
