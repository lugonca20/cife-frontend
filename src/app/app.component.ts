import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  template: `
    <app-navbar *ngIf="mostrarNavbar" />
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer *ngIf="mostrarNavbar" />
  `
})
export class AppComponent {
  mostrarNavbar = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.mostrarNavbar = !e.url.startsWith('/admin');
    });
  }
}