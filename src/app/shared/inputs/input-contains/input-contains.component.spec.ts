import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainsComponent } from './input-contains.component';

describe('InputContainsComponent', () => {
  let component: InputContainsComponent;
  let fixture: ComponentFixture<InputContainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputContainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputContainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
