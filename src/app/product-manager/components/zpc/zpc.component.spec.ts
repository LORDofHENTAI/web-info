import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZpcComponent } from './zpc.component';

describe('ZpcComponent', () => {
  let component: ZpcComponent;
  let fixture: ComponentFixture<ZpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
