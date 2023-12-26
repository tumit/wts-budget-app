import { Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoggedInUser, Login } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // loggedInUser: LoggedInUser | null = null;

  platformId = inject(PLATFORM_ID);
  httpClient = inject(HttpClient);

  setLoggedInUser(loggedInUser: LoggedInUser): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
  }

  getLoggedInUser(): LoggedInUser | null {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('isPlatformBrowser(this.platformId)', isPlatformBrowser(this.platformId))
      return null;
    }
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) as LoggedInUser : null;
  }

  login(login: Login): Observable<LoggedInUser> {
    const url = 'http://localhost:3000/login';
    return this.httpClient.post<LoggedInUser>(url, login);
  }
}
