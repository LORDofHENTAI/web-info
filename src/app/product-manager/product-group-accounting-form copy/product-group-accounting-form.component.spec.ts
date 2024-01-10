import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupAccountingFormComponentTest } from './product-group-accounting-form.component';

describe('ProductGroupAccountingFormComponent', () => {
  let component: ProductGroupAccountingFormComponent;
  let fixture: ComponentFixture<ProductGroupAccountingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGroupAccountingFormComponentTest]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupAccountingFormComponentTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
