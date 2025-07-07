import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  template: `
    <mat-toolbar class="header-toolbar" [class.scrolled]="isScrolled">
      <div class="header-content">
        <div class="logo">
          <h1>{{ portfolioData.personal.name }}</h1>
        </div>
        
        <nav class="desktop-nav" *ngIf="!isMobile">
          <a mat-button (click)="scrollToSection('work')">work</a>
          <a mat-button (click)="scrollToSection('about')">about</a>
          <a mat-button href="https://medium.com/@luv200" target="_blank">blog</a>
          <a mat-button (click)="scrollToSection('contact')">contact</a>
          <button mat-icon-button (click)="themeService.toggleTheme()" class="theme-toggle">
            <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </nav>

        <button mat-icon-button *ngIf="isMobile" (click)="toggleMobileMenu()">
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <mat-sidenav-container *ngIf="isMobile && showMobileMenu" class="mobile-nav">
      <mat-sidenav [opened]="showMobileMenu" mode="over" position="end" (closed)="showMobileMenu = false">
        <div class="mobile-nav-content">
          <a mat-button (click)="scrollToSection('work'); closeMobileMenu()">work</a>
          <a mat-button (click)="scrollToSection('about'); closeMobileMenu()">about</a>
          <a mat-button href="https://medium.com/@luv200" target="_blank" (click)="closeMobileMenu()">blog</a>
          <a mat-button (click)="scrollToSection('contact'); closeMobileMenu()">contact</a>
          <button mat-icon-button (click)="themeService.toggleTheme()" class="theme-toggle">
            <mat-icon>{{ themeService.darkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    .header-toolbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: transparent;
      color: white;
      transition: all 0.4s ease-in-out;
      padding: 6vh 4vw;
      height: auto;
    }

    .header-toolbar.scrolled {
      background: var(--mat-sys-surface);
      color: var(--mat-sys-on-surface);
      box-shadow: var(--mat-sys-elevation-level2);
      padding: 4vh 4vw;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: inherit;
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .desktop-nav a {
      color: inherit;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .desktop-nav a:hover {
      color: var(--mat-sys-primary);
    }

    .theme-toggle {
      margin-left: 1rem;
    }

    .mobile-nav-content {
      display: flex;
      flex-direction: column;
      padding: 2rem;
      gap: 1rem;
    }

    .mobile-nav-content a {
      text-align: center;
      color: var(--mat-sys-on-surface);
    }

    @media (max-width: 768px) {
      .header-toolbar {
        background: var(--mat-sys-surface);
        color: var(--mat-sys-on-surface);
        position: absolute;
        padding: 3vh 2vw;
      }

      .logo h1 {
        font-size: 20px;
      }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private breakpointObserver = inject(BreakpointObserver);
  
  isScrolled = false;
  isMobile = false;
  showMobileMenu = false;
  
  portfolioData = {
    personal: {
      name: 'Shahnshah Malik'
    }
  };

  constructor() {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 80;
    });

    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
  }
}
