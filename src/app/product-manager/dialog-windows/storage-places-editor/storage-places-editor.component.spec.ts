import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePlacesEditorComponent } from './storage-places-editor.component';

describe('StoragePlacesEditorComponent', () => {
  let component: StoragePlacesEditorComponent;
  let fixture: ComponentFixture<StoragePlacesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragePlacesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePlacesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
