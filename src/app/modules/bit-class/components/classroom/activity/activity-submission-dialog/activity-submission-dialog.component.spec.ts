import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySubmissionDialogComponent } from './activity-submission-dialog.component';

describe('ActivitySubmissionDialogComponent', () => {
  let component: ActivitySubmissionDialogComponent;
  let fixture: ComponentFixture<ActivitySubmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySubmissionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
