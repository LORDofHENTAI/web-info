import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSaveFormComponent } from './order-save-form.component';

describe('OrderSaveFormComponent', () => {
  let component: OrderSaveFormComponent;
  let fixture: ComponentFixture<OrderSaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
