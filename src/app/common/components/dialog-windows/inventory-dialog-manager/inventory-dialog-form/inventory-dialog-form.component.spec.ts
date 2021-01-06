import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryDialogFormComponent } from './inventory-dialog-form.component';

describe('InventoryFormComponent', () => {
  let component: InventoryDialogFormComponent;
  let fixture: ComponentFixture<InventoryDialogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryDialogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
