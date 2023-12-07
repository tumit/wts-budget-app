import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementEntryComponent } from './requirement-entry.component';

describe('RequirementEntryComponent', () => {
  let component: RequirementEntryComponent;
  let fixture: ComponentFixture<RequirementEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequirementEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
