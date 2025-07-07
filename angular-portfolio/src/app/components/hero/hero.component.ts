import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <div class="pixel-avatar">
              <div class="avatar-container">
                <div class="pixel-face"></div>
                <div class="pixel-glasses"></div>
                <div class="pixel-beard"></div>
              </div>
            </div>
            <h1 class="hero-title">
              <span class="greeting">Ciao!</span>
              <span class="intro">I'm Shahnshah,</span>
              <span class="tagline">another f&#64;$#&n' developer!</span>
            </h1>
            <p class="hero-description">
              Building kick-ass SaaS applications and web experiences that users actually love. 
              Specializing in modern frameworks, clean code, and turning complex ideas into 
              simple, beautiful solutions.
            </p>
            <div class="hero-actions">
              <button mat-raised-button class="cta-button hover-float">
                <mat-icon>rocket_launch</mat-icon>
                Check My Work
              </button>
              <button mat-button class="contact-button hover-pulse">
                <mat-icon>chat</mat-icon>
                Let's Talk
              </button>
            </div>
            <div class="tech-badges">
              <span class="tech-badge">Angular</span>
              <span class="tech-badge">React</span>
              <span class="tech-badge">Node.js</span>
              <span class="tech-badge">TypeScript</span>
            </div>
          </div>
        </div>
      </div>
      <div class="floating-elements">
        <div class="float-element float-1">💻</div>
        <div class="float-element float-2">🚀</div>
        <div class="float-element float-3">⚡</div>
        <div class="float-element float-4">🎯</div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      background: var(--primary-cyan);
      padding: 2rem 4vw;
      position: relative;
      overflow: hidden;
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
      z-index: 2;
      position: relative;
    }

    .hero-content {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }

    .hero-text {
      text-align: center;
      animation: slideInUp 1s ease-out;
      max-width: 800px;
    }

    .pixel-avatar {
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
    }

    .avatar-container {
      width: 120px;
      height: 120px;
      position: relative;
      image-rendering: pixelated;
      animation: float 3s ease-in-out infinite;
    }

    .pixel-face {
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #D4A574 0%, #E6B887 50%, #D4A574 100%);
      border-radius: 20px;
      position: relative;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    .pixel-glasses {
      position: absolute;
      top: 30%;
      left: 15%;
      width: 70%;
      height: 25%;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 8px;
    }

    .pixel-beard {
      position: absolute;
      bottom: 20%;
      left: 25%;
      width: 50%;
      height: 30%;
      background: #2C1810;
      border-radius: 0 0 15px 15px;
    }

    .greeting {
      display: block;
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .intro {
      display: block;
      font-size: 3rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .tagline {
      display: block;
      font-size: 2.2rem;
      font-weight: 500;
      color: var(--text-dark);
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 2rem;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }

    .hero-description {
      font-size: 1.3rem;
      line-height: 1.6;
      color: white;
      margin-bottom: 3rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .hero-actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 3rem;
    }

    .cta-button {
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      background: var(--secondary-purple) !important;
      color: white !important;
      border-radius: 50px !important;
      box-shadow: 0 8px 24px rgba(155, 89, 182, 0.4) !important;
      transition: all 0.3s ease !important;
    }

    .cta-button:hover {
      background: var(--secondary-pink) !important;
      transform: translateY(-4px) !important;
      box-shadow: 0 12px 32px rgba(233, 30, 99, 0.5) !important;
    }

    .contact-button {
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: white !important;
      border: 2px solid white !important;
      border-radius: 50px !important;
      transition: all 0.3s ease !important;
    }

    .contact-button:hover {
      background: white !important;
      color: var(--primary-cyan) !important;
      transform: translateY(-2px) !important;
    }

    .tech-badges {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .tech-badge {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }

    .tech-badge:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .float-element {
      position: absolute;
      font-size: 2rem;
      opacity: 0.6;
      animation: float 4s ease-in-out infinite;
    }

    .float-1 {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .float-2 {
      top: 60%;
      right: 15%;
      animation-delay: 1s;
    }

    .float-3 {
      top: 30%;
      right: 25%;
      animation-delay: 2s;
    }

    .float-4 {
      bottom: 30%;
      left: 20%;
      animation-delay: 3s;
    }

    @media (max-width: 768px) {
      .hero-section {
        padding: 1rem 2vw;
        min-height: 90vh;
      }

      .greeting {
        font-size: 2rem;
      }

      .intro {
        font-size: 2.2rem;
      }

      .tagline {
        font-size: 1.6rem;
      }

      .hero-description {
        font-size: 1.1rem;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .cta-button, .contact-button {
        width: 100%;
        max-width: 280px;
      }

      .tech-badges {
        gap: 0.5rem;
      }

      .tech-badge {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }

      .floating-elements {
        display: none;
      }
    }
  `]
})
export class HeroComponent {}
