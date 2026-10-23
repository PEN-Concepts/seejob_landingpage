import { Component, inject } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics/analytics.service';
import { ButtonModule } from 'primeng/button';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';

@Component({
  selector: 'app-features',
  imports: [ButtonModule, ContactFormComponent],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent {
  demoDialogVisible: boolean = false;
  private analytics = inject(AnalyticsService);

  showDemoDialog() {
    this.analytics.track('demo_click', { location: 'features' });
    this.demoDialogVisible = true;
  }

  hideDemoDialog() {
    this.demoDialogVisible = false;
  }

  onDemoSubmit(formData: any) {
    // Handle demo form submission here
  }
}
