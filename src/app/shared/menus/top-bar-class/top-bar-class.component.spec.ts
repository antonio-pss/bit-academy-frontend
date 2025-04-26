import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarClassComponent } from './top-bar-class.component';

describe('TopBarClassComponent', () => {
  let component: TopBarClassComponent;
  let fixture: ComponentFixture<TopBarClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
