import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupAccountingFormComponent } from './product-group-accounting-form.component';

describe('ProductGroupAccountingFormComponent', () => {
  let component: ProductGroupAccountingFormComponent;
  let fixture: ComponentFixture<ProductGroupAccountingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupAccountingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupAccountingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
