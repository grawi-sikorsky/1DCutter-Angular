import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutOptionsComponent } from './cut-options.component';

describe('CutOptionsComponent', () => {
  let component: CutOptionsComponent;
  let fixture: ComponentFixture<CutOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
