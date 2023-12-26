import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loggedInUser = inject(AuthService).getLoggedInUser();

  if (loggedInUser?.user.role === 'A') {
    return true;
  }

  return false;
};
