import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import RequirementEntryComponent from './requirement-entry.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RequirementEntryComponent', () => {
  let component: RequirementEntryComponent;
  let fixture: ComponentFixture<RequirementEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, RequirementEntryComponent]
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
