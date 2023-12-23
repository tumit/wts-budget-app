import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementFormComponent } from './requirement-form.component';

describe('RequirementFormComponent', () => {
  let component: RequirementFormComponent;
  let fixture: ComponentFixture<RequirementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
