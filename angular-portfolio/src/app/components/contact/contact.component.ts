import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Get In Touch</h2>
          <p class="section-subtitle">Ready to start your next project? Let's discuss how I can help bring your ideas to life.</p>
        </div>

        <div class="contact-content">
          <div class="contact-info">
            <mat-card class="info-card">
              <mat-card-header>
                <mat-card-title>Contact Information</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="contact-item">
                  <mat-icon class="contact-icon">phone</mat-icon>
                  <div class="contact-details">
                    <h4>Phone</h4>
                    <a [href]="'tel:' + portfolioData.contact.phone">{{ portfolioData.contact.phone }}</a>
                  </div>
                </div>

                <div class="contact-item">
                  <mat-icon class="contact-icon">email</mat-icon>
                  <div class="contact-details">
                    <h4>Email</h4>
                    <a [href]="'mailto:' + portfolioData.contact.email">{{ portfolioData.contact.email }}</a>
                  </div>
                </div>

                <div class="contact-item">
                  <mat-icon class="contact-icon">location_on</mat-icon>
                  <div class="contact-details">
                    <h4>Location</h4>
                    <p>{{ portfolioData.contact.address.street }}, {{ portfolioData.contact.address.city }}, {{ portfolioData.contact.address.country }}</p>
                  </div>
                </div>

                <div class="social-section">
                  <h4>Follow Me</h4>
                  <mat-chip-set>
                    <mat-chip 
                      *ngFor="let social of portfolioData.contact.social" 
                      class="social-chip"
                      (click)="openSocialLink(social.url)">
                      <mat-icon [fontSet]="'fa'" [fontIcon]="social.icon"></mat-icon>
                      {{ social.platform }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </mat-card-content>
            </mat-card>
          </div>

          <div class="contact-form">
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>Send a Message</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form-fields">
                  <div class="form-row">
                    <mat-form-field appearance="outline" class="form-field">
                      <mat-label>Name</mat-label>
                      <input matInput formControlName="name" placeholder="Your full name">
                      <mat-icon matSuffix>person</mat-icon>
                      <mat-error *ngIf="contactForm.get('name')?.hasError('required')">
                        Name is required
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="form-field">
                      <mat-label>Email</mat-label>
                      <input matInput type="email" formControlName="email" placeholder="your@email.com">
                      <mat-icon matSuffix>email</mat-icon>
                      <mat-error *ngIf="contactForm.get('email')?.hasError('required')">
                        Email is required
                      </mat-error>
                      <mat-error *ngIf="contactForm.get('email')?.hasError('email')">
                        Please enter a valid email
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="outline" class="form-field full-width">
                    <mat-label>Subject</mat-label>
                    <input matInput formControlName="subject" placeholder="Project inquiry">
                    <mat-icon matSuffix>subject</mat-icon>
                    <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">
                      Subject is required
                    </mat-error>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field full-width">
                    <mat-label>Message</mat-label>
                    <textarea 
                      matInput 
                      formControlName="message" 
                      rows="6" 
                      placeholder="Tell me about your project...">
                    </textarea>
                    <mat-icon matSuffix>message</mat-icon>
                    <mat-error *ngIf="contactForm.get('message')?.hasError('required')">
                      Message is required
                    </mat-error>
                    <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">
                      Message must be at least 10 characters long
                    </mat-error>
                  </mat-form-field>

                  <div class="form-actions">
                    <button 
                      mat-raised-button 
                      color="primary" 
                      type="submit" 
                      [disabled]="contactForm.invalid || isSubmitting"
                      class="submit-button">
                      <mat-icon>send</mat-icon>
                      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                  </div>
                </form>
              </mat-card-content>
            </mat-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      padding: 8rem 4vw;
      background: var(--mat-sys-surface-container-lowest);
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--mat-sys-on-surface);
      background: linear-gradient(135deg, var(--mat-sys-primary), var(--mat-sys-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .section-subtitle {
      font-size: 1.25rem;
      color: var(--mat-sys-on-surface-variant);
      max-width: 600px;
      margin: 0 auto;
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .info-card, .form-card {
      border-radius: 16px;
      box-shadow: var(--mat-sys-elevation-level2);
      background: var(--mat-sys-surface-container);
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .contact-icon {
      color: var(--mat-sys-primary);
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      margin-top: 0.25rem;
    }

    .contact-details h4 {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      color: var(--mat-sys-on-surface);
    }

    .contact-details a {
      color: var(--mat-sys-primary);
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .contact-details a:hover {
      color: var(--mat-sys-secondary);
    }

    .contact-details p {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
    }

    .social-section {
      margin-top: 2rem;
    }

    .social-section h4 {
      margin-bottom: 1rem;
      font-weight: 600;
      color: var(--mat-sys-on-surface);
    }

    .social-chip {
      margin: 0.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    .social-chip:hover {
      transform: scale(1.05);
      box-shadow: var(--mat-sys-elevation-level2);
    }

    .contact-form-fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-field {
      width: 100%;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .form-actions {
      margin-top: 1rem;
      text-align: center;
    }

    .submit-button {
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 50px;
      min-width: 200px;
    }

    .submit-button:disabled {
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .contact-section {
        padding: 4rem 2vw;
      }

      .section-title {
        font-size: 2rem;
      }

      .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }

      .form-row {
        grid-template-columns: 1fr;
      }

      .contact-item {
        margin-bottom: 1.5rem;
      }
    }
  `]
})
export class ContactComponent {
  private portfolioDataService = inject(PortfolioDataService);
  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  portfolioData = this.portfolioDataService.getPortfolioData();
  isSubmitting = false;

  contactForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      setTimeout(() => {
        this.isSubmitting = false;
        this.snackBar.open('Message sent successfully! I\'ll get back to you soon.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.contactForm.reset();
      }, 2000);
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }
}
