import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';
import { provideHttpClient } from '@angular/common/http';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
