import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSubmissionDialogComponent } from './grade-submission-dialog.component';

describe('GradeSubmissionDialogComponent', () => {
  let component: GradeSubmissionDialogComponent;
  let fixture: ComponentFixture<GradeSubmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSubmissionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
