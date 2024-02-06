import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { LoggedInUser } from '../../auth/models/user';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const fakeLoggedInUser = {
    user: {
      email: 'test@odds.team',
      role: 'U',
      id: 1
    },
    accessToken: 'ABC'
  } as LoggedInUser

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show brand', () => {

    // act
    const actual = fixture // manager of element
      .debugElement // element
      .query(By.css('[data-testid="brand"]')) // select
      .nativeElement // covert to dom
      .textContent // get content between tag

    // * assert
    const expected = 'Budget App'
    expect(actual).toEqual(expected)
  })

  it('should show anonymous when no loggedInUser', () => {

    // arrange
    component.loggedInUserState.set(null)

    // act
    fixture.detectChanges()
    const actual = fixture
      .debugElement
      .query(By.css('[data-testid="loggedInUser"]'))
      .nativeElement
      .textContent
      .trim();

    // assert
    const expected = 'anonymous'
    expect(actual).toEqual(expected)

  })
  it('should show loggedInUser when found loggedInUser', () => {

    component.loggedInUserState.set(fakeLoggedInUser)

    fixture.detectChanges()

    const actual = fixture
      .debugElement
      .query(By.css('[data-testid="loggedInUser"]'))
      .nativeElement
      .textContent
      .trim();

    const expected = 'test@odds.team | Logout'

    expect(actual).toEqual(expected)

  })

  it('should show anonymous when click logout', () => {

    // arrange
    component.loggedInUserState.set(fakeLoggedInUser)
    fixture.detectChanges()

    // act
    // click logout
    const logoutEle = fixture.debugElement.query(By.css('[data-testid="logout"]'))
    logoutEle.triggerEventHandler('click', null)
    fixture.detectChanges()
    const actual = fixture
      .debugElement
      .query(By.css('[data-testid="loggedInUser"]'))
      .nativeElement
      .textContent
      .trim();

    // assert
    const expected = 'anonymous'
    expect(actual).toEqual(expected)
  })

});
