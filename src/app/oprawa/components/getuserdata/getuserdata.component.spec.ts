import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetuserdataComponent } from './getuserdata.component';

describe('GetuserdataComponent', () => {
  let component: GetuserdataComponent;
  let fixture: ComponentFixture<GetuserdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetuserdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetuserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
