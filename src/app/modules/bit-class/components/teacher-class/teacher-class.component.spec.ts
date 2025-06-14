import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassComponent } from './teacher-class.component';

describe('TeacherClassComponent', () => {
  let component: TeacherClassComponent;
  let fixture: ComponentFixture<TeacherClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
