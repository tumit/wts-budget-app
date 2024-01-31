import {
  TestBed
} from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import {
  RouterTestingHarness
} from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoggedInUser } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import LoginComponent from './login.component';

async function createComponent(): Promise<LoginComponent> {
  const harness = await RouterTestingHarness.create();
  return await harness.navigateByUrl('/', LoginComponent);
}

describe('LoginComponent', () => {
  const loggedInUser: LoggedInUser = {
    user: {
      email: 'user@mock.odds',
      role: 'U',
      id: 1,
    },
    accessToken: 'ABC',
  };

  let mockAuthService = {
    login: jest.fn(),
    setLoggedInUser: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        provideRouter([{ path: '**', component: LoginComponent }]),
      ],
    }).compileComponents();
  });

  it('should create', async () => {
    const component = await createComponent();
    expect(component).toBeTruthy();
  });

  it('should save loggedUser & redirect to returnUrl when login successful', async () => {
    // * arrange
    // simulate redirect to login
    const returnUrl = '/budget/requirements/approval';
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      `/login?returnUrl=${returnUrl}`,
      LoginComponent
    );

    // mock & return loggedInUser
    mockAuthService.login.mockReturnValue(of(loggedInUser));

    // spy on router
    const spyRouter = jest.spyOn(component.router, 'navigate');

    // * act
    component.onLogin();

    // * assert
    expect(mockAuthService.setLoggedInUser).toHaveBeenCalledWith(loggedInUser);
    expect(spyRouter).toHaveBeenCalledWith([returnUrl]);
    const errorMessage = component.errorMessage;
    expect(errorMessage).toBe('');
  });

  it('should show error message when login fail', async () => {
    // * arrange
    // simulate redirect to login
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      '/login?returnUrl=/budget/requirements/approval',
      LoginComponent
    );

    // mock & return error
    const err = { error: 'User not found' };
    mockAuthService.login.mockReturnValue(throwError(() => err));

    // * act
    component.onLogin();

    // * assert
    const errorMessage = component.errorMessage;
    expect(errorMessage).toBe('User not found');
  });
});
