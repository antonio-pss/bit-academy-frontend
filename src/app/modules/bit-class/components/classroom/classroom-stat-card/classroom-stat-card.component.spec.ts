import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomStatCardComponent } from './classroom-stat-card.component';

describe('ClassroomStatCardComponent', () => {
  let component: ClassroomStatCardComponent;
  let fixture: ComponentFixture<ClassroomStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomStatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
