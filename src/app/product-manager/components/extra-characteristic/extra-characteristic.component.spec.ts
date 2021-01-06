import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraCharacteristicComponent } from './extra-characteristic.component';

describe('ExtraCharacteristicComponent', () => {
  let component: ExtraCharacteristicComponent;
  let fixture: ComponentFixture<ExtraCharacteristicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraCharacteristicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
