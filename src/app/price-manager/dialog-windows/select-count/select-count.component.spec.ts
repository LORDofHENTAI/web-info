import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCountComponent } from './select-count.component';

describe('SelectCountComponent', () => {
  let component: SelectCountComponent;
  let fixture: ComponentFixture<SelectCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
