import { TestBed } from '@angular/core/testing';

import { RequirementService } from './requirement.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequirementService', () => {
  let service: RequirementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RequirementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
