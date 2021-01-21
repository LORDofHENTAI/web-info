import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersListFormComponent } from './orders-list-form.component';

describe('OrdersListFormComponent', () => {
  let component: OrdersListFormComponent;
  let fixture: ComponentFixture<OrdersListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
