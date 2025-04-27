import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliationComponent } from './avaliation.component';

describe('AvaliationComponent', () => {
  let component: AvaliationComponent;
  let fixture: ComponentFixture<AvaliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
