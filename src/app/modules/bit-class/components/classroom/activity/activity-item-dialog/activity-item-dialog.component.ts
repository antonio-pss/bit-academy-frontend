import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {GeneralService} from '../../../../../../shared/services/general.service';

export interface AvaliationItemDialogData {
  classId: number;
}

@Component({
  selector: 'app-activity-item-dialog',
  standalone: true,
  imports: [
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,
  ],
  templateUrl: './activity-item-dialog.component.html',
  styleUrls: ['./activity-item-dialog.component.scss'],
})
export class ActivityItemDialogComponent implements OnInit {
  public avaliationForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ActivityItemDialogComponent>,
    private formBuilder: FormBuilder,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: AvaliationItemDialogData,
  ) {
    this.avaliationForm = this.formBuilder.group({
      class_id: [data.classId, Validators.required],
      name: ['', Validators.required],
      description: [''],
      value: [0, [Validators.required, Validators.min(0)]],
      due_date: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }

  public onSubmit(): void {
    if (this.avaliationForm.invalid) {
      this.avaliationForm.markAllAsTouched();
      return;
    }
    const payload = { ...this.avaliationForm.value };
    this.generalService
      .post(this.endpoint.path.classActivities(this.data.classId), payload)
      .subscribe({
        next: () => {
          this.toastr.success('Avaliação criada com sucesso!');
          this.closeDialog(true);
        },
        error: (err) => {
          this.toastr.error('Erro ao criar avaliação');
          console.error(err);
        }
      });
  }
}
