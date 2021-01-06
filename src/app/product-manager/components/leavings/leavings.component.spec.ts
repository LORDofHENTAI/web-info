import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingsComponent } from './leavings.component';

describe('LeavingsComponent', () => {
  let component: LeavingsComponent;
  let fixture: ComponentFixture<LeavingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
