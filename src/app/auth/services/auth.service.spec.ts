import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { LoggedInUser, Login } from '../models/user';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTest: HttpTestingController

  const login = {
    email: 'test@odds.team',
    password: 'P@ssw0rd'
  } as Login

  const expected = {
    user: {
      email: 'test@odds.team',
      role: 'U',
      id: 1
    },
    accessToken: 'ABC'
  } as LoggedInUser

  const fakeLoggedInUser = {
    user: {
      email: 'test@odds.team',
      role: 'U',
      id: 1
    },
    accessToken: 'ABC'
  } as LoggedInUser

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpTest = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTest.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('fakeAsync', fakeAsync(() => {}))

  // happy path
  // fakeAsync => create async world
  it('should login success when 200OK', fakeAsync(() => {

    // arrange
    // act
    const actual = service.login(login);

    // assert
    actual.subscribe(v => {
      expect(v).toEqual(expected);
    })

    // create fake http call
    const url = 'http://localhost:3000/login';
    // expect url called
    const req = httpTest.expectOne(url)
    expect(req.request.method).toEqual('POST')
    expect(req.request.body).toEqual(login)
    // return fake json back to httpClient
    req.flush(fakeLoggedInUser);

    // make async work
    tick()
  }))

  it('should save to sessionStorage & set to loggedInUserState', () => {

    // act
    service.setLoggedInUser(fakeLoggedInUser)

    // assert
    expect(sessionStorage.getItem('loggedInUser')).toEqual(JSON.stringify(fakeLoggedInUser))
    expect(service.loggedInUserState()).toEqual(fakeLoggedInUser)

  })



});
