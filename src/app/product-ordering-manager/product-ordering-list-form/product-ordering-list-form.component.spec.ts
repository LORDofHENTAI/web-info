import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderingListFormComponent } from './product-ordering-list-form.component';

describe('ProductOrderingListFormComponent', () => {
  let component: ProductOrderingListFormComponent;
  let fixture: ComponentFixture<ProductOrderingListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderingListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderingListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
