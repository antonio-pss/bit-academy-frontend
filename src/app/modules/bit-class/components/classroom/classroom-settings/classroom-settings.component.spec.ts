import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSettingsComponent } from './classroom-settings.component';

describe('ClassroomSettingsComponent', () => {
  let component: ClassroomSettingsComponent;
  let fixture: ComponentFixture<ClassroomSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassroomSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassroomSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
