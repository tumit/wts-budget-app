import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { adminGuard } from './admin.guard';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';

describe('adminGuard', () => {
  const executeGuard = () =>
      TestBed.runInInjectionContext(() => adminGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

  let mockAuthService = {
    loggedInUserState: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should can activate, when found loggedInUser', () => {
    mockAuthService.loggedInUserState.mockReturnValue({
      user: {
        role: 'A'
      }
    })
    expect(executeGuard()).toBeTruthy();
  });

  it('should can activate, when found loggedInUser', () => {
    mockAuthService.loggedInUserState.mockReturnValue({
      user: {
        role: 'U'
      }
    })
    expect(executeGuard()).toBeFalsy();
  });
});
