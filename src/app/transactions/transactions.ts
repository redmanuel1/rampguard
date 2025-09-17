import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/Authservice';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss'
})
export class Transactions {
  sidebarOpen = true;
  isSidenavOpen = false;
  pageTitle = 'RAMP ACTIVITIES'; // default

  constructor(private router: Router, private authService: AuthService ) {
     this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.url;

        if (currentRoute.includes('dashboard')) {
          this.pageTitle = 'ACTIVITIES TODAY';
        } else if (currentRoute.includes('activities')) {
          this.pageTitle = 'ALL ACTIVITIES';
        } else {
          this.pageTitle = 'RAMP ACTIVITIES'; // fallback
        }
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.router.navigate(['/login']);
    // this.router.navigate(['/login']);
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
