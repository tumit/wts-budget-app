import { Injectable, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoggedInUser, Login } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // loggedInUser: LoggedInUser | null = null;

  platformId = inject(PLATFORM_ID);
  httpClient = inject(HttpClient);

  // signal =>
  // - LoggedInUser is loggedIn
  // - null is not logged in
  loggedInUserState = signal<LoggedInUser|null>(null);

  constructor() {
    this.getLoggedInUser();
  }

  setLoggedInUser(loggedInUser: LoggedInUser): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    this.loggedInUserState.set(loggedInUser)
  }

  private getLoggedInUser(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('isPlatformBrowser(this.platformId)', isPlatformBrowser(this.platformId))
      return;
    }
    const loggedInUser = this.fromStorage();
    this.loggedInUserState.set(loggedInUser);
  }

  private fromStorage() : LoggedInUser | null {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser ? JSON.parse(loggedInUser) as LoggedInUser : null;
  }

  // Login => Observable<LoggedInUser>
  login(login: Login): Observable<LoggedInUser> {
    const url = 'http://localhost:3000/login';
    return this.httpClient.post<LoggedInUser>(url, login);
  }

  logout(): void {
    this.loggedInUserState.set(null);
    sessionStorage.clear();
  }
}
