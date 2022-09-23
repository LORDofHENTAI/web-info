import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSettingsDialogComponent } from './price-settings-dialog.component';

describe('PriceSettingsDialogComponent', () => {
  let component: PriceSettingsDialogComponent;
  let fixture: ComponentFixture<PriceSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
