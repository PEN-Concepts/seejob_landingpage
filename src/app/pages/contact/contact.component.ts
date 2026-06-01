import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true, // ✅ IMPORTANT
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;   
  loading = false;
  private apiUrl = environment.apiUrl + '/contact';
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
    this.contactForm = this.fb.group({
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

  onSubmit() {
  if (this.contactForm.invalid) {
    this.contactForm.markAllAsTouched();
    return;
  }

  const payload = this.contactForm.value;
  this.loading = true;
  this.http.post(this.apiUrl, payload).subscribe({
    next: (res: any) => {
      this.loading = false;
      this.contactForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Contact Request sent successfully',
        life: 5000,
      });
    },
    error: (err) => {
      this.loading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to send Contact Request',
        life: 5000,
      });
    },
  });
}

  get firstName() {
    return this.contactForm.get('firstName');
  }
  get lastName() {
    return this.contactForm.get('lastName');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get message() {
    return this.contactForm.get('message');
  }

  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 0) {
      if (value.length <= 1) {
        value = '+1';
      } else if (value.length <= 4) {
        value = '+1 (' + value.substring(1);
      } else if (value.length <= 7) {
        value = '+1 (' + value.substring(1, 4) + ') ' + value.substring(4);
      } else {
        value =
          '+1 (' +
          value.substring(1, 4) +
          ') ' +
          value.substring(4, 7) +
          '-' +
          value.substring(7, 11);
      }
    }
    this.phone?.setValue(value, { emitEvent: false });
  }
}
