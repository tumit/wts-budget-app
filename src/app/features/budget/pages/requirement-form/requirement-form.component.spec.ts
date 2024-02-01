import { ComponentFixture, TestBed } from '@angular/core/testing';

import RequirementFormComponent from './requirement-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('RequirementFormComponent', () => {
  let component: RequirementFormComponent;
  let fixture: ComponentFixture<RequirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementFormComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RequirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
