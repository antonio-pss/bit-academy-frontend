import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EndpointsService } from '../../../../../../shared/services/endpoints.service';
import { GeneralService } from '../../../../../../shared/services/general.service';
import {MATERIAL_IMPORTS} from "../../../../../../shared/imports/material.imports";
import {MatNativeDateModule} from "@angular/material/core";

export interface ActivityItemDialogData {
  classId: number;
}

@Component({
  selector: 'app-activity-item-dialog',
  standalone: true,
  imports: [
      ReactiveFormsModule, MatNativeDateModule, MATERIAL_IMPORTS
    ],
  templateUrl: './activity-item-dialog.component.html',
  styleUrls: ['./activity-item-dialog.component.scss'],
})
export class ActivityItemDialogComponent {
  public activityForm: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<ActivityItemDialogComponent>,
      private formBuilder: FormBuilder,
      private generalService: GeneralService,
      private endpoint: EndpointsService,
      private toastr: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: ActivityItemDialogData,
  ) {
    this.activityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      value: [0, [Validators.required, Validators.min(0)]],
      due_date: ['', Validators.required],
      class_id: [data.classId, Validators.required]
    });
  }

  closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }

  onSubmit(): void {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.activityForm.value };
    const path = this.endpoint.path.classActivities(this.data.classId); // <- função!
    this.generalService
        .post(path, payload)
        .subscribe({
          next: () => {
            this.toastr.success('Atividade criada com sucesso!');
            this.closeDialog(true);
          },
          error: (err) => {
            this.toastr.error(err.detail,'Erro ao criar atividade');
            console.error(err);
          }
        });
  }
}
