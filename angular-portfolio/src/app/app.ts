import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { WorkComponent } from './components/work/work.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent
  ],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main>
        <app-hero></app-hero>
        <app-work></app-work>
        <app-about></app-about>
        <app-contact></app-contact>
      </main>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-portfolio';
}
