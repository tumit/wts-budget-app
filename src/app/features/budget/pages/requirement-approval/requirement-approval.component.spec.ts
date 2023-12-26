import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementApprovalComponent } from './requirement-approval.component';

describe('RequirementApprovalComponent', () => {
  let component: RequirementApprovalComponent;
  let fixture: ComponentFixture<RequirementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
