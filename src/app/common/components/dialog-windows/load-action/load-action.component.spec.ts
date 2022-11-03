import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadActionComponent } from './load-action.component';

describe('LoadActionComponent', () => {
  let component: LoadActionComponent;
  let fixture: ComponentFixture<LoadActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
