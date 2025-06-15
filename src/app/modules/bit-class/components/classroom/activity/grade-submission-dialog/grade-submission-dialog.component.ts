import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {GeneralService} from '../../../../../../shared/services/general.service';

export interface GradeSubmissionDialogData {
  classId: number;
  activityId: number;
  submissionId: number;
}

@Component({
  selector: 'app-grade-submission-dialog',
  templateUrl: './grade-submission-dialog.component.html',
  imports: [
    MATERIAL_IMPORTS,
    ReactiveFormsModule
  ],
  styleUrls: ['./grade-submission-dialog.component.scss']
})
export class GradeSubmissionDialogComponent {
  public gradeForm: FormGroup;
  public loading = false;


  constructor(
    private fb: FormBuilder,
    private generalService: GeneralService,
    private toastr: ToastrService,
    private endpoint: EndpointsService,
    private dialogRef: MatDialogRef<GradeSubmissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GradeSubmissionDialogData
  ) {
    this.gradeForm = this.fb.group({
      grade: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  public submit(): void {
    if (this.gradeForm.invalid) return;

    const url = this.endpoint.path.activityGrade(this.data.classId, this.data.activityId);
    const body = {
      submission_id: this.data.submissionId,
      grade: this.gradeForm.value.grade
    };

    this.loading = true;
    this.generalService.post(url, body).subscribe({
      next: () => {
        this.toastr.success('Nota registrada com sucesso!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.toastr.error(err?.error?.detail || 'Erro ao registrar nota');
        this.loading = false;
      }
    });
  }

  public cancel(): void {
    this.dialogRef.close(false);
  }
}
