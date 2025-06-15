import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassComponent } from './student-class.component';

describe('StudentClassComponent', () => {
  let component: StudentClassComponent;
  let fixture: ComponentFixture<StudentClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
