import { TestBed } from '@angular/core/testing';

import { PitsService } from './pits.service';

describe('PitsService', () => {
  let service: PitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
