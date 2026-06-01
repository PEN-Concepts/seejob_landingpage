import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-contact-form',
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  @Input() dialogVisible: boolean = false;
  @Input() dialogTitle: string = 'Contact Us';
  @Input() submitButtonText: string = 'Submit';
  @Input() formTitle: string = 'Get in Touch';
  @Input() formDescription: string = 'Fill out the form below and we\'ll get back to you as soon as possible.';
  
  @Output() dialogVisibleChange = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<any>();

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
      phone: ['', [Validators.pattern(/^\+1 \(\d{3}\) \d{3}-\d{4}$/)]],
      message: ['', [Validators.required]],
    });
  }

  showDialog() {
    this.dialogVisibleChange.emit(true);
  }

  hideDialog() {
    this.dialogVisibleChange.emit(false);
    this.contactForm.reset();
  }

  onSubmit() {
    // Mark all fields as touched to show validation
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsTouched();
    });
    
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
      this.hideDialog();
    }
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
        value = '+1 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 11);
      }
    }
    this.phone?.setValue(value, { emitEvent: false });
  }

  get firstName() { return this.contactForm.get('firstName'); }
  get lastName() { return this.contactForm.get('lastName'); }
  get email() { return this.contactForm.get('email'); }
  get phone() { return this.contactForm.get('phone'); }
  get message() { return this.contactForm.get('message'); }
}
