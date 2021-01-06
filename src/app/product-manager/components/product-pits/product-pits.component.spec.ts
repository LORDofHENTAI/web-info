import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPitsComponent } from './product-pits.component';

describe('ProductPitsComponent', () => {
  let component: ProductPitsComponent;
  let fixture: ComponentFixture<ProductPitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
