import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewCellComponent } from './detail-view-cell.component';

describe('DetailViewCellComponent', () => {
  let component: DetailViewCellComponent;
  let fixture: ComponentFixture<DetailViewCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailViewCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
