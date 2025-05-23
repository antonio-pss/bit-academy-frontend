import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassItemDialogComponent } from './class-item-dialog.component';

describe('ClassFormComponent', () => {
  let component: ClassItemDialogComponent;
  let fixture: ComponentFixture<ClassItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
