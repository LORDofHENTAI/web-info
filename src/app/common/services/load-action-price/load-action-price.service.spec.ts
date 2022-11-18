import { TestBed } from '@angular/core/testing';

import { LoadActionPriceService } from './load-action-price.service';

describe('LoadActionPriceService', () => {
  let service: LoadActionPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadActionPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
