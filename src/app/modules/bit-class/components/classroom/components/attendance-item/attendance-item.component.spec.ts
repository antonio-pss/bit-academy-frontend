import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceItemComponent } from './attendance-item.component';

describe('AttendanceItemComponent', () => {
  let component: AttendanceItemComponent;
  let fixture: ComponentFixture<AttendanceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
