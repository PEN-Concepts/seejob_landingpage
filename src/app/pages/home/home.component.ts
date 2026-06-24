import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';


import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { JsonLdComponent } from '../../shared/json-ld/json-ld.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FAQ_SCHEMA } from '../../shared/seo-schemas';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ IMPORTANT
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    CardModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    ContactFormComponent,
    JsonLdComponent,
    RouterLink
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly faqSchema = FAQ_SCHEMA;
  demoDialogVisible: boolean = false;
  contactForm: FormGroup;   
  private apiUrl =  environment.apiUrl + '/demo_request';
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
  ) {this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        ],
      ],
      phone: ['', [Validators.pattern(/^\+1 \(\d{3}\) \d{3}-\d{4}$/)]],
      message: ['', [Validators.required]],
    });
  }
  loading = false;

  showDemoDialog() {
    this.demoDialogVisible = true;
  }

  hideDemoDialog() {
    this.demoDialogVisible = false;
  }

  onDemoSubmit(formData: any) {
  // Optional: validate formData here if needed
  if (!formData || Object.keys(formData).length === 0) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Validation',
      detail: 'Please fill out all required fields',
      life: 5000,
    });
    return;
  }

  this.loading = true;

  this.http.post(this.apiUrl, formData).subscribe({
    next: (res: any) => {
      this.loading = false;
      // Optionally reset the dialog form
      this.demoDialogVisible = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Demo request sent successfully',
        life: 5000,
      });
    },
    error: (err) => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to Demo request',
        life: 5000,
      });
    },
  });
}

}
