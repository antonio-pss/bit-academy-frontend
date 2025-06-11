import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {GeneralService} from '../../../../../../shared/services/general.service';
import {EndpointsService} from '../../../../../../shared/services/endpoints.service';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';


export interface ActivitySubmissionDialogData {
  classId: number;
  activityId: number;
  classMemberId: number;
}

@Component({
  selector: 'app-activity-submission-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MATERIAL_IMPORTS,
    // outros materiais...
  ],
  templateUrl: './activity-submission-dialog.component.html',
  styleUrls: ['./activity-submission-dialog.component.scss'],
})
export class ActivitySubmissionDialogComponent {
  public submissionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ActivitySubmissionDialogComponent>,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private endpoint: EndpointsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ActivitySubmissionDialogData,
  ) {
    this.submissionForm = this.fb.group({
      activity: [data.activityId, Validators.required],
      class_member: [data.classMemberId, Validators.required],
      answer: ['', Validators.required],
    });
  }

  closeDialog(success: boolean = false): void {
    this.dialogRef.close(success);
  }

  onSubmit(): void {
    if (this.submissionForm.invalid) {
      this.submissionForm.markAllAsTouched();
      return;
    }
    const payload = this.submissionForm.value;
    const path = this.endpoint.path.activitySubmissions(this.data.classId, this.data.activityId);

    this.generalService.post(path, payload).subscribe({
      next: () => {
        this.toastr.success('Resposta enviada com sucesso!');
        this.closeDialog(true);
      },
      error: (err) => {
        this.toastr.error('Erro ao enviar resposta');
        console.error(err);
      }
    });
  }
}
