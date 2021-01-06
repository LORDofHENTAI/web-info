import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttentionFormComponent } from './attention-form.component';

describe('AttentionFormComponent', () => {
  let component: AttentionFormComponent;
  let fixture: ComponentFixture<AttentionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttentionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttentionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
