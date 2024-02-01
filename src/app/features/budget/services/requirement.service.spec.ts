import { TestBed } from '@angular/core/testing';

import { RequirementService } from './requirement.service';
import { provideHttpClient } from '@angular/common/http';


describe('RequirementService', () => {
  let service: RequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(RequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
