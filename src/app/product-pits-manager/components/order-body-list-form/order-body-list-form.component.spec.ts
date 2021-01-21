import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBodyListFormComponent } from './order-body-list-form.component';

describe('OrderBodyListFormComponent', () => {
  let component: OrderBodyListFormComponent;
  let fixture: ComponentFixture<OrderBodyListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBodyListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBodyListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
