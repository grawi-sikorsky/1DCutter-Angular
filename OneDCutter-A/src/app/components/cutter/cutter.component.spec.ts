import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutterComponent } from './cutter.component';

describe('CutterComponent', () => {
  let component: CutterComponent;
  let fixture: ComponentFixture<CutterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CutterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
