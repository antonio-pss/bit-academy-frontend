import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlataformComponent } from './select-plataform.component';

describe('SelectPlataformComponent', () => {
  let component: SelectPlataformComponent;
  let fixture: ComponentFixture<SelectPlataformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlataformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlataformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
