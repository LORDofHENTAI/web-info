import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProductManagerFormComponent } from './request-product-manager-form.component';

describe('RequestProductManagerFormComponent', () => {
  let component: RequestProductManagerFormComponent;
  let fixture: ComponentFixture<RequestProductManagerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestProductManagerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestProductManagerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
