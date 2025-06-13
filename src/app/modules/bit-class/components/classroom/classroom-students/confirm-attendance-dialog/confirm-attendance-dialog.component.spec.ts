import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAttendanceDialogComponent } from './confirm-attendance-dialog.component';

describe('ConfirmAttendanceDialogComponent', () => {
  let component: ConfirmAttendanceDialogComponent;
  let fixture: ComponentFixture<ConfirmAttendanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAttendanceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAttendanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
