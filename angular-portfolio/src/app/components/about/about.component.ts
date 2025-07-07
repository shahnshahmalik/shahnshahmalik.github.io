import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { TechStack } from '../../models/portfolio.interface';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">About Me</h2>
          <p class="section-subtitle">Technologies and tools I work with to create amazing digital experiences</p>
        </div>

        <div class="about-content">
          <div class="about-text">
            <p class="intro-text">
              I'm a passionate web designer and developer with extensive experience in creating 
              responsive, user-friendly websites and web applications. I specialize in modern 
              frontend frameworks and backend technologies to deliver complete digital solutions.
            </p>
            
            <p class="experience-text">
              With a focus on clean code, intuitive design, and performance optimization, 
              I help businesses establish their digital presence and achieve their goals 
              through innovative web solutions.
            </p>
          </div>

          <div class="tech-stack">
            <mat-accordion class="tech-accordion">
              <mat-expansion-panel class="tech-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon>code</mat-icon>
                    Frameworks & Libraries
                  </mat-panel-title>
                  <mat-panel-description>
                    Frontend and backend frameworks I use
                  </mat-panel-description>
                </mat-expansion-panel-header>
                
                <div class="tech-chips">
                  <mat-chip-set>
                    <mat-chip 
                      *ngFor="let tech of frameworks" 
                      class="tech-chip framework-chip"
                      (click)="openTechLink(tech.url)">
                      {{ tech.name }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </mat-expansion-panel>

              <mat-expansion-panel class="tech-panel">
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    <mat-icon>build</mat-icon>
                    Tools & Technologies
                  </mat-panel-title>
                  <mat-panel-description>
                    Development tools and technologies
                  </mat-panel-description>
                </mat-expansion-panel-header>
                
                <div class="tech-chips">
                  <mat-chip-set>
                    <mat-chip 
                      *ngFor="let tech of tools" 
                      class="tech-chip tool-chip"
                      (click)="openTechLink(tech.url)">
                      {{ tech.name }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </mat-expansion-panel>
            </mat-accordion>
          </div>

          <div class="skills-summary">
            <h3>What I Do</h3>
            <div class="skills-grid">
              <div class="skill-item">
                <mat-icon class="skill-icon">web</mat-icon>
                <h4>Web Development</h4>
                <p>Full-stack web applications using modern frameworks and best practices</p>
              </div>
              <div class="skill-item">
                <mat-icon class="skill-icon">design_services</mat-icon>
                <h4>UI/UX Design</h4>
                <p>User-centered design with focus on usability and visual appeal</p>
              </div>
              <div class="skill-item">
                <mat-icon class="skill-icon">mobile_friendly</mat-icon>
                <h4>Responsive Design</h4>
                <p>Mobile-first approach ensuring great experience across all devices</p>
              </div>
              <div class="skill-item">
                <mat-icon class="skill-icon">speed</mat-icon>
                <h4>Performance</h4>
                <p>Optimized applications with fast loading times and smooth interactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 8rem 4vw;
      background: var(--surface-light);
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
      color: var(--text-dark);
      background: linear-gradient(135deg, var(--primary-cyan), var(--secondary-purple));
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

    .about-content {
      display: grid;
      gap: 3rem;
    }

    .about-text {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .intro-text, .experience-text {
      font-size: 1.1rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .tech-accordion {
      margin: 2rem 0;
    }

    .tech-panel {
      margin-bottom: 1rem;
      border-radius: 12px;
      background: var(--mat-sys-surface-container);
    }

    .tech-panel mat-panel-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }

    .tech-chips {
      padding: 1rem 0;
    }

    .tech-chip {
      margin: 0.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .framework-chip {
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    .tool-chip {
      background: var(--mat-sys-secondary-container);
      color: var(--mat-sys-on-secondary-container);
    }

    .tech-chip:hover {
      transform: scale(1.05);
      box-shadow: var(--mat-sys-elevation-level2);
    }

    .skills-summary {
      margin-top: 3rem;
    }

    .skills-summary h3 {
      text-align: center;
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 2rem;
      color: var(--mat-sys-on-surface);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .skill-item {
      text-align: center;
      padding: 2rem;
      border-radius: 16px;
      background: var(--mat-sys-surface-container);
      transition: all 0.3s ease;
    }

    .skill-item:hover {
      transform: translateY(-4px);
      box-shadow: var(--mat-sys-elevation-level3);
    }

    .skill-icon {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      color: var(--mat-sys-primary);
      margin-bottom: 1rem;
    }

    .skill-item h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--mat-sys-on-surface);
    }

    .skill-item p {
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .about-section {
        padding: 4rem 2vw;
      }

      .section-title {
        font-size: 2rem;
      }

      .skills-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .skill-item {
        padding: 1.5rem;
      }
    }
  `]
})
export class AboutComponent {
  private portfolioDataService = inject(PortfolioDataService);
  
  frameworks = this.portfolioDataService.getFrameworks();
  tools = this.portfolioDataService.getTools();

  openTechLink(url: string): void {
    window.open(url, '_blank');
  }
}
