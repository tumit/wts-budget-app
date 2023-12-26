import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  // if user is logged-in then go to destination page
  // else go to login page
  const loggedInUser = inject(AuthService).getLoggedInUser();

  if (loggedInUser) {
    return true;
  }

  inject(Router).navigate(['auth/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
};
