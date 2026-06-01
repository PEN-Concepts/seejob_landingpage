import { Component } from '@angular/core';
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

  showDemoDialog() {
    this.demoDialogVisible = true;
  }

  hideDemoDialog() {
    this.demoDialogVisible = false;
  }

  onDemoSubmit(formData: any) {
    console.log('Demo form submitted:', formData);
    // Handle demo form submission here
  }
}
