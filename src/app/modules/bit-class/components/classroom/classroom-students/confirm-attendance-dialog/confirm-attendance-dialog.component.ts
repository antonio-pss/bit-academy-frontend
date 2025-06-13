import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';

@Component({
  selector: 'app-confirm-attendance-dialog',
  imports: [
    MATERIAL_IMPORTS
  ],
  templateUrl: './confirm-attendance-dialog.component.html',
  styleUrl: './confirm-attendance-dialog.component.scss'
})
export class ConfirmAttendanceDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmAttendanceDialogComponent>) {}

  public onConfirm() {
    this.dialogRef.close(true);
  }
  public onCancel() {
    this.dialogRef.close(false);
  }
}
