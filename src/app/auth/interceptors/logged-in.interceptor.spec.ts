import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClient,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { loggedInInterceptor } from './logged-in.interceptor';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('loggedInInterceptor', () => {

  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  let mockAuthService = {
    loggedInUserState: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideHttpClient(withInterceptors([loggedInInterceptor])),
        provideHttpClientTesting()
      ],
    });
    httpClient = TestBed.inject(HttpClient)
    httpTesting = TestBed.inject(HttpTestingController)
  });

  it('should call without headers', () => {
    // arrange
    const url = '/api/something'

    // act
    httpClient.get(url, {}).subscribe(() => console.log)

    // assert
    const req = httpTesting.expectOne(url)

    expect(req.request.headers.get('Authorization')).toBeNull()
  });

  it('should call with headers', () => {
    // arrange
    const url = '/api/something'
    mockAuthService.loggedInUserState.mockReturnValue({
      accessToken: 'FAKE_ACCESS_TOKEN'
    })

    // act
    httpClient.get(url, {}).subscribe(() => console.log)

    // assert
    const req = httpTesting.expectOne(url)

    expect(req.request.headers.get('Authorization')).toEqual('Bearer FAKE_ACCESS_TOKEN')
  });
});
