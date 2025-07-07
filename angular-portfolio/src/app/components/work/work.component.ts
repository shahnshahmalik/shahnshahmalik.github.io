import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { Project } from '../../models/portfolio.interface';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="project-dialog">
      <div class="dialog-header">
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <button mat-icon-button mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <div mat-dialog-content class="dialog-content">
        <img [src]="data.image" [alt]="data.title" class="project-image-large" />
        <p *ngIf="data.description" class="project-description">{{ data.description }}</p>
        <p *ngIf="data.category" class="project-category">Category: {{ data.category }}</p>
      </div>
    </div>
  `,
  styles: [`
    .project-dialog {
      max-width: 800px;
      width: 90vw;
    }

    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .dialog-content {
      text-align: center;
    }

    .project-image-large {
      width: 100%;
      height: auto;
      border-radius: 12px;
      margin-bottom: 1rem;
      box-shadow: var(--mat-sys-elevation-level2);
    }

    .project-description {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 1rem;
      color: var(--mat-sys-on-surface-variant);
    }

    .project-category {
      font-weight: 600;
      color: var(--mat-sys-primary);
    }
  `]
})
export class ProjectDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Project) {}
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatChipsModule
  ],
  template: `
    <section id="work" class="work-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Work</h2>
          <p class="section-subtitle">A showcase of recent projects and design solutions</p>
        </div>

        <div class="projects-grid">
          <mat-card 
            *ngFor="let project of projects; trackBy: trackByProject" 
            class="project-card"
            (click)="openProjectDialog(project)"
            [class.animate-in]="true">
            
            <div class="card-image-container">
              <img 
                mat-card-image 
                [src]="project.image" 
                [alt]="project.title"
                class="project-image"
                loading="lazy" />
              <div class="image-overlay">
                <mat-icon class="expand-icon">zoom_in</mat-icon>
              </div>
            </div>

            <mat-card-content class="card-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p *ngIf="project.description" class="project-description">{{ project.description }}</p>
              
              <mat-chip-set *ngIf="project.category">
                <mat-chip class="category-chip">{{ project.category }}</mat-chip>
              </mat-chip-set>
            </mat-card-content>

            <mat-card-actions class="card-actions">
              <button mat-button color="primary" (click)="openProjectDialog(project); $event.stopPropagation()">
                <mat-icon>visibility</mat-icon>
                View Details
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .work-section {
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

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .project-card {
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: var(--mat-sys-elevation-level1);
      background: var(--mat-sys-surface-container);
    }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: var(--mat-sys-elevation-level4);
    }

    .card-image-container {
      position: relative;
      overflow: hidden;
    }

    .project-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image {
      transform: scale(1.05);
    }

    .image-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .project-card:hover .image-overlay {
      opacity: 1;
    }

    .expand-icon {
      color: white;
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
    }

    .card-content {
      padding: 1.5rem;
    }

    .project-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--mat-sys-on-surface);
    }

    .project-description {
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 1rem;
      line-height: 1.5;
    }

    .category-chip {
      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }

    .card-actions {
      padding: 0 1.5rem 1.5rem;
    }

    .animate-in {
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .work-section {
        padding: 4rem 2vw;
      }

      .section-title {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .project-card {
        margin: 0 auto;
        max-width: 400px;
      }
    }
  `]
})
export class WorkComponent {
  private portfolioDataService = inject(PortfolioDataService);
  private dialog = inject(MatDialog);
  
  projects = this.portfolioDataService.getProjects();

  trackByProject(index: number, project: Project): string {
    return project.id;
  }

  openProjectDialog(project: Project): void {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      maxWidth: '90vw',
      maxHeight: '90vh',
      panelClass: 'project-dialog-panel'
    });
  }
}
