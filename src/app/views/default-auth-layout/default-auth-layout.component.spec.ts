import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAuthLayoutComponent } from './default-auth-layout.component';

describe('DefaultAuthLayoutComponent', () => {
  let component: DefaultAuthLayoutComponent;
  let fixture: ComponentFixture<DefaultAuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultAuthLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultAuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
