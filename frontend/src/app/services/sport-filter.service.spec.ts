import { TestBed } from '@angular/core/testing';

import { SportFilterService } from './sport-filter.service';

describe('SportFilterService', () => {
  let service: SportFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
