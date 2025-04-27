import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMaterialComponent } from './teacher-material.component';

describe('TeacherMaterialComponent', () => {
  let component: TeacherMaterialComponent;
  let fixture: ComponentFixture<TeacherMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
