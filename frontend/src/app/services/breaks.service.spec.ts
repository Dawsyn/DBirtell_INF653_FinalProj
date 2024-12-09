import { TestBed } from '@angular/core/testing';

import { BreaksService } from './breaks.service';

describe('BreaksService', () => {
  let service: BreaksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreaksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
