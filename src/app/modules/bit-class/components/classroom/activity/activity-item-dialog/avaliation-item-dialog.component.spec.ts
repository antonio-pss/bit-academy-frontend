import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliationItemDialogComponent } from './avaliation-item-dialog.component';

describe('AvaliationItemDialogComponent', () => {
  let component: AvaliationItemDialogComponent;
  let fixture: ComponentFixture<AvaliationItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliationItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliationItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
