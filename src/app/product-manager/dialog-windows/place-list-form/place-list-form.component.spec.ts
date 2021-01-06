import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListFormComponent } from './place-list-form.component';

describe('PlaceListFormComponent', () => {
  let component: PlaceListFormComponent;
  let fixture: ComponentFixture<PlaceListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
