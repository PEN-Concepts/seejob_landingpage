import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  readonly faqSchema = FAQ_SCHEMA;
  demoDialogVisible: boolean = false;

  // ── PWA install CTA (replaces the App Store / Google Play badges) ──────────
  /** Where the web app lives — used by the "Use on desktop or tablet" link and
   *  as the Android fallback if the native prompt isn't available. */
  readonly appUrl = 'https://seejobrun.com/user-dashboard/';
  /** Detected platform. 'unknown' (inconclusive) falls back to the iOS flow —
   *  the safest option, since it never assumes an install capability exists. */
  device: 'android' | 'ios' | 'desktop' | 'unknown' = 'desktop';
  installReady = false;      // the Android/Chrome native prompt has been captured
  installed = false;         // user already installed it this session
  showIosPanel = false;      // the iPhone "Add to Home Screen" steps are open

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

  ngOnInit(): void {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    this.device = this.detectDevice();

    // Already running as an installed app? Then there's nothing to install.
    const standalone =
      (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
      (navigator as any).standalone === true;
    const state = (window as any).__sjrInstall;
    this.installed = standalone || !!(state && state.installed);
    this.installReady = !!(state && state.event);

    // The native prompt can arrive after this component loads.
    window.addEventListener('sjr-install-ready', () => (this.installReady = true));
    window.addEventListener('sjr-install-done', () => {
      this.installed = true;
      this.installReady = false;
    });
  }

  /** Classify the visitor. iOS is checked before desktop so iPadOS (which now
   *  reports as "Macintosh") is treated as iOS. Anything we can't place lands on
   *  'unknown' → the iPhone-style instructions (safe: assumes no capability). */
  private detectDevice(): 'android' | 'ios' | 'desktop' | 'unknown' {
    const ua = navigator.userAgent || '';
    if (/android/i.test(ua)) return 'android';
    const isIOS =
      /iphone|ipad|ipod/i.test(ua) ||
      (/Macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document);
    if (isIOS) return 'ios';
    // A clear desktop signal (and not a mobile UA) → no install button.
    if (/(windows nt|macintosh|cros|x11|linux)/i.test(ua) && !/mobile/i.test(ua)) return 'desktop';
    return 'unknown';
  }

  /** The iPhone flow (also the inconclusive-device fallback) shows manual steps. */
  get useIosFlow(): boolean {
    return this.device === 'ios' || this.device === 'unknown';
  }

  /** Android one-tap install via the captured beforeinstallprompt. If it isn't
   *  available (heuristic not yet met / already installed), open the web app. */
  installAndroid(): void {
    const state = (window as any).__sjrInstall;
    const evt = state && state.event;
    if (evt && typeof evt.prompt === 'function') {
      evt.prompt();
      Promise.resolve(evt.userChoice).finally(() => {
        state.event = null;
        this.installReady = false;
      });
    } else {
      window.open(this.appUrl, '_blank', 'noopener');
    }
  }

  toggleIosPanel(): void {
    this.showIosPanel = !this.showIosPanel;
  }

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
