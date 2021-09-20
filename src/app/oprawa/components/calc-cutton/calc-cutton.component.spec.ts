import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcCuttonComponent } from './calc-cutton.component';

describe('CalcCuttonComponent', () => {
  let component: CalcCuttonComponent;
  let fixture: ComponentFixture<CalcCuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcCuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcCuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
