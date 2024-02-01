import { ComponentFixture, TestBed } from '@angular/core/testing';
import RequirementApprovalComponent from './requirement-approval.component';
import { provideHttpClient } from '@angular/common/http';

describe('RequirementApprovalComponent', () => {
  let component: RequirementApprovalComponent;
  let fixture: ComponentFixture<RequirementApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementApprovalComponent],
      providers: [
        provideHttpClient()
      ]
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
