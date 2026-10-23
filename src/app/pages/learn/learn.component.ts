import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../shared/analytics/analytics.service';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-learn',
  imports: [ButtonModule, RouterLink],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss',
})
export class LearnComponent {
  private analytics = inject(AnalyticsService);

  /** "Request a Free Demo" button. */
  demoClick(): void {
    this.analytics.track('demo_click', { location: 'learn' });
  }
}
