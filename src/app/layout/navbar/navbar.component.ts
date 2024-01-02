import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { LoggedInUser } from '../../auth/models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCollapse = false;

  // get loggedInUser
  authService = inject(AuthService)

  router = inject(Router)

  // read only one time
  // loggedInUser = this.authService.getLoggedInUser();

  // update when changed all time
  loggedInUserState = this.authService.loggedInUserState;

  onLogout(): void {
    this.authService.logout()
    this.router.navigate(['auth/login'])
  }
}
