import { TestBed } from '@angular/core/testing';

import { ProductOrderingService } from './product-ordering.service';

describe('ProductOrderingService', () => {
  let service: ProductOrderingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductOrderingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
