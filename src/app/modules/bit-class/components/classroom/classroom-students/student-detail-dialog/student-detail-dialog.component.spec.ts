import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailDialogComponent } from './student-detail-dialog.component';

describe('StudentDetailDialogComponent', () => {
  let component: StudentDetailDialogComponent;
  let fixture: ComponentFixture<StudentDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
