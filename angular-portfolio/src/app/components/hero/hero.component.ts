import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  template: `
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ portfolioData.personal.title }}</h1>
          <p class="hero-description">{{ portfolioData.personal.description }}</p>
          
          <div class="hero-actions">
            <button mat-raised-button color="primary" class="cta-button" (click)="scrollToContact()">
              <mat-icon>mail</mat-icon>
              Contact Me
            </button>
          </div>

          <div class="social-links">
            <mat-chip-set>
              <mat-chip *ngFor="let social of portfolioData.contact.social" 
                       (click)="openSocialLink(social.url)"
                       class="social-chip">
                <mat-icon [fontSet]="'fa'" [fontIcon]="social.icon"></mat-icon>
              </mat-chip>
            </mat-chip-set>
          </div>
        </div>

        <div class="hero-image">
          <div class="image-container">
            <img [src]="'assets/main.png'" [alt]="portfolioData.personal.name" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding: 0 4vw;
      background: linear-gradient(135deg, var(--mat-sys-surface-container) 0%, var(--mat-sys-surface-container-low) 100%);
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      align-items: center;
    }

    .hero-text {
      animation: slideInLeft 1s ease-out;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      color: var(--mat-sys-on-surface);
      background: linear-gradient(135deg, var(--mat-sys-primary), var(--mat-sys-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 2rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .hero-actions {
      margin-bottom: 2rem;
    }

    .cta-button {
      padding: 12px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border-radius: 50px;
      box-shadow: var(--mat-sys-elevation-level3);
      transition: all 0.3s ease;
    }

    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: var(--mat-sys-elevation-level4);
    }

    .social-links {
      margin-top: 2rem;
    }

    .social-chip {
      margin-right: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .social-chip:hover {
      transform: scale(1.1);
      box-shadow: var(--mat-sys-elevation-level2);
    }

    .hero-image {
      animation: jackInTheBox 1s ease-out;
      animation-delay: 0.2s;
      animation-fill-mode: both;
    }

    .image-container {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--mat-sys-elevation-level4);
      background: linear-gradient(135deg, var(--mat-sys-primary-container), var(--mat-sys-secondary-container));
    }

    .image-container img {
      width: 100%;
      height: auto;
      display: block;
      mix-blend-mode: multiply;
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes jackInTheBox {
      from {
        opacity: 0;
        transform: scale(0.1) rotate(30deg);
        transform-origin: center bottom;
      }
      50% {
        transform: rotate(-10deg);
      }
      70% {
        transform: rotate(3deg);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 2rem;
      }

      .hero-title {
        font-size: 2rem;
      }

      .hero-description {
        font-size: 1.1rem;
      }

      .hero-image {
        order: -1;
      }
    }
  `]
})
export class HeroComponent {
  private portfolioDataService = inject(PortfolioDataService);
  portfolioData = this.portfolioDataService.getPortfolioData();

  scrollToContact(): void {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }
}
