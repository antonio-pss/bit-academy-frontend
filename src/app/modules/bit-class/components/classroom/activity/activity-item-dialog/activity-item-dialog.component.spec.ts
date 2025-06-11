import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityItemDialogComponent } from './activity-item-dialog.component';

describe('ActivityItemDialogComponent', () => {
  let component: ActivityItemDialogComponent;
  let fixture: ComponentFixture<ActivityItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
