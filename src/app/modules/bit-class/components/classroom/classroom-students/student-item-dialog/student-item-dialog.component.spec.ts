import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentItemDialogComponent } from './student-item-dialog.component';

describe('StudentItemDialogComponent', () => {
  let component: StudentItemDialogComponent;
  let fixture: ComponentFixture<StudentItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
