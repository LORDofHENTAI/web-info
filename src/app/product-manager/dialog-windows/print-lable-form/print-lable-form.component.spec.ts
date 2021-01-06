import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLableFormComponent } from './print-lable-form.component';

describe('PrintLableFormComponent', () => {
  let component: PrintLableFormComponent;
  let fixture: ComponentFixture<PrintLableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintLableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
